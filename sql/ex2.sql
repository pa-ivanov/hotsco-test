select orgPerson.name
from (select org.name, person.pid
		from test.tOrg  as org
		left join test.tPerson as person 
			on person.oid = org.oid )  as orgPerson
		where orgPerson.pid is null

	
		