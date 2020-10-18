import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { UserSchema, UserInterface } from './User';

const VerificationSchema = new Schema({
	_id: { type: String, default: uuid },
	user: UserSchema,
});

interface VerificationInterface extends Document {
	/**
	 * The user document in the verification
	 */
	user: UserInterface;
}

export const Verification = model<VerificationInterface>('Verification', VerificationSchema);
