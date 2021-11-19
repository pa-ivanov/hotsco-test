with 
cte1 as 
(	
	select *,
		sum([Sum]) over (partition by Deal order by [Date]) as Debt
	from test.PDCL 
),
cte2 as 
(
	select * ,
		iif	(lag(debt, 1, 0) over (partition by Deal order by [Date]) = 0 , 1, null) as DelayStart
	from cte1
),
cte3 as 
(
	select Deal, 
	   sum([Sum]) as Debt, 
	   max(iif (DelayStart = 1, date, null)) as DelayDate
	from cte2
	group by Deal
	having sum([Sum]) > 0
),
cte4 as 
(
	select * , datediff(d, DelayDate, getdate()) as DelayDays 
	from cte3 
)

select * from cte4




	
