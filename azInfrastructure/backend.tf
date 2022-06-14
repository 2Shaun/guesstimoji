terraform {
    backend "http" {
        address = var.gitlab_remote_state_address
        username = var.gitlab_username
        password = var.gitlab_access_token 
    }
}