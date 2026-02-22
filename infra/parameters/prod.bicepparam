using '../main.bicep'

param staticWebAppName = 'swa-sddcat-prod'
param location = 'westeurope'
param sku = 'Free'
param tags = {
  environment: 'prod'
  project: 'sdd-cat'
}
