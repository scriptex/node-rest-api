/**
 * External dependencies
 */
import * as express from 'express';

/**
 * Internal dependencies
 */
import checkAuth from '../middleware/check-auth';
import { all, create, get, remove } from '../controllers/orders';

const router: express.Router = express.Router();

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
 * Export the configuration
 */
export default router;
