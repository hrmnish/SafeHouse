-- query for getletters get req
-- where $1 is req.user

select l.letter_id, l.letter 
from letters as l, users as u
where $1 = u.user_id
and u.user_id <> l.sender_id
and l.letter_id not in ( select r.letter_id from responses as r where r.sender_id = u.user_id)
order by l.responses asc
limit 10;