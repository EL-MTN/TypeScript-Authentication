import { Router } from 'express';
import { AuthCheck } from '../middlewares/AuthCheck';

export const User = Router();

User.use(AuthCheck);

User.get('/home', (req, res) => {
	res.render('user/home', { username: req.session!.username });
});
