--
truncate table s_user;
insert into s_user(id, name, email, login, base_role, confirmed, confirmed_ts, status)
values (1, 'admin', 'admin@bitpulse.me', 'admin@bitpulse.me', 'admin', true, now(), 'active'),
       (2, 'user', 'user@bitpulse.me', 'user@bitpulse.me', 'user', true, now(), 'active'),
       (3, 'oper', 'oper@bitpulse.me', 'oper@bitpulse.me', 'oper', true, now(), 'active'),
       (4, 'agent', 'agent@bitpulse.me', 'agent@bitpulse.me', 'agent', true, now(), 'active'),
       (5, 'super', 'super@bitpulse.me', 'super@bitpulse.me', 'admin', true, now(), 'active'),
       (6, 'n/a', 'na@bitpulse.me', 'na@bitpulse.me', 'user', true, now(), 'new');

SELECT setval('s_user_id_seq', 10, true);

update s_user
set password = '$2b$07$fRFIggBBmx0hz.WzZjkqeu9tWeftawwIx.Kp6Y40TQ/jS0Je.QKHa';
-- set password = '$2b$07$0Gun0hUB/mPt7P1Zc9/ojO2k5lJe2xtRYFOjlhUp8IY39eWEkSF6G';

--
truncate table s_role;
insert into s_role (id, name, extra, admin, default_permission)
values ('agent', 'контрагент', false, false, '{agn_dashboard,agn_trans_history}'),
       ('oper', 'оператор', true, false, '{opr_dashboard,opr_agent_management,opr_partner_management,opr_reports}'),
       ('admin', 'администратор', true, true, '{adm_app_management,adm_user_management,opr_agent_management,opr_partner_management,adm_reports}');
-- ToDo: add service

--
update s_user b
set permission = s.default_permission
from (
       select u.id, r.default_permission
       from s_user u
              inner join s_role r on u.base_role = r.id
     ) s
where b.id = s.id;

update s_user
set permission = array_append(permission, 'opr_dashboard')
where email = 'super@bitpulse.me';

truncate table s_service;
insert into s_service (id, name, role, token, uuid, key_file_path)
values (1, 'bg-panel', 'int-api', null, uuid_generate_v4(), null);

select setval('s_service_id_seq', 10);

insert into s_service (name, role, token, uuid, key_file_path)
values ('test api 1', 'api', 'test_token_1', uuid_generate_v4(), '/1/public_key.pem'),
       ('test api 2', 'api', 'test_token_2', uuid_generate_v4(), '/test/public_key.pem');
