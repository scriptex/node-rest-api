/**
 * External dependencies
 */
import * as http from 'http';

/**
 * Internal dependencies
 */
import app from './app';
import { PORT } from './settings';

/**
 * Settings
 */
const server = http.createServer(app);

/**
 * Run the server
 */
server.listen(PORT);
