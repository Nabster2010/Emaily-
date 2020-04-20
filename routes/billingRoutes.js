const config = require('config');
const requireLogin = require('../middlewares/requireLogin');

const stripe = require('stripe')(config.get('stripeSecretKey'));

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '5 dolars for 5 credit',
			source: req.body.id,
		});

		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
	});
};
