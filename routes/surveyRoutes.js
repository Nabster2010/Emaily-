const requireLogin = require('../middlewares/requireLogin');
const _ = require('lodash');
const { URL } = require('url');
const { Path } = require('path-parser');
const requireCredit = require('../middlewares/requireCredit');
const config = require('config');
const Survey = require('../models/Survey');
//const Mailer = require('../services/Mailer');
//const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get('SendGridKey'));

module.exports = (app) => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) =>
		res.send('Thanks For Voting')
	);

	app.get('/api/surveys', requireLogin, async (req, res) => {
		try {
			const surveys = await Survey.find({ _user: req.user.id }).select(
				'-recipients'
			);

			res.send(surveys);
		} catch (err) {
			res.status(404).send('not found');
			console.log(err);
		}
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');
		const events = _.chain(req.body)
			.map((event) => {
				const match = p.test(new URL(event.url).pathname);
				if (match) {
					return {
						email: event.email,
						surveyId: match.surveyId,
						choice: match.choice,
					};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each((event) => {
				Survey.updateOne(
					{
						_id: event.surveyId,
						recipients: {
							$elemMatch: { email: event.email, responded: false },
						},
					},
					{
						$inc: { [event.choice]: 1 },
						lastResponse: new Date(),
						$set: { 'recipients.$.responded': true },
					}
				).exec();
			})
			.value();
		res.send({});
	});

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

		//const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			const msg = {
				to: recipients.split(','),
				from: 'nabster201037@gmail.com',
				subject: survey.title,
				text: survey.body,
				html: `<div style="text-align: center;">
				<h3>I'd like your input!</h3>
				<p>Please answer the following question:</p>
				<p>${survey.body}</p>
				<div>
				  <a href="http://localhost:3000/api/surveys/${survey.id}/yes">Yes</a>
				</div>
				<div>
				  <a href="http://localhost:3000/api/surveys/${survey.id}/no">No</a>
				</div>
			  </div>`,
			};
			console.log(msg.to);

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
