DROP DATABASE IF EXISTS posts_db;
CREATE DATABASE posts_db;

USE posts_db;

CREATE TABLE myposts (
    id INT NOT NULL,
    user VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    post VARCHAR(500) NOT NULL,
    public VARCHAR(10) NOT NULL
);