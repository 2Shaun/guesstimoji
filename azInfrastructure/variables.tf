variable "location" {
  type    = string
  default = "eastus"
}

variable "app" {
    type = string
    default = "guesstimoji"
  description = "App and database name"
}

variable "collNames" {
  type = list(string)
  default = ["boards", "emojis", "games"]
  description = "Collection names for the guesstimoji database"
}

variable "gitlab_remote_state_address" {
  type = string
  default = "https://gitlab.com/api/v4/projects/31299207/terraform/state/azInfrastructure"
  description = "Gitlab remote state file address"
}

variable "gitlab_username" {
  type = string
  default = "gitlab-ci-token"
  description = "Gitlab username to query remote state"
}

variable "gitlab_access_token" {
  type = string
  description = "GitLab access token to query remote state"
}