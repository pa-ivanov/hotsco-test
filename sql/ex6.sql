WITH numDate as (
select acc.aid, acc.accNumber, max(rest.stDate) as nDate
from test.tAccount as acc
left join test.tAccountRest as rest
	on rest.aid = acc.aid
	group by acc.aid, acc.accNumber
)

select distinct numDate.accNumber, numDate.nDate, rest.balance 
from numDate
left join test.tAccountRest as rest
	on numDate.aid = rest.aid and numDate.nDate = rest.stDate

