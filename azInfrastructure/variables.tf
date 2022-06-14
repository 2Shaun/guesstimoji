variable "location" {
  type    = string
  default = "eastus"
}

variable "app" {
    type = string
    default = "guesstimoji"
}

variable "collNames" {
  type = list(string)
  default = ["boards", "emojis", "games"]
}