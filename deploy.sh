#!/usr/bin/env sh

set -e

#yarn build
./node_modules/.bin/vite build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:hafribilal/hafribilal-taas-frontend-challenge.git dev:gh-pages

cd -
