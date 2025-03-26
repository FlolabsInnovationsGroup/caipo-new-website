Set-Location -Path $PSScriptRoot
Write-Host "Running Prisma commands..."

# Generate Prisma Client
Write-Host "Generating Prisma Client..."
pnpm prisma generate

# Run migrations
Write-Host "Running migrations..."
pnpm prisma migrate dev --name add_early_access_signups

Write-Host "Done!"
pause 