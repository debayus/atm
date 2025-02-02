#!/bin/bash

set -e
rm -rf node_modules package-lock.json
npm install

node src/index.js