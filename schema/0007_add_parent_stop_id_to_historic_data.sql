CREATE INDEX stops_parent_station_index
    ON stops USING HASH (parent_station);

CREATE INDEX stops_stop_id_index
    ON stops USING HASH (stop_id);

CREATE INDEX stops_vrr_timetable_version_index
    ON stops USING HASH (vrr_timetable_version_id);

ALTER TABLE historic_data ADD COLUMN parent_stop_id TEXT DEFAULT NULL;

CREATE INDEX historic_data_parent_stop_id_index
    ON historic_data USING HASH (parent_stop_id);

UPDATE historic_data SET parent_stop_id = (
    SELECT parent_stop_id FROM stops
                          WHERE stops.stop_id = historic_data.stop_id
                          AND stops.vrr_timetable_version_id = historic_data.vrr_timetable_version_id
                          LIMIT 1
    )
WHERE parent_stop_id IS NULL

ALTER TABLE historic_data ALTER COLUMN parent_stop_id SET NOT NULL;
