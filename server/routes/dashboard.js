const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");
var cache = require('memory-cache');
var counter = 0;

router.get("/sendletter", authorize, async(req,res) => {
    try {
        const {letter} = req.body;

        const insert = await pool.query("INSERT INTO letters (sender_id, letter) VALUES ($1, $2)", [req.user, letter]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

router.get("/getletter", authorize, async(req,res) => {
    try {

        if (cache.size() < 10) {
            const letters = await pool.query("SELECT * FROM letters ORDER BY responses DESC WHERE responses <= 10 AND sender_id <> $1", [req.user]);
            for (i = 0; i < letters.rows.length; i++) {
                cache.put(letters.rows[i].letter_id, letters.rows[i].letter, 300);
            }
        }
        
        var keys = cache.keys();
        if (counter != 10) {
            counter++;
            return res.json({ keys,[counter] : cache.get(keys[counter]) });
        }

        if (counter == 10) { counter = 0; }


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

router.get("/sendresponse", authorize, async(req,res) => {
    try {
        const {letter_id, letter} = req.body;

        const insert = await pool.query("INSERT INTO responses (letter_id, sender_id, response) VALUES ($1, $2, $3)", [letter_id, req.user, letter]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");     
    }
})

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