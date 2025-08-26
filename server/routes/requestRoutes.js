import express from 'express';
const router = express.Router();
import { submitRequest } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

// We want to allow requests to be submitted even if the user is not logged in.
// If a token is provided, we'll try to authenticate the user and attach it to req.user.
// If no token, or invalid token, req.user will be null, but the request will still proceed.
const optionalProtect = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    protect(req, res, next);
  } else {
    next();
  }
};

router.post('/', optionalProtect, submitRequest);

export default router;
