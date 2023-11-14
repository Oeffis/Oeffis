CREATE TABLE historic_data (
    id SERIAL NOT NULL,
    trip_id TEXT NOT NULL,
    stop_id TEXT NOT NULL,
    recording_time TIMESTAMP NOT NULL,
    is_departure BOOLEAN NOT NULL,
    planned TIMESTAMP NOT NULL,
    estimated TIMESTAMP,
    raw_data VARCHAR NOT NULL,
    vrr_timetable_version_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);
