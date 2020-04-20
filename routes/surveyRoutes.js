const requireLogin = require('../middlewares/requireLogin');

const requireCredit = require('../middlewares/requireCredit');
const config = require('config');
const Survey = require('../models/Survey');
//const Mailer = require('../services/Mailer');
//const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get('SendGridKey'));

module.exports = (app) => {
	app.get('/api/surveys/thanks', (req, res) => res.send('Thanks'));

	app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
		const { recipients, title, subject, body } = req.body;

		const survey = new Survey({
			title,
			body,
			subject,
			recipients: recipients
				.split(',')
				.map((email) => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		});
		console.log(recipients.split(','));

		//const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			const msg = {
				to: recipients.split(',').map((email) => email.trim()),
				from: 'nabster201037@gmail.com',
				subject: survey.title,
				text: survey.body,
				html: `<div style="text-align: center;">
				<h3>I'd like your input!</h3>
				<p>Please answer the following question:</p>
				<p>${survey.body}</p>
				<div>
				  <a href="http://localhost:3000/api/surveys/thanks">Yes</a>
				</div>
				<div>
				  <a href="http://localhost:3000/api/surveys/thanks">No</a>
				</div>
			  </div>`,
			};
			//await mailer.send();
			await sgMail.send(msg);
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (error) {
			console.error(error);
			res.status(422).send(error);
		}
	});
};
