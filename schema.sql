-- DROP DATABASE IF EXISTS avalanche;

CREATE DATABASE avalanche;
USE avalanche;

CREATE TABLE gear
(
	id int NOT NULL AUTO_INCREMENT,
	item varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE obstacles
(
	id int NOT NULL AUTO_INCREMENT,
	obstacle varchar(30) NOT NULL,
	delay int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE characters
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	PRIMARY KEY (id)
);

