create table s_role (
  id                 text primary key,
  name               text    not null,
  extra              boolean not null,
  admin              boolean not null,
  default_permission text[]  not null
);

comment on column s_role.extra is 'false-user, true-adm/oper';

alter table s_role
  owner to postgres;
