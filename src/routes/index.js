const express = require('express');
const router = express.Router();

const userRoutes = require('./user.route');
const categoryRoutes = require('./category.route');
const transactionRoutes = require('./transaction.route');

// API Route Group
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
