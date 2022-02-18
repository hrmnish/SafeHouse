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
// todo : reset cache when counter hits 10
// todo : make sure user doesnt see letters they responded to
// accepts "user_id" as input
// returns a letter 
router.get("/getletter", authorize, async(req,res) => {
    try {

        // if (cache.size() < 10) {
        //     const letters = await pool.query("SELECT * FROM letters ORDER BY responses DESC WHERE responses <= 10 AND sender_id <> $1", [req.user]);
        //     for (i = 0; i < letters.rows.length; i++) {
        //         cache.put(letters.rows[i].letter_id, letters.rows[i].letter, 300);
        //     }
        // }
        
        // var keys = cache.keys();
        // if (counter != 10) {
        //     counter++;
        //     return res.json({ keys,[counter] : cache.get(keys[counter]) });
        // }

        // if (counter == 10) { 
        //     counter = 0; 
        // }
        
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
            limit 10"`,
            [req.user]
        );

        // TODO: send letters to frontend through json object

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

// stores user response in to response table
// todo update letters table aswell
// accepts "letter_id", "response", and "user_id"
// no ouptu  unless error
router.post("/sendresponse", authorize, async(req,res) => {
    try {
        const {letter_id, letter} = req.body;

        const insert = await pool.query("INSERT INTO responses (letter_id, sender_id, response) VALUES ($1, $2, $3)", [letter_id, req.user, letter]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})


// gets top 
router.get("/getresponse", authorize, async(req,res) => {
    try {
        const letter_id = req.body;

        const response = await pool.query("SELECT response FROM responses WHERE letter_id = $1", [letter_id]);

        if (response.rows.length != 0) {
            return res.json(response.rows[0])
        } else {
            return res.status(400).json("Response not found");
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

module.exports = router;