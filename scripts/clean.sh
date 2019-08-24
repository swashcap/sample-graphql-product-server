#!/bin/bash
set -eo pipefail

rm -rf tmp-data tmp-types &
find {scripts,src} -type f -name '*.js' -exec rm {} \+ &

wait
