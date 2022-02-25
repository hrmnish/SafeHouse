const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");
var cache = require('memory-cache');
var counter = 0;


// stores user's letter into DB
// accepts "letter" and "user_id" as inputs
// no output unless error
router.post("/sendletter", authorize, async(req,res) => {
    try {
        const letter = req.body.state;

        const insert = await pool.query("INSERT INTO letters (sender_id, letter) VALUES ($1, $2)", [req.user, letter]);
        return res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

// gets top letter from cache, if cache is near empty, update cache **FOR REQUEST A LETTER NOT FOR INBOX**

router.get("/requestletters", authorize, async(req,res) => {
    try {
        // gather 10 valid letters that the user hasn't responded to yet
        const letters = await pool.query(
            `select l.letter_id, l.letter 
            from letters as l, users as u 
            where $1 = u.user_id
            and u.user_id <> l.sender_id
            and l.letter_id not in 
            ( 
                select r.letter_id 
                from responses as r 
                where r.sender_id = u.user_id
            ) 
            order by l.responses asc 
            limit 10`,
            [req.user]
        );
        
        // if letter is empty 
        if (letters.rows.length === 0) {
            return res.status(400).json("Bad motherfucking request letter no here")
        }

        const jsonString = JSON.stringify(Object.assign({}, letters.rows))

        return res.status(200).json(jsonString)
        

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

// stores user response in to response table

router.post("/sendresponse", authorize, async(req,res) => {
    try {
        const {letter_id, letter} = req.body;

        const insert = await pool.query("INSERT INTO responses (letter_id, sender_id, response) VALUES ($1, $2, $3)", [letter_id, req.user, letter]);
        res.status(200).send(true);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})


// gets table of letters/responses for inbox view 
router.post("/getinboxresponses", authorize, async(req,res) => {
    try {
        const letter_id = req.body.letter_id;

        const response = await pool.query("SELECT response FROM responses WHERE letter_id = $1 ORDER BY response asc", [letter_id]);
        
        const jsonString = JSON.stringify(Object.assign({}, response.rows))

        if (response.rows.length != 0) {
            return res.status(200).json(jsonString)
        } else {
            return res.status(400).json(false);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(false);     
    }
})

router.get("/getinboxletters", authorize, async(req,res) => {
    try {

        const letters = await pool.query(
            `select l.letter_id, l.letter 
            from letters as l, users as u 
            where $1 = u.user_id
            and u.user_id = l.sender_id
            order by l.responses asc`,
            [req.user]
        );

        const jsonString = JSON.stringify(Object.assign({}, letters.rows))
        
        if (letters.rows.length != 0) {
            return res.status(200).json(jsonString)
        } else {
            return res.status(400).json(false);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(false);     
    }
})

module.exports = router;