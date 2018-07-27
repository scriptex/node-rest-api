/**
 * External dependencies
 */
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

import { PASSWORD } from './settings';

/**
 * Create the applicatiom
 */
const app = express();

/**
 * Construct the path to the database
 */
// prettier-ignore
const mongoUrl = `mongodb+srv://scriptex:${PASSWORD}@node-rest-api-example-agqm6.mongodb.net/test`;

interface Error {
	status?: number;
}

/**
 * Connect to the database
 */
mongoose.connect(
	mongoUrl,
	{
		useNewUrlParser: true
	}
);

/**
 * Add middlewares
 */
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Setup CORS
 */
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');

	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);

		return res.status(200).json({});
	}

	next();
});

/**
 * Setup routes
 */
app.use('/user', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

/**
 * Error handling: 404
 */
app.use((req, res, next) => {
	const error: any = new Error('Not found');

	error.status = 404;

	next(error);
});

/**
 * Error handling: 500
 */
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

export default app;
