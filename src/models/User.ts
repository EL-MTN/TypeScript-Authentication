import { Schema, model, Document } from 'mongoose';

export const UserSchema = new Schema({
	username: { type: String },
	password: { type: String },
	email: { type: String },
});

export interface UserInterface extends Document {
	/**
	 * User's username
	 */
	username: string;

	/**
	 * The user's hashed password
	 */
	password: string;

	/**
	 * The user's email
	 */
	email: string;
}

export const User = model<UserInterface>('User', UserSchema);
