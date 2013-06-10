
CREATE TABLE moviez
(
id SERIAL8 PRIMARY KEY,
title VARCHAR(50) NOT NULL UNIQUE,
year INT4,
rated VARCHAR(5),
released DATE CHECK (released < '5/27/2013'),
runtime VARCHAR(15),
genre TEXT,
director TEXT, # Changed these two to text so duplicates can be stored.
writer TEXT, #Changed these two to text so duplicates can be stored.
actors TEXT,
plot TEXT,
poster TEXT
);


CREATE TABLE todo
(
id SERIAL4 PRIMARY KEY,
todo VARCHAR(50),
description VARCHAR(250)
);