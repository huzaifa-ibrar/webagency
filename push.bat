@echo off
echo Starting GitHub push process...

echo Checking current git status...
git status

echo Adding all changes to staging...
git add .

set /p commit_msg=Enter your commit message (or press Enter for default): 
if "%commit_msg%"=="" set commit_msg=Update Calendly integration with #050505 background

echo Committing changes with message: %commit_msg%
git commit -m "%commit_msg%"

echo Pushing to GitHub repository...
git push origin main

echo All done! Your changes have been pushed to GitHub. 