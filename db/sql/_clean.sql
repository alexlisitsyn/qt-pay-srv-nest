drop schema if exists %%SCHEMA%% cascade;
create schema %%SCHEMA%%;
comment on schema %%SCHEMA%% is '%%SCHEMA%% schema';
create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog;
grant all on schema %%SCHEMA%% to postgres;
