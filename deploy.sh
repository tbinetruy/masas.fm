#!/bin/bash

git status


git checkout -b production
git add -f static/dist
git status

git commit -m "build"
git status
