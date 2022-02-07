const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
    try {

        // get req.body(name, email, password)
        const { name, email, password} = req.body;

        //check if user exist (if not then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        //Bcrypt the password to enter in databse 
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, saltRound);

        const newUSER = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name,email,bcryptPassword]);

        //generate our jwt token
        const token = jwtGenerator(newUSER.rows[0].user_id);
        return res.json({token});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login", validInfo, async(req,res) => {
    try {
        //get the req.body 
        const {email, password} = req.body;

        //check if user dont exist 
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //check if incoming password is the same as db password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //give them a jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verified", authorization, async (req,res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");        
    }
})

module.exports = router;

