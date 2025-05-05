const mongoose = require('mongoose');

// schema tells mongo the object structure:
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//associates user schema with mongo db library:
mongoose.model('User', userSchema);