#!/bin/bash

SCHEMA_VERSION="14.4.18.18"

REQUIRED_TYPES=(
  "LOCATION_SUGGEST_Schema"
  "SERVINGLINES_Schema"
  "TRIP_Schema"
  "DMTTP_Schema"
)

SRC_ARGS=""

for TYPE in "${REQUIRED_TYPES[@]}"
do
  SRC_ARGS="${SRC_ARGS} ./schema/${TYPE}.json"
done

./node_modules/.bin/quicktype \
  --src-lang schema \
  --lang ts \
  $SRC_ARGS \
  --out ./src/vendor/VrrApiTypes.ts
