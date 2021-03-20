#!/bin/bash
set -e
DEST=/home/wiewarmmobile/public_html/
npm run-script build
scp -r build/* exile.networkz.ch:$DEST
