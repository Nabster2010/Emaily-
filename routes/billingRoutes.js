const config = require('config');

const stripe = require('stripe')(config.get('stripeSecretKey'));

module.exports = (app) => {
	app.post('/api/stripe', async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '5 dolars for 5 credit',
			source: req.body.id,
		});
		console.log(charge);
	});
};
