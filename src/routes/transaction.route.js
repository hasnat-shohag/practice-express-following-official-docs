const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransactions);
router.get('/summary/monthly', transactionController.getMonthlySummary);
router.get('/summary/report', transactionController.getIncomeVsExpenseReport);
router.get('/:id', transactionController.getTransaction);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
