create table s_settings (
  id           text primary key,
  type         text not null,
  value        text not null,
  description  text null,
  web_editable boolean default false
);
alter table s_settings
  owner to postgres;

truncate table s_settings;

insert into s_settings(id, type, value, description, web_editable)
values
  ('request_allocate_check_timeout', 'number', '60', 'Кол-во секунд за которое заявка должна быть взята одним из контрагентов', true),
  ('agent_last_request_count', 'number', '10', 'Кол-во последних заявок, отображаемое агенту', true),
  ('tmp_param_text', 'text', 'some text', 'Временный параметр текстовый', false),
  ('tmp_param_bool', 'boolean', 'true', 'Временный параметр булевый', false),
  ('tmp_param_disable', 'number', '60', 'Временный параметр число', false);
