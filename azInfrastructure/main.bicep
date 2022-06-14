// naming pattern
// [cloud]-[app]-[env]-[resource]-[location]-[description]-[number]
// if a resource is meant for multiple apps, it will not have the [app] prefix


param serverVersion string = '4.2'
param guesstimojiName string = 'guesstimoji'
param location string = resourceGroup().location
param acctName string = toLower(format('az-{0}-prod-cosmosacct-{1}-01', guesstimojiName , location))
param defaultConsistencyLevel string = 'Session'
param collNames array = [
  'boards'
  'emojis'
  'games'
]
param primaryRegion string = location

@minValue(10)
@maxValue(2147483647)
param maxStalenessPrefix int = 100000

@minValue(5)
@maxValue(86400)
param maxIntervalInSeconds int = 300

var consistencyPolicy = {
  Eventual: {
    defaultConsistencyLevel: 'Eventual'
  }
  ConsistentPrefix: {
    defaultConsistencyLevel: 'ConsistentPrefix'
  }
  Session: {
    defaultConsistencyLevel: 'Session'
  }
  BoundedStaleness: {
    defaultConsistencyLevel: 'BoundedStaleness'
    maxStalenessPrefix: maxStalenessPrefix
    maxIntervalInSeconds: maxIntervalInSeconds
  }
  Strong: {
    defaultConsistencyLevel: 'Strong'
  }
}

var locations = [
  {
    locationName: primaryRegion
    failoverPriority: 0
    isZoneRedundant: false
  }
]

resource dbAcct 'Microsoft.DocumentDB/databaseAccounts@2021-10-15' = {
  name: acctName 
  location: location
  kind: 'MongoDB'
  properties: {
    // notice that the default consistency is configured at the account level
    consistencyPolicy: consistencyPolicy[defaultConsistencyLevel]
    locations: locations
    capabilities: [
      {
        // TODO: check if this can be changed without destroying database
        // this may need to change if a lot of traffic is expected
        // sad that this is at the account level and not database level
        name: 'EnableServerless'
      }
    ]
    databaseAccountOfferType: 'Standard'
    apiProperties: {
      serverVersion: serverVersion
    }
  }
}

resource db 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2021-10-15' = {
  parent: dbAcct 
  name: guesstimojiName
  properties: {
    resource: {
      id: guesstimojiName 
    }
  }
}

resource colls 'Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections@2021-10-15' = [for coll in collNames :{
  parent: db 
  name: coll
  properties:{
    resource: {
      id: coll
      shardKey: {
        _id: 'Hash'
      }
      indexes: [
        {
          key: {
            keys: [
              // multiple items in this array would create a compound index
              '_id'
            ]
          }
        }
        {
          key: {
            keys: [
              // creates an index on all fields
              '$**'
            ]
          }
        }
      ]
    }
  }
}]

