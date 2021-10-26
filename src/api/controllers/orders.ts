/**
 * External dependencies
 */
import * as mongoose from 'mongoose';

/**
 * Order model
 */
import Order from '../models/order';

/**
 * Product model
 */
import Product from '../models/product';
import { ROOT, PORT } from '../../settings';

const url: string = `${ROOT}:${PORT}/orders/`;

/**
 * Get all orders
 */
export const all = (_, res): void => {
	Order.find()
		.select('product quantity _id')
		.populate('product', 'name')
		.exec()
		.then(docs => {
			res.status(200).json({
				count: docs.length,
				orders: docs.map((doc: any) => {
					return {
						_id: doc._id,
						product: doc.product,
						quantity: doc.quantity,
						request: {
							type: 'GET',
							url: url + doc._id
						}
					};
				})
			});
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};

export const create = ({ body }, res) => {
	const { productId, quantity } = body;

	Product.findById(productId)
		.then(product => {
			if (!product) {
				return res.status(404).json({
					message: 'Product not found'
				});
			}

			const order = new Order({
				_id: new mongoose.Types.ObjectId(),
				quantity: quantity,
				product: productId
			});

			return order.save();
		})
		.then(({ _id, product, quantity }) => {
			res.status(201).json({
				message: 'Order stored',
				createdOrder: {
					_id,
					product,
					quantity
				},
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

export const get = (req, res) => {
	Order.findById(req.params.orderId)
		.populate('product')
		.exec()
		.then(order => {
			if (!order) {
				return res.status(404).json({
					message: 'Order not found'
				});
			}

			res.status(200).json({
				order,
				request: {
					url,
					type: 'GET'
				}
			});
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};

export const remove = (req, res) => {
	Order.remove({ _id: req.params.orderId })
		.exec()
		.then(_ => {
			res.status(200).json({
				message: 'Order deleted',
				request: {
					url,
					type: 'POST',
					body: {
						productId: 'ID',
						quantity: 'Number'
					}
				}
			});
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};
