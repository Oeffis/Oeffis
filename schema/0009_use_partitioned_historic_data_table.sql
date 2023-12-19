CREATE TABLE historic_data2
(
    id                       BIGSERIAL,
    trip_id                  TEXT      NOT NULL,
    stop_id                  TEXT      NOT NULL,
    recording_time           TIMESTAMP NOT NULL,
    is_departure             BOOLEAN   NOT NULL,
    planned                  TIMESTAMP NOT NULL,
    estimated                TIMESTAMP,
    vrr_timetable_version_id INTEGER   NOT NULL,
    trip_code                INTEGER   NOT NULL,
    raw_data                 VARCHAR,
    parent_stop_id           TEXT,
    is_cancelled             BOOLEAN
) PARTITION BY RANGE (recording_time);

CREATE TABLE historic_data2_y2022_w52 PARTITION OF historic_data2
          FOR VALUES FROM ('2022-12-31T23:00:00.000Z') TO ('2023-01-07T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w1 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-01-07T23:00:00.000Z') TO ('2023-01-14T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w2 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-01-14T23:00:00.000Z') TO ('2023-01-21T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w3 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-01-21T23:00:00.000Z') TO ('2023-01-28T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w4 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-01-28T23:00:00.000Z') TO ('2023-02-04T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w5 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-02-04T23:00:00.000Z') TO ('2023-02-11T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w6 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-02-11T23:00:00.000Z') TO ('2023-02-18T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w7 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-02-18T23:00:00.000Z') TO ('2023-02-25T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w8 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-02-25T23:00:00.000Z') TO ('2023-03-04T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w9 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-03-04T23:00:00.000Z') TO ('2023-03-11T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w10 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-03-11T23:00:00.000Z') TO ('2023-03-18T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w11 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-03-18T23:00:00.000Z') TO ('2023-03-25T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w12 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-03-25T23:00:00.000Z') TO ('2023-04-01T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w13 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-04-01T22:00:00.000Z') TO ('2023-04-08T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w14 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-04-08T22:00:00.000Z') TO ('2023-04-15T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w15 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-04-15T22:00:00.000Z') TO ('2023-04-22T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w16 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-04-22T22:00:00.000Z') TO ('2023-04-29T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w17 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-04-29T22:00:00.000Z') TO ('2023-05-06T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w18 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-05-06T22:00:00.000Z') TO ('2023-05-13T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w19 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-05-13T22:00:00.000Z') TO ('2023-05-20T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w20 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-05-20T22:00:00.000Z') TO ('2023-05-27T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w21 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-05-27T22:00:00.000Z') TO ('2023-06-03T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w22 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-06-03T22:00:00.000Z') TO ('2023-06-10T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w23 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-06-10T22:00:00.000Z') TO ('2023-06-17T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w24 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-06-17T22:00:00.000Z') TO ('2023-06-24T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w25 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-06-24T22:00:00.000Z') TO ('2023-07-01T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w26 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-07-01T22:00:00.000Z') TO ('2023-07-08T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w27 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-07-08T22:00:00.000Z') TO ('2023-07-15T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w28 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-07-15T22:00:00.000Z') TO ('2023-07-22T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w29 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-07-22T22:00:00.000Z') TO ('2023-07-29T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w30 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-07-29T22:00:00.000Z') TO ('2023-08-05T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w31 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-08-05T22:00:00.000Z') TO ('2023-08-12T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w32 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-08-12T22:00:00.000Z') TO ('2023-08-19T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w33 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-08-19T22:00:00.000Z') TO ('2023-08-26T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w34 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-08-26T22:00:00.000Z') TO ('2023-09-02T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w35 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-09-02T22:00:00.000Z') TO ('2023-09-09T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w36 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-09-09T22:00:00.000Z') TO ('2023-09-16T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w37 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-09-16T22:00:00.000Z') TO ('2023-09-23T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w38 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-09-23T22:00:00.000Z') TO ('2023-09-30T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w39 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-09-30T22:00:00.000Z') TO ('2023-10-07T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w40 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-10-07T22:00:00.000Z') TO ('2023-10-14T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w41 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-10-14T22:00:00.000Z') TO ('2023-10-21T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w42 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-10-21T22:00:00.000Z') TO ('2023-10-28T22:00:00.000Z');

CREATE TABLE historic_data2_y2023_w43 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-10-28T22:00:00.000Z') TO ('2023-11-04T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w44 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-11-04T23:00:00.000Z') TO ('2023-11-11T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w45 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-11-11T23:00:00.000Z') TO ('2023-11-18T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w46 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-11-18T23:00:00.000Z') TO ('2023-11-25T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w47 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-11-25T23:00:00.000Z') TO ('2023-12-02T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w48 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-12-02T23:00:00.000Z') TO ('2023-12-09T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w49 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-12-09T23:00:00.000Z') TO ('2023-12-16T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w50 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-12-16T23:00:00.000Z') TO ('2023-12-23T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w51 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-12-23T23:00:00.000Z') TO ('2023-12-30T23:00:00.000Z');

CREATE TABLE historic_data2_y2023_w52 PARTITION OF historic_data2
          FOR VALUES FROM ('2023-12-30T23:00:00.000Z') TO ('2024-01-06T23:00:00.000Z');

