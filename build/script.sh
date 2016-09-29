#!/bin/bash

SOURCE_BRANCH="release"
TARGET_BRANCH="master"


ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in build/deploy_key.enc -out build/deploy_key -d
chmod 600 build/deploy_key
eval `ssh-agent -s`
ssh-add build/deploy_key

git clone git@github.com:devgg/devgg.git out
cd out
git checkout -b $TARGET_BRANCH "origin/$TARGET_BRANCH"
cd ..

cp -r out/.git tmp
rm -rf out
mkdir out
cp -r tmp out/.git

rsync -av --exclude='.git' \
          --exclude='css' \
          --exclude='js' \
          --exclude='build' \
          --exclude='out' \
          --exclude='tmp' \
          --exclude='.travis.yml' \
          --exclude='.gitignore' \
          --exclude='deploy_key.enc' \
          . out/

npm install -g clean-css
npm install -g uglify-js
mkdir out/css
mkdir out/js
cleancss css/main.css -o out/css/main.css
uglifyjs js/main.js -o out/js/main.js

cd out
git add -A
SHA=`git rev-parse origin/$SOURCE_BRANCH`
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git commit -m "Deploy to GitHub Pages: ${SHA}"
git push origin $TARGET_BRANCH
