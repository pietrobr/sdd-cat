using '../main.bicep'

param staticWebAppName = 'swa-sddcat-dev'
param location = 'westeurope'
param sku = 'Free'
param tags = {
  environment: 'dev'
  project: 'sdd-cat'
}
