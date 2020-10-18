import { config } from 'dotenv';
import { createTransport } from 'nodemailer';

config();

const mailer = createTransport({
	host: process.env.HOST,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
});

export const sendVerificationEmail = (username: string, email: string, id: string) => {
	mailer.sendMail({
		from: process.env.FROM,
		to: email,
		subject: 'Verify your Email',
		// TODO: CHANGE WEBSITE NAME
		html: `
		<!DOCTYPE html>
		<body>
			Thanks for signing up, ${username}! Please click on <a href="http://localhost:1025/verify?id=${id}">this link</a> to verify your email address.
		</body>
		`,
	});
};
