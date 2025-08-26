import express from 'express';
const router = express.Router();
import {
  protect,
  authorizeRoles,
} from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  updateUser,
  deleteUser,
} from '../controllers/adminController.js';

// Admin-specific routes will go here
router.get('/users', protect, authorizeRoles('Admin'), getAllUsers);
router.route('/users/:id')
  .put(protect, authorizeRoles('Admin'), updateUser)
  .delete(protect, authorizeRoles('Admin'), deleteUser);

router.route('/products')
  .post(protect, authorizeRoles('Admin'), createProduct)
  .get(protect, authorizeRoles('Admin'), getProducts);

router.route('/products/:id')
  .get(protect, authorizeRoles('Admin'), getProductById)
  .put(protect, authorizeRoles('Admin'), updateProduct)
  .delete(protect, authorizeRoles('Admin'), deleteProduct);

router.route('/industries')
  .post(protect, authorizeRoles('Admin'), createIndustry)
  .get(protect, authorizeRoles('Admin'), getIndustries);

router.route('/industries/:id')
  .get(protect, authorizeRoles('Admin'), getIndustryById)
  .put(protect, authorizeRoles('Admin'), updateIndustry)
  .delete(protect, authorizeRoles('Admin'), deleteIndustry);

router.route('/requests')
  .get(protect, authorizeRoles('Admin'), getAllRequests);

router.route('/requests/:id')
  .get(protect, authorizeRoles('Admin'), getRequestById);

router.route('/requests/:id/status')
  .put(protect, authorizeRoles('Admin'), updateRequestStatus);

export default router;
