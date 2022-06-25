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
