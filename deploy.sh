#!/bin/bash

git status

git stash
git status

git checkout -b production
git status

git stash pop
git status

git commit -m "build"
git status
