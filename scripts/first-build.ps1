# First Build Script for PartyConnect (PowerShell)

Write-Host "🚀 PartyConnect - First Build Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in
$whoami = npx eas-cli whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to EAS" -ForegroundColor Red
    Write-Host "📝 Please run: npx eas-cli login" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After logging in, run this script again." -ForegroundColor Yellow
    exit 1
}

# Check if configured
if (-not (Test-Path "eas.json")) {
    Write-Host "⚙️  Configuring EAS Build..." -ForegroundColor Yellow
    npx eas-cli build:configure
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Configuration failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📦 Starting build..." -ForegroundColor Green
Write-Host ""
Write-Host "Choose build type:"
Write-Host "1) Android Preview (APK) - Recommended for first build"
Write-Host "2) iOS Preview"
Write-Host "3) Android Production"
Write-Host "4) iOS Production"
Write-Host "5) Both platforms (Preview)"
Write-Host ""
$choice = Read-Host "Enter choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "Building Android Preview..." -ForegroundColor Green
        npx eas-cli build --platform android --profile preview
    }
    "2" {
        Write-Host "Building iOS Preview..." -ForegroundColor Green
        npx eas-cli build --platform ios --profile preview
    }
    "3" {
        Write-Host "Building Android Production..." -ForegroundColor Green
        npx eas-cli build --platform android --profile production
    }
    "4" {
        Write-Host "Building iOS Production..." -ForegroundColor Green
        npx eas-cli build --platform ios --profile production
    }
    "5" {
        Write-Host "Building both platforms (Preview)..." -ForegroundColor Green
        npx eas-cli build --platform all --profile preview
    }
    default {
        Write-Host "Invalid choice. Building Android Preview..." -ForegroundColor Yellow
        npx eas-cli build --platform android --profile preview
    }
}

Write-Host ""
Write-Host "✅ Build started! Check status with: npx eas-cli build:list" -ForegroundColor Green
Write-Host "📥 Download with: npx eas-cli build:download" -ForegroundColor Green

