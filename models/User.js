const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	googleId: String,
});

module.exports = User = mongoose.model('user', UserSchema);
