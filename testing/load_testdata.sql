-- ONLY RUN ON EMPTY DATABASE, RUNNING ON PREPOPULATED DATABASE WILL FAIL DUE TO UNIQUENESS CONSTRAINTS
-- output should be: 
-- copy 10 
-- copy 45 
-- copy 100
\COPY Users FROM 'testdata\testdata_users.csv' WITH (FORMAT CSV); -- users are in format username = testUserN, email = username+'@gmail.com', password = username+'Password' 

\COPY Letters FROM 'testdata\testdata_letters.csv' WITH (FORMAT CSV); -- letters are in format "Test Letter from " + username, where username in user table

\COPY Responses FROM 'testdata\testdata_responses.csv' WITH (FORMAT CSV); -- responses are in format "Response from " + username + " to " + letter, where username in users table, letter in letters table