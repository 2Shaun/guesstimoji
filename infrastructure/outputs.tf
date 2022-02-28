output "ecs_tasks_trust_policy" {
  value = data.aws_iam_policy_document.ecs_tasks_execution_role.json
}

output "game_api_url" {
  value = aws_ecr_repository.game_api.repository_url
}

output "graph_ql_api_url" {
  value = aws_ecr_repository.graph_ql_api.repository_url
}

output "react_app_url" {
  value = aws_ecr_repository.react_app.repository_url
}