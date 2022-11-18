#!/bin/bash

cd /home/ubuntu/repos/site || exit
git fetch
git reset --hard origin/gh-pages
