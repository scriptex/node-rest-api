/**
 * External dependencies
 */
import * as mongoose from 'mongoose';

/**
 * Create the product schema
 */
const product: mongoose.Schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	productImage: {
		type: String,
		required: true
	}
});

/**
 * Export the model
 */
export default mongoose.model('Product', product);
