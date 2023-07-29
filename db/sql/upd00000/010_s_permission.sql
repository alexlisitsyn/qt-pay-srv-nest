create table s_permission (
  id   text primary key,
  name text not null
);
alter table s_permission
  owner to postgres;

insert into s_permission(id, name)
values ('agn_dashboard', 'Контрагент. Дашборд'),
       ('agn_trans_history', 'Контрагент. История транзакций'),
       ('adm_user_management', 'Администратор. Управление пользователями'),
       ('adm_reports', 'Администратор. Отчеты'),
       ('adm_app_management', 'Администратор. Настройки сервиса'),
       ('opr_dashboard', 'Оператор. Дашборд');
