/**
 * External dependencies
 */
import * as express from 'express';

const router = express.Router();

/**
 * Internal dependencies
 */
import checkAuth from '../middleware/check-auth';
import { all, create, get, remove } from '../controllers/orders';

/**
 * Get all orders
 */
router.get('/', checkAuth, all);

/**
 * Create an order
 */
router.post('/', checkAuth, create);

/**
 * Get an order
 */
router.get('/:orderId', checkAuth, get);

/**
 * Remove an order
 */
router.delete('/:orderId', checkAuth, remove);

/**
 * Export the configuratiom
 */
export default router;