CREATE INDEX historic_data2_id_index
    ON historic_data2 (id);

CREATE INDEX historic_data2_trip_code_index
    ON historic_data2 (trip_code);

CREATE INDEX historic_data2_estimated_index
    ON historic_data2 (estimated);

CREATE INDEX historic_data2_is_cancelled_index
    ON historic_data2 USING HASH (is_cancelled);

CREATE INDEX historic_data2_parent_stop_id_index
    ON historic_data2 USING HASH (parent_stop_id);

CREATE INDEX historic_data2_planned_index
    ON historic_data2 (planned);

CREATE INDEX historic_data2_trip_id_index
    ON historic_data2 USING HASH (trip_id);

CREATE INDEX historic_data2_recording_time_index
    ON historic_data2 (recording_time);

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2022-12-31T23:00:00.000Z') AND ('2023-01-07T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-01-07T23:00:00.000Z') AND ('2023-01-14T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-01-14T23:00:00.000Z') AND ('2023-01-21T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-01-21T23:00:00.000Z') AND ('2023-01-28T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-01-28T23:00:00.000Z') AND ('2023-02-04T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-02-04T23:00:00.000Z') AND ('2023-02-11T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-02-11T23:00:00.000Z') AND ('2023-02-18T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-02-18T23:00:00.000Z') AND ('2023-02-25T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-02-25T23:00:00.000Z') AND ('2023-03-04T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-03-04T23:00:00.000Z') AND ('2023-03-11T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-03-11T23:00:00.000Z') AND ('2023-03-18T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-03-18T23:00:00.000Z') AND ('2023-03-25T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-03-25T23:00:00.000Z') AND ('2023-04-01T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-04-01T22:00:00.000Z') AND ('2023-04-08T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-04-08T22:00:00.000Z') AND ('2023-04-15T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-04-15T22:00:00.000Z') AND ('2023-04-22T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-04-22T22:00:00.000Z') AND ('2023-04-29T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-04-29T22:00:00.000Z') AND ('2023-05-06T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-05-06T22:00:00.000Z') AND ('2023-05-13T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-05-13T22:00:00.000Z') AND ('2023-05-20T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-05-20T22:00:00.000Z') AND ('2023-05-27T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-05-27T22:00:00.000Z') AND ('2023-06-03T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-06-03T22:00:00.000Z') AND ('2023-06-10T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-06-10T22:00:00.000Z') AND ('2023-06-17T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-06-17T22:00:00.000Z') AND ('2023-06-24T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-06-24T22:00:00.000Z') AND ('2023-07-01T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-07-01T22:00:00.000Z') AND ('2023-07-08T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-07-08T22:00:00.000Z') AND ('2023-07-15T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-07-15T22:00:00.000Z') AND ('2023-07-22T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-07-22T22:00:00.000Z') AND ('2023-07-29T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-07-29T22:00:00.000Z') AND ('2023-08-05T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-08-05T22:00:00.000Z') AND ('2023-08-12T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-08-12T22:00:00.000Z') AND ('2023-08-19T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-08-19T22:00:00.000Z') AND ('2023-08-26T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-08-26T22:00:00.000Z') AND ('2023-09-02T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-09-02T22:00:00.000Z') AND ('2023-09-09T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-09-09T22:00:00.000Z') AND ('2023-09-16T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-09-16T22:00:00.000Z') AND ('2023-09-23T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-09-23T22:00:00.000Z') AND ('2023-09-30T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-09-30T22:00:00.000Z') AND ('2023-10-07T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-10-07T22:00:00.000Z') AND ('2023-10-14T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-10-14T22:00:00.000Z') AND ('2023-10-21T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-10-21T22:00:00.000Z') AND ('2023-10-28T22:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-10-28T22:00:00.000Z') AND ('2023-11-04T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-11-04T23:00:00.000Z') AND ('2023-11-11T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-11-11T23:00:00.000Z') AND ('2023-11-18T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-11-18T23:00:00.000Z') AND ('2023-11-25T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-11-25T23:00:00.000Z') AND ('2023-12-02T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-12-02T23:00:00.000Z') AND ('2023-12-09T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-12-09T23:00:00.000Z') AND ('2023-12-16T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-12-16T23:00:00.000Z') AND ('2023-12-23T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-12-23T23:00:00.000Z') AND ('2023-12-30T23:00:00.000Z');

INSERT INTO historic_data2
          SELECT id :: BIGINT,
          trip_id :: TEXT,
          stop_id :: TEXT,
          recording_time :: TIMESTAMP,
          is_departure :: BOOLEAN,
          planned :: TIMESTAMP,
          estimated :: TIMESTAMP,
          vrr_timetable_version_id ::INTEGER,
          trip_code :: INTEGER,
          raw_data :: VARCHAR,
          parent_stop_id :: TEXT,
          is_cancelled :: BOOLEAN
          FROM historic_data
          WHERE recording_time BETWEEN ('2023-12-30T23:00:00.000Z') AND ('2024-01-06T23:00:00.000Z');

DROP TABLE historic_data;

ALTER TABLE historic_data2 RENAME TO historic_data;
