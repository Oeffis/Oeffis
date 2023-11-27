CREATE INDEX historic_data_trip_id_index
    ON historic_data USING HASH (trip_id);

CREATE INDEX historic_data_planned_index
    ON historic_data USING BTREE (planned);
