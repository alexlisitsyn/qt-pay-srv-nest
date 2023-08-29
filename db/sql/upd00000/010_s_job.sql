create table s_job (
  id                bigserial primary key,
  name              text      not null,
  task              text      not null,
  options           json      null     default '{}'::json,
  cron_options      json      not null,
  status            text      not null default 'new',
  description       text      null,
  last_execution_ts timestamp null,
  created_ts        timestamp not null default now(),
  updated_ts        timestamp null
);

-- comment on column s_job.extra is 'false-user, true-adm/oper';

alter table s_job
  owner to postgres;
