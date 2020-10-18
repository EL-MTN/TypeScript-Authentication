import { Router } from 'express';

export const Home = Router();

Home.get('/', (_req, res) => {
	res.render('index');
});