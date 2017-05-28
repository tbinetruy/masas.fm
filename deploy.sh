#!/bin/bash

git status

git add static/dist
git status

git stash
git status

git checkout production
git status

git stash pop
git status

git commit -m "build"
git status
