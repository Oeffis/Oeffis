# VRR Client

## Updating the schema

The schema needs to be downloaded from the <www.opendata-oepnv.de> site and unpacked into the `schema` directory. Any sub-schema to convert to types needs to be added to the `REQUIRED_TYPES` variable in the `generate_schema_types.sh` script. Then run the script to generate the types. Note that the schema is often not entirely JSON valid, by example, the DMTTP-Schema contains two keys called "systemMessages". The script will sometimes fail upon such incompatibilities and manual adaptions to the schema need to be done to fix those.
