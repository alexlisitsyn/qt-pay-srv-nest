set search_path to "zz-ch_b2c_panel";

create or replace function fn_get_template(
  _id bigint
)
  returns table
  (
    id     bigint,
    param1 text,
    param2 numeric(19, 6),
    param3 timestamp
  )
as
$$
begin
  set timezone = 'UTC';

  return query
    select _id, 'text', 123, now();
end;
$$ language plpgsql;
