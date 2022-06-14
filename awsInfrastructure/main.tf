# naming pattern
# [cloud]-[app]-[env]-[resource]-[location]-[description]-[number]
# if a resource is meant for multiple apps, it will not have the [app] prefix
provider "aws" {
  region = var.region
}

module "vpc" {
  source         = "terraform-aws-modules/vpc/aws"
  name           = "aws-prod-vpc-useast2"
  cidr           = "10.0.0.0/16"
  azs            = ["us-east-2a"]
  public_subnets = ["10.0.101.0/24"]
  tags = {
    Terraform   = "true"
    Environment = "prod"
  }
}

module "http_80_sg" {
  source              = "terraform-aws-modules/security-group/aws//modules/http-80"
  name                = "aws-sg-useast2-http"
  description         = "Security group for web-server with HTTP ports open within VPC"
  vpc_id              = module.vpc.vpc_id
  ingress_cidr_blocks = ["0.0.0.0/0"]
}

module "https_443_sg" {
  source              = "terraform-aws-modules/security-group/aws//modules/https-443"
  name                = "aws-sg-useast2-https"
  description         = "Security group for web-server with HTTPS ports open within VPC"
  vpc_id              = module.vpc.vpc_id
  ingress_cidr_blocks = ["0.0.0.0/0"]
}

module "iam_assumable_role" {
  source      = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version     = "~> 4"
  create_role = true
  role_name   = "aws-guesstimoji-prod-iamrole-useast2-ecstasks"
  # AssumeRole principal (who policy)
  trusted_role_services = ["ecs-tasks.amazonaws.com"]
  # what policy
  custom_role_policy_arns = ["arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"]
  # AmazonECSTaskExecutionRolePolicy
  # Actions:
  #    - ecr:GetAuthorizationToken
  #    - ecr:BatchCheckLayerAvailablility
  #    - ecr:GetDownloadUrlForLayer
  #    - ecr:BatchGetImage
  #    - logs:CreateLogStream
  #    - logs:PutLogEvents
  # Resource: *
  number_of_custom_role_policy_arns = 1
  role_requires_mfa                 = false
}

resource "aws_ecr_repository" "react_app" {
  name = "react-app"
  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "game_api" {
  name = "game-api"
  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "graph_ql_api" {
  name = "graph-ql-api"
  image_scanning_configuration {
    scan_on_push = true
  }
}

# TODO: clean up name
resource "aws_cloudwatch_log_group" "guesstimoji" {
  name = "guesstimoji"
}

# TODO: clean up name (family)
resource "aws_ecs_task_definition" "guesstimoji" {
  family                   = "guesstimoji"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048
  runtime_platform {
    operating_system_family = "LINUX"
    # images built on m1 macbook
    cpu_architecture = "ARM64"
  }
  # note the distinction between role arns and policy arns
  # execution_role_arn = aws_iam_role.ecs_tasks_execution_role.arn
  execution_role_arn = module.iam_assumable_role.iam_role_arn
  //container_definitions = data.template_file.container_definitions
  container_definitions = templatefile("${path.module}/container_definitions.json",
    {
      game_api_repo_url     = "${aws_ecr_repository.game_api.repository_url}"
      graph_ql_api_repo_url = "${aws_ecr_repository.graph_ql_api.repository_url}"
      react_app_repo_url    = "${aws_ecr_repository.react_app.repository_url}"
      tag                   = "${var.tag}"
    }
  )
}

# TODO: clean up name
resource "aws_ecs_service" "guesstimoji" {
  name                               = "guesstimoji"
  launch_type                        = "FARGATE"
  cluster                            = module.ecs.ecs_cluster_id
  task_definition                    = aws_ecs_task_definition.guesstimoji.arn
  desired_count                      = 1
  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
  network_configuration {
    subnets          = module.vpc.public_subnets
    assign_public_ip = true
    security_groups  = [module.http_80_sg.security_group_id, module.https_443_sg.security_group_id]
  }
}

module "ecs" {
  source             = "terraform-aws-modules/ecs/aws"
  name               = "aws-guesstimoji-prod-ecs-useast2"
  container_insights = true
  capacity_providers = ["FARGATE_SPOT"]
  default_capacity_provider_strategy = [
    {
      capacity_provider = "FARGATE_SPOT"
      weight            = 1
    }
  ]

}
