#!/bin/sh

# Get the current branch of your branch
merged_branch="$(git symbolic-ref --short -q HEAD)"

echo "########## GIT PULL MASTER ##########"
git checkout master
git pull origin master

echo "########## GIT STATUS ##########"
git status

echo "########## HEROKU PUSH BRANCH TO OMOROI (FRONTEND - PRODUCTION) ##########"
git push omoroi-fe master

echo "########## DESTROY MERGED BRANCH ##########"
git branch -D $merged_branch

echo "##########【成功】本番デプロイスクリプトが完了しました ##########"
