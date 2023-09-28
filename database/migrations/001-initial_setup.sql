CREATE DATABASE database_blog;

\c database_blog;

CREATE TABLE users (
	id UUID NOT NULL PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
    hash VARCHAR ( 2000 ) NOT NULL,
    salt VARCHAR ( 2000 ) NOT NULL,	
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ ,
    updated_at TIMESTAMPTZ
);

CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    FOREIGN KEY (author_id)
    REFERENCES users (id)
);

