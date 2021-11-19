create function getFullOrgName (@oid AS INT) 
returns nvarchar(max)
as 
begin
	declare @res varchar(max);

	with recursive
	as 
	( 
		select oid, poid, name 
		from test.tOrg as org
			where oid = @oid
		union all

		select org.oid, org.poid, org.name
		from test.tOrg as org
		join recursive r 
			on r.poid = org.oid
	) 
	select @res = concat('/',name, @res)
	from recursive

	return @res
end;


