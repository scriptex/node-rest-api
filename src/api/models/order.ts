/**
 * External dependencies
 */
import * as mongoose from 'mongoose';

/**
 * Create the order schema
 */
const order: mongoose.Schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	quantity: {
		type: Number,
		default: 1
	}
});

/**
 * Export the model
 */
export default mongoose.model('Order', order);
