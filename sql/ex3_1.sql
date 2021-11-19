select org.name, count(person.pid)	
	from test.tOrg  as org
	join test.tPerson as person 
		on person.oid = org.oid
	group by org.oid, org.name