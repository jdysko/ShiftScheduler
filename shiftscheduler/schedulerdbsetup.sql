## Test setup


SET SQL_SAFE_UPDATES = 0;
truncate table ShiftsPersonel;
truncate table personel;
truncate table Shifts;
truncate table runs;
SET SQL_SAFE_UPDATES = 1;

insert into runs (Run,DateStart,DateEnd)
select 'TestRun', '2016-03-01','2016-04-30';

insert into personel (NICEaccount,ID_CollaborationGroups,password)
Select 'Zuza', 1, 'asd'
UNION ALL
SELECT 'Andrzej', 1, 'zxc'
