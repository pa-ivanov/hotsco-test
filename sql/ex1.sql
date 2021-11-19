select person.name, org.name 
	from test.tPerson  as person
	left join test.tOrg as org 
		on person.oid = org.oid 