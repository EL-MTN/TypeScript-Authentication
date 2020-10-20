import createMongoStore from 'connect-mongo';
import { config } from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import { join } from 'path';
import favicon from 'serve-favicon';
import { Authentication } from './controllers/Authentication';
import { Home } from './controllers/Home';
import { User } from './controllers/User';

config();

if (!process.env.COOKIE_SECRET || !process.env.MONGO_URI) {
	console.log('Please change .env variables');
	process.exit(1);
}

export const app = express();

const MongoStore = createMongoStore(session);

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ url: process.env.MONGO_URI }),
		cookie: {
			// TODO: SET COOKIE MAX AGE
			maxAge: 3600 * 1000,
		},
	})
);
app.use(flash());
app.use(favicon(join('public', 'images', 'favicon.png')));

app.use(Home);
app.use(Authentication);

app.use(User);
