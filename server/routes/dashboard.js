const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");

router.get("/", authorize, async(req,res) => {
    try {
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");     
    }
})

module.exports = router;