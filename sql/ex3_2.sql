select org.name, count(person.pid)
	from test.tOrg  as org
	left join test.tPerson as person 
		on person.oid = org.oid
	group by org.oid, org.name
	