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

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    // error check
    if (!email || !password) {
        return res.status(402).send({ error: 'Must provide email and password!' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'Email not found!' });
    }
    try {
        await user.comparePassword(password);
        // generate JWT and sent it to user so they can use it to authenticate on future requests
        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY');
        // send token
        res.send({ token })
        console.log('signed in');
    } catch (err) {
        return res.status(422).send({ error: 'invalid email or password!' });
    }
});

module.exports = router;

