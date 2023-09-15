CREATE TABLE foo (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO foo (name) VALUES ('foo');
INSERT INTO foo (name) VALUES ('bar');
INSERT INTO foo (name) VALUES ('baz');
