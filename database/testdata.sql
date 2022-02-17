
COPY users(user_name, user_email, user_password) FROM stdin USING DELIMITERS '|';
testUser1|testUser1@gmail.com|testUser1
testUser2|testUser2@gmail.com|testUser2
testUser3|testUser3@gmail.com|testUser3
testUser4|testUser4@gmail.com|testUser4
testUser5|testUser5@gmail.com|testUser5
\.

-- inserts N letters per testUsernN
DO $$
declare
counter INT := 1;
begin
while counter <= 5 loop
    INSERT INTO letters (sender_id, letter)
    SELECT user_id, CONCAT( counter, 'st letter from', user_name) 
    FROM users
    ORDER BY user_name DESC
    LIMIT 6 - counter;
    counter := counter+1;
end loop;
end$$;

INSERT INTO RESPONSES(sender_id, letter_id, response)
SELECT u.user_id, l.letter_id, CONCAT ('Response from ', u.user_name)
FROM users as u, letters as l
WHERE l.letter_id in 
(   
    select l2.letter_id 
    from letters as l2, users as u2
    where u2.user_id = u.user_id
    and u2.user_id <> l2.sender_id
    and l2.letter_id not in ( select r.letter_id from responses as r where r.sender_id = u2.user_id)
    order by l2.responses asc
    limit 1
)

-- not working 
-- UPDATE letters
-- SET responses = 
-- (
--     SELECT COUNT(responses.response_id) 
--     from responses 
--     where responses.letter_id = letters.letter_id
-- );
