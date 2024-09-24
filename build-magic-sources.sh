#!/usr/bin/env bash

filenames=$(ls docs/ | grep -E "(\.[0-9a-f]{20}.*\.(css|js)$)|ton-gem.*" | while read line; do echo "\"$line\","; done | tr -d '\n')
echo "[${filenames%?}]" > docs/magic-sources.json
