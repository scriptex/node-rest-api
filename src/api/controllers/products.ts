/**
 * External dependencies
 */
import * as mongoose from 'mongoose';

/**
 * Product model
 */
import Product from '../models/product';
import { ROOT, PORT } from '../../settings';

const url = `${ROOT}:${PORT}/products/`;

/**
 * List all products
 */
export const all = (_, res) => {
	Product.find()
		.select('name price _id productImage')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				products: docs.map((doc: any) => {
					return {
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,
						_id: doc._id,
						request: {
							type: 'GET',
							url: url + doc._id
						}
					};
				})
			};

			res.status(200).json(response);
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};

/**
 * Create a product
 */
export const create = (req, res) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path
	});

	product
		.save()
		.then((result: any) => {
			res.status(201).json({
				message: 'Created product successfully',
				createdProduct: {
					name: result.name,
					price: result.price,
					_id: result._id,
					request: {
						type: 'GET',
						url: url + result._id
					}
				}
			});
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};

/**
 * Get a single product
 */
export const get = (req, res) => {
	const id = req.params.productId;

	Product.findById(id)
		.select('name price _id productImage')
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json({
					product: doc,
					request: {
						url,
						type: 'GET'
					}
				});
			} else {
				res.status(404).json({
					message: 'No valid entry found for provided ID'
				});
			}
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};

/**
 * Update a product
 */
export const update = (req, res) => {
	const _id = req.params.productId;
	const $set = {};

	for (const ops of req.body) {
		$set[ops.propName] = ops.value;
	}

	Product.update({ _id }, { $set })
		.exec()
		.then(_ => {
			res.status(200).json({
				message: 'Product updated',
				request: {
					type: 'GET',
					url: url + _id
				}
			});
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};

/**
 * Remove a product
 */
export const remove = (req, res) => {
	const _id = req.params.productId;

	Product.remove({ _id })
		.exec()
		.then(_ => {
			res.status(200).json({
				message: 'Product deleted',
				request: {
					url: url,
					type: 'POST',
					body: { name: 'String', price: 'Number' }
				}
			});
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};
