ALTER TABLE historic_data ADD COLUMN is_cancelled BOOLEAN DEFAULT NULL;
CREATE INDEX historic_data_is_cancelled_index
    ON historic_data USING HASH (is_cancelled);

UPDATE historic_data SET is_cancelled = ((raw_data::json->>'isCancelled')::bool = true AND (raw_data::json->>'isCancelled') IS NOT NULL)
    WHERE historic_data.is_cancelled IS NULL;

ALTER TABLE historic_data ALTER COLUMN is_cancelled SET NOT NULL;
