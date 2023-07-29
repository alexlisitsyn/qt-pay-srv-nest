
--
truncate table tbl;
insert into tbl (id, name)
values (1, 'problem'),
       (2, 'new')
;

select setval('tbl_id_seq', 10);

