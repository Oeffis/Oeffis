CREATE TABLE historic_data (
    id SERIAL NOT NULL,
    trip_id VARCHAR(20) NOT NULL,
    stop_id VARCHAR(20) NOT NULL,
    recording_time DATE NOT NULL,
    is_departure BOOLEAN NOT NULL,
    planned DATE NOT NULL,
    estimated DATE,
    raw_data VARCHAR NOT NULL,
    PRIMARY KEY (id)
);
