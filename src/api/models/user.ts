/**
 * External dependencies
 */
import * as mongoose from 'mongoose';

/**
 * Email regex
 */
const emailRe: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

/**
 * Create the user schema
 */
const user: mongoose.Schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		match: emailRe
	},
	password: {
		type: String,
		required: true
	}
});

/**
 * Export the model
 */
export default mongoose.model('User', user);
