create table s_service (
  id            bigserial primary key,
  name          text,
  email         text,
  token         text,
  uuid          text,
  key_file_path text,
  role          text,
  blocked       boolean            default false,
  blocked_ts    timestamp null,
  block_reason  text      null,
  deleted       boolean            default false,
  deleted_ts    timestamp null,
  created_ts    timestamp not null default now(),
  bnc_email     text      null
);
alter table s_service
  owner to postgres;

create unique index idx_s_service_token on s_service (token);
