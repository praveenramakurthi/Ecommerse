const express = require('express');
const router = express.Router();
const User = require('./model/User.js')
const bcrypt = require('bcrypt');
router.use(express.json());
const jwt=require('jsonwebtoken');
require("dotenv").config({ path: "./config/config.env" });
const cors = require('cors');
router.use(cors());

//SIGNUP ROUTER
router.post("/signup", async (req, res) => {
    const { email, phoneNumber, password } = req.body;
    if (!email && !phoneNumber) {
        return res.status(400).json("Email or PhoneNumber is required");
    }
    if (!password) {
        return res.status(400).json("Password is required");
    }
    if (password.length < 6) {
        return res.status(400).json("Password must be at least 6 characters");
    }
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(400).json("User already exists!! try creating new with another account..")
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email: email || undefined,
            phoneNumber: phoneNumber || undefined,
            password: hashedPassword
        })

        await newUser.save();
        return res.status(200).json("User Created Successfully");
    }
    catch (error) {
        console.log("Internal service error ", error);
        return res.status(500).json("Error creating user");
    }
});


//SIGNIN
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).send("Password does not match");
        }

        const payload = { user: { _id: user._id } };
        // Sign JWT token
        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                throw err;
            }
            // Omit password from user object before sending it in the response
            const { password: _, ...userResponse } = user.toJSON();
            return res.json({ token, user: userResponse });
        })
    }
    catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;