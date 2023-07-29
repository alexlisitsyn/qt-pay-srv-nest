set search_path to "zz-ch_b2c_panel";

create or replace function fn_tmp_ (
  _param1 bigint,
  _param2 boolean default false
)
  returns table (
    status text,
    extra text
  )
as
$$
declare
  r_table  record;
begin
  set timezone = 'UTC';

  select *
  into r_deposit
  from r_table
  where id = _deposit_id;

  if r_table is null then
    raise exception 'record entry error';
  end if;

  if r_table.status != 'new' then
    raise exception 'record entry status error';
  end if;

  return query
    select 'ok'     as status,
           '{}' as extra;
end
$$ language plpgsql;
