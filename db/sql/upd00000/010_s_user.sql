create table s_user (
  id              bigserial primary key,
  name            text,
  email           text,
  login           text,
  phone           text,
  password        text,
  base_role       text,
  permission      text[]    null,
  reset_password  boolean            default false,
  confirmed       boolean            default false,
  confirmed_ts    timestamp null,
  blocked         boolean            default false,
  blocked_ts      timestamp null,
  block_reason    text      null,
  deleted         boolean            default false,
  deleted_ts      timestamp null,
  otp_auth_base32 text,
  status          text      not null default 'new',
  default_route   text      null,
  created_ts      timestamp not null default now()
);

alter table s_user
  owner to postgres;

create unique index idx_s_user_email on s_user (email);

