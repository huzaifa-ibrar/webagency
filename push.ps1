# GitHub Push Helper Script

Write-Host "Starting GitHub push process..." -ForegroundColor Cyan

# Check git status
Write-Host "Checking current git status..." -ForegroundColor Yellow
git status

# Stage all changes
Write-Host "Adding all changes to staging..." -ForegroundColor Green
git add .

# Commit changes
$commitMessage = Read-Host "Enter your commit message"
if (-not $commitMessage) {
    $commitMessage = "Update Calendly integration with #050505 background"
}
Write-Host "Committing changes with message: $commitMessage" -ForegroundColor Green
git commit -m "$commitMessage"

# Push to GitHub
Write-Host "Pushing to GitHub repository..." -ForegroundColor Magenta
git push origin main

Write-Host "All done! Your changes have been pushed to GitHub." -ForegroundColor Cyan 