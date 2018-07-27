/**
 * External dependencies
 */
import * as multer from 'multer';
import * as express from 'express';

const router = express.Router();

/**
 * Internal dependencies
 */
import checkAuth from '../middleware/check-auth';
import { all, create, get, update, remove } from '../controllers/products';

/**
 * Setup file upload
 */
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/');
	},
	filename(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

/**
 * Setup file upload filters
 * Basically accept only JPG and PNG files
 */
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

/**
 * Create the file uploader
 */
const upload = multer({
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
