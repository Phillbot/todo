create table todo
(
    id serial primary key,
    user_name varchar(255) not null,
    description varchar(255) not null,
    is_done bool not null default false
);

create table users
(
    email varchar(255) not null primary key,
    pass varchar(255) not null,
    user_name varchar(255) not null,
    UNIQUE(email)
);