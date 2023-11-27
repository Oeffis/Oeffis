ALTER TABLE historic_data ADD COLUMN trip_code INTEGER DEFAULT NULL;

UPDATE historic_data SET trip_code = (raw_data::json->'transportation'->'properties'->>'tripCode')::int;

ALTER TABLE historic_data ALTER COLUMN trip_code SET NOT NULL;
