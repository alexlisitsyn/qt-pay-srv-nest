create table bpmn (
	name       text primary key,
	schema     text      not null,
	options    json      null     default '{}'::json,
	active     boolean   not null default false,
	created_ts timestamp not null default now(),
	updated_ts timestamp null
);

comment on column bpmn.schema is 'bpmn scheme content (xml)';

alter table bpmn
	owner to postgres;
