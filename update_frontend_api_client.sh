#!/bin/bash
set -e

# check if pwd is the root of the project
if [ ! -f "backend/swagger-spec.json" ]; then
  echo "Please run this script from the root of the project"
  exit 1
fi

rm -fr frontend/src/api/
mkdir -p frontend/src/api/

echo "# This file generatede by the script update_frontend_api_client.sh script.
*.md
git_push.sh
package-lock.json
package.json
tsconfig.json
.gitignore
tsconfig.esm.json
.npmignore" > frontend/src/api/.openapi-generator-ignore

echo "Generating code from swagger spec"

docker run --rm -v //"$PWD":/work openapitools/openapi-generator-cli:v7.0.0 \
  generate \
  --input-spec //work/backend/swagger-spec.json \
  --generator-name typescript-fetch \
  --config //work/frontend/api_client_generator_settings.json \
  --output //work/frontend/src/api/

cp -a frontend/src/api/src/** frontend/src/api/
rm -fr frontend/src/api/src/
