#!/bin/bash
set -eux

npm install
npm run dist
python -m SimpleHTTPServer
