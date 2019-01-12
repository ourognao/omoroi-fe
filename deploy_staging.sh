#!/bin/sh

#Get the current branch of your branch
current_branch="$(git symbolic-ref --short -q HEAD)"

echo "########## GIT PULL MASTER ##########"
git pull origin master

echo "########## GIT STATUS ##########"
git status

echo "########## GIT PUSH BRANCH TO GITHUB ##########"
git add -A .
git commit -m $current_branch
git push origin $current_branch

echo "########## HEROKU PUSH BRANCH TO OMOROI (FRONTEND - STAGING) ##########"
git push omoroi-fe-staging "$current_branch":master

echo "CURRENT_BRANCH: $current_branch"

echo "##########【成功】ステージングデプロイスクリプトが完了しました ##########"

