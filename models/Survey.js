const mongoose = require('mongoose');
const { Schema } = mongoose;
//const RecipientSchema = require('./Recipient');
const User = require('./User');

const SurveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [
		{
			email: String,
			responded: { type: Boolean, default: false },
		},
	],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponse: Date,
});

module.exports = Survey = mongoose.model('survey', SurveySchema);
