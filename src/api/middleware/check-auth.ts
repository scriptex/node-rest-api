/**
 * External dependenices
 */
import { verify } from 'jsonwebtoken';

/**
 * Internal dependencies
 */
import { JWT_KEY } from '../../settings';

/**
 * Manage authentication using
 * JSON Web Token
 */
export default (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		req.userData = verify(token, JWT_KEY);

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Auth failed', error });
	}
};
