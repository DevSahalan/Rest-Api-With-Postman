const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise
const UserSchema = new Schema({

    email: String,
    pass: String,
    pass2: String


})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel