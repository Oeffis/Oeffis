@echo off

:: Install 'openapi-typescript-codegen' to generate typscript client -> 'npm install -g openapi-typescript-codegen'
:: Install 'jsontool' with npm to get pretty json -> 'npm install -g jsontool'

SET SWAGGER_JSON_URL=http://localhost:3000/api-docs-json
SET SWAGGER_LOCATION=backend\
SET SWAGGER_FILE=swagger-spec.json
SET CLIENT_API_LOCATION=frontend\src\api

echo Make sure to start backend first.

curl %SWAGGER_JSON_URL% | json > %SWAGGER_LOCATION%%SWAGGER_FILE% && openapi -i %SWAGGER_LOCATION%%SWAGGER_FILE% -o %CLIENT_API_LOCATION% -c axios
:: curl <SWAGGER_JSON_URL> | json <SWAGGER_FILE> && openapi -i <SWAGGER_FILE> -o <OUTPUT_FOLDER> -c axios

call pause