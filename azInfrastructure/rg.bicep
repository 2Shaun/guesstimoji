targetScope='subscription'

param location string = 'eastus2'
param guesstimojiName string = 'guesstimoji'
param rgName string = toLower(format('az-{0}-rg-{1}-01', guesstimojiName, location))

resource guesstimojiRg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: rgName
  location: location
}
