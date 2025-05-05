const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    // destructure properties out of req.body user object in incoming data
    const { email, password } = req.body;
    try {
        // create a new instance of a user, and assign it to these properties from req.body
        const user = new User({ email, password });
        // tell mongo instance to save this user instance
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ token });
    } catch (err) {
        // invalid data handling
        return res.status(422).send(err.message);
    }
});

module.exports = router;

