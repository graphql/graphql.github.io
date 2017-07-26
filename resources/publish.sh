#!/bin/bash -e

# Publishing to NPM is currently supported by Travis CI, which ensures that all
# tests pass first and the deployed module contains the correct file struture.
# In order to prevent inadvertently circumventing this, we ensure that a CI
# environment exists before continuing.
if [ "$CI" != true ]; then
  echo "\n\n\n  \033[101;30m Only Travis CI can publish to NPM. \033[0m\n\n\n" 1>&2;
  exit 1;
fi;


# Ensure the website was built
if [ ! -f ./build/index.html ]; then
  echo "\n\n\n  \033[101;30m Something went wrong, the site does not exist. \033[0m\n\n\n" 1>&2;
  exit 1;
fi

# Commit the website and push it
cd build
git init
git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"
git add .
git commit -a -m "Auto-deploy by Travis CI"
git push --force --quiet "https://${GH_TOKEN}@github.com/xitu/graphql.github.io.git" master:master
