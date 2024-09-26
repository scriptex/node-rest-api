/**
 * External dependencies
 */
import cors from 'cors';
import * as morgan from 'morgan';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

/**
 * Internal dependencies: routes
 */
import userRoutes from './api/routes/user';
import orderRoutes from './api/routes/orders';
import productRoutes from './api/routes/products';

import { ATLAS_URL } from './settings';

/**
 * Create the application
 */
const app: express.Application = express();

interface ErrorWithStatus extends Error {
	status?: number;
}

/**
 * Connect to the database
 */
mongoose.connect(ATLAS_URL || '');

/**
 * Add middlewares
 */
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const whitelist = ['http://localhost:3000'];
const corsOptions = {
	origin(origin: string | undefined, callback: (error: Error | null, value: boolean) => unknown) {
		if (origin && whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	optionsSuccessStatus: 200,
	credentials: true,
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'device-remember-token',
		'Access-Control-Allow-Origin',
		'Origin',
		'Accept'
	]
};

/**
 * Setup CORS
 */
app.use(cors(corsOptions));

/**
 * Setup routes
 */
app.use('/user', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

/**
 * Error handling: 404
 */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	const error: ErrorWithStatus = new Error('Not found');

	error.status = 404;

	next(error);
});

/**
 * Error handling: 500
 */
app.use((error: ErrorWithStatus, req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

export default app;
