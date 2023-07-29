create table s_user_event (
  id          bigserial primary key,
  ts          timestamp not null default now(),
  user_id     bigint    not null,
  type        text      not null,
  description text      null
);

alter table s_user_event
  owner to postgres;

create index idx_s_user_event_1 on s_user_event (user_id, ts desc);
