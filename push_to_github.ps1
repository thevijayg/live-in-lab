# Push to GitHub — Run this in PowerShell from c:\Users\Admin\Desktop\pdl

# STEP 1: Replace YOUR_USERNAME and YOUR_REPO_NAME below
$githubUser = "YOUR_USERNAME"
$repoName = "YOUR_REPO_NAME"

# STEP 2: Run these commands one by one:

git init
git add .
git commit -m "feat: complete AGRINOVA smart agriculture platform"

# If your remote already exists:
# git remote remove origin

git remote add origin "https://github.com/$githubUser/$repoName.git"

# Push (use -f to force-overwrite if the repo already had old content)
git push -u origin main --force
