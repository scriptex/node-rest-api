/**
 * External dependencies
 */
import * as multer from 'multer';
import * as express from 'express';

/**
 * Internal dependencies
 */
import checkAuth from '../middleware/check-auth';
import { all, create, get, update, remove } from '../controllers/products';

const router: express.Router = express.Router();

/**
 * Setup file upload
 */
const storage: multer.StorageEngine = multer.diskStorage({
	destination(req: express.Request, file: Express.Multer.File, cb: (error: Error, destination: string) => void) {
		cb(null, './uploads/');
	},
	filename(req: express.Request, file: Express.Multer.File, cb: (error: Error, filename: string) => void) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

/**
 * Setup file upload filters
 * Basically accept only JPG and PNG files
 */
const fileFilter = (
	req: express.Request,
	file: Express.Multer.File,
	cb: (error: Error, save: boolean) => void
): void => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

/**
 * Create the file uploader
 */
const upload: any = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
});

/**
 * Get all products
 */
router.get('/', all);

/**
 * Create a product
 */
router.post('/', checkAuth, upload.single('productImage'), create);

/**
 * Get a single product
 */
router.get('/:productId', get);

/**
 * Update a product
 */
router.patch('/:productId', checkAuth, update);

/**
 * Remove a product
 */
router.delete('/:productId', checkAuth, remove);

/**
 * Export the configuratiom
 */
export default router;
