/**
 * External dependencies
 */
import * as express from 'express';

/**
 * Internal dependencies
 */
import checkAuth from '../middleware/check-auth';
import { login, signUp, remove } from '../controllers/user';

const router: express.Router = express.Router();

/**
 * Log the user in
 */
router.post('/login', login);

/**
 * Sign the user up
 */
router.post('/signup', signUp);

/**
 * Remove the user
 */
router.delete('/:userId', checkAuth, remove);

/**
 * Export the configuratiom
 */
export default router;
