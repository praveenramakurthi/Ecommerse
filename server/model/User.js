const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: 'string', unique: true, sparse: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: 'string', unique: true, sparse: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    password: {
        type: 'string', unique: true
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;