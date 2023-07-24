#!/bin/bash

SCHEMA_VERSION="14.4.18.18"

rm -fr ./work

unzip "JSON_Schema_${SCHEMA_VERSION}.zip" -d ./work

mkdir -p ./work/schema

find ./work/JSON_Schema/ -name "*.json" -exec cp {} ./work/schema \;

rm -fr ./work/JSON_Schema/

REQUIRED_TYPES=(
  "LOCATION_SUGGEST_Schema"
  "TICKET_PRODUCT_Schema"
)

SRC_ARGS=""

for TYPE in "${REQUIRED_TYPES[@]}"
do
  SRC_ARGS="${SRC_ARGS} ./work/schema/${TYPE}.json"
done

./node_modules/.bin/quicktype \
  --src-lang schema \
  --lang ts \
  $SRC_ARGS \
  --out ./src/vendor/VrrApiTypes.ts

# rm -fr ./work
