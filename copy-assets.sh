#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

# copy .env file to dist/
#cp .env dist
# Copy all the view templates to dist/
cp -av views dist
# Copy all the assets to dist/
cp -av public dist
