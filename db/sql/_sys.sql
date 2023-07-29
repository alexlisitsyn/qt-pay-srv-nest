create table _inst
(
    id text not null,
    dt timestamp not null default now(),
    constraint pk__inst primary key (id)
);
