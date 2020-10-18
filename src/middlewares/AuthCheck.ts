import { NextFunction, Request, Response } from 'express';

export const AuthCheck = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session!.userId || !req.session!.username) {
		req.flash('error', 'Please sign in');
		return res.redirect('/');
	}

	next();
};
