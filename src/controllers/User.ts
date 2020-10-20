import { Router } from 'express';
import { AuthCheck } from '../middlewares/AuthCheck';

export const User = Router();

User.use(AuthCheck);

User.get('/home', (req, res) => {
	if (!req.session) {
		req.flash('error', 'Session disabled');
		return res.redirect('/login');
	}

	res.render('user/home', { username: req.session.username });
});
