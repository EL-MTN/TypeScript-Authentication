import { compareSync, hashSync } from 'bcrypt';
import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { User } from '../models/User';
import { Verification } from '../models/Verification';
import { sendVerificationEmail } from '../smtp/mailer';

export const Authentication = Router();

Authentication.get('/signup', (_req, res) => {
	res.render('auth/signup');
});
Authentication.get('/login', (_req, res) => {
	res.render('auth/login');
});

Authentication.get('/verify', async (req, res) => {
	if (!req.query.id) {
		req.flash('error', 'Invalid verification link');
		return res.redirect('/');
	}

	const verification = await Verification.findOneAndDelete({ _id: req.query.id });

	if (!verification) {
		req.flash('error', 'Invalid verification link');
		return res.redirect('/');
	}

	const user = new User({
		username: verification.user.username,
		password: verification.user.password,
	});
	await user.save();

	if (req.session) {
		req.session.username = user.username;
		req.session.userId = user._id;
	} else {
		req.flash('error', 'Session disabled');
		return res.redirect('/login');
	}

	res.redirect('/home');
});

Authentication.post('/signup', async (req, res) => {
	await check('username', 'Username must be alphanumeric and at least 5 letters long')
		.isLength({ min: 5 })
		.bail()
		.isAlphanumeric()
		.bail()
		.custom(async (username) => {
			if (
				(await User.findOne({ username: username })) ||
				(await Verification.findOne({ 'user.username': username }))
			) {
				return Promise.reject('Username already in use, try another one');
			}
		})
		.run(req);

	await check('password', 'Password should be at least 5 characters long')
		.isLength({ min: 5 })
		.run(req);
	await check('email', 'Email is invalid')
		.isEmail()
		.bail()
		.custom(async (email) => {
			if (
				(await User.findOne({ email: email })) ||
				(await Verification.findOne({ 'users.email': email }))
			) {
				return Promise.reject('Email already in use, please do not use multiple accounts');
			}
		})
		.run(req);

	const errors = validationResult(req);

	errors.array().forEach((error) => {
		req.flash('error', error.msg);
	});

	if (!errors.isEmpty()) {
		return res.redirect('/signup');
	}

	const { username, password, email } = req.body;

	const verification = new Verification({
		user: { username: username, password: hashSync(password, 12) },
	});

	verification.save();
	sendVerificationEmail(username, email, verification._id);

	req.flash('info', 'Verification email sent, check your inbox');
	return res.redirect('/');
});
Authentication.post('/login', async (req, res) => {
	await check('password', 'Password cannot be empty').isLength({ min: 1 }).run(req);
	await check('username', 'Username cannot be empty').isLength({ min: 1 }).run(req);

	const errors = validationResult(req);

	errors.array().forEach((error) => {
		req.flash('error', error.msg);
	});

	if (!errors.isEmpty()) {
		return res.redirect('/login');
	}

	const { username, password } = req.body;

	const user = await User.findOne({ username: username });

	if (user) {
		if (!compareSync(password, user.password)) {
			req.flash('error', 'Invalid credentials');
			return res.redirect('/login');
		}

		if (req.session) {
			req.session.username = user.username;
			req.session.userId = user._id;
		} else {
			req.flash('error', 'Session disabled');
			return res.redirect('/login');
		}

		return res.redirect('/home');
	} else {
		req.flash('error', 'Invalid credentials');
		return res.redirect('/login');
	}
});
