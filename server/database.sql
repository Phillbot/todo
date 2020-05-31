create table todo
(
    id serial primary key,
    description varchar(255),
    is_done bool not null default false
);