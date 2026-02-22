@description('Name of the Static Web App')
param staticWebAppName string

@description('Azure region for the Static Web App')
param location string = 'westeurope'

@description('SKU for the Static Web App')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('Tags to apply to all resources')
param tags object = {}

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      appLocation: '/src'
      outputLocation: ''
      skipGithubActionWorkflowGeneration: true
    }
  }
}

@description('Default hostname of the Static Web App')
output defaultHostname string = staticWebApp.properties.defaultHostname

@description('Resource ID of the Static Web App')
output staticWebAppId string = staticWebApp.id
