CREATE TABLE historic_data (
    id SERIAL NOT NULL,
    trip_id VARCHAR(20) NOT NULL,
    stop_id VARCHAR(20) NOT NULL,
    recording_time TIMESTAMP NOT NULL,
    is_departure BOOLEAN NOT NULL,
    planned TIMESTAMP NOT NULL,
    estimated TIMESTAMP,
    raw_data VARCHAR NOT NULL,
    PRIMARY KEY (id)
);
