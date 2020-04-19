const config = require('config');
const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: config.get('clientID'),
			clientSecret: config.get('clientSecret'),
			callbackURL: '/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
				// user already exist log him in
			} else {
				//create new user
				newUser = await new User({
					googleId: profile.id,
				}).save();
				return done(null, newUser);
			}
		}
	)
);
