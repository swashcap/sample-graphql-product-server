#!/bin/bash
set -eo pipefail

rm -rf tmp-types &
find src -type f -name '*.js' -exec rm {} \+ &

wait
