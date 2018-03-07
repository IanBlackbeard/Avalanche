CREATE DATABASE avalanch;
USE avalanche;

CREATE TABLE gear
(
	id int NOT NULL AUTO INCREMENT,
	item varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE obstacles
(
	id int NOT NULL AUTO INCREMENT,
	obstacle varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE characters
(
	id int NOT NULL AUTO INCREMENT,
	name
);

