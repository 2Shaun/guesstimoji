terraform {
  required_providers {
      azurerm = {
          source = "hashicorp/azurerm"
          version = "=3.0.0"
      }
  }
}

provider "azurerm" {
    features {}
}

resource "azurerm_resource_group" "guesstimojiRg" {
    location = var.location
    name = "az-${var.app}-rg-${var.location}-01"
} 

resource "azurerm_cosmosdb_account" "dbAcct" {
    name = "az-${var.app}-prod-cosmosacct-${var.location}-01"
    location = azurerm_resource_group.guesstimojiRg.location
    resource_group_name = azurerm_resource_group.guesstimojiRg.name
    kind = "MongoDB"
    mongo_server_version = 4.2
    offer_type = "Standard"

    consistency_policy {
      consistency_level = "Session"
    }

    capabilities {
      name = "EnableServerless"
    }

    geo_location {
        location = azurerm_resource_group.guesstimojiRg.location
        failover_priority = 0
    }
}
 resource "azurerm_cosmosdb_mongo_database" "db" {
     name = var.app
     resource_group_name = azurerm_resource_group.guesstimojiRg
     account_name = azurerm_cosmosdb_account.dbAcct
 }

 resource "azurerm_cosmosdb_mongo_collection" "colls" {
     for_each = toset(local.collNames)
     name = each.key
     resource_group_name = azurerm_resource_group.guesstimojiRg.name
     account_name = azurerm_cosmosdb_account.dbAcct.name
     database_name = azurerm_cosmosdb_mongo_database.db.name
     shard_key = "_id"

     index {
         keys = ["_id"]
         unique = true
     }
     index {
         keys = ["$**"]
     }
 }