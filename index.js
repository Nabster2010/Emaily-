const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');
const app = express();
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [config.get('cookieKey')],
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ extended: false }));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Sever listening on Port 5000'));

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
