CREATE INDEX historic_data_estimated_index
    ON historic_data USING BTREE (estimated);


CREATE INDEX historic_data_trip_code_index
    ON historic_data USING HASH (trip_code);
