const transactionService = require('../services/transaction.service');

class TransactionController {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Transaction:
     *       type: object
     *       required:
     *         - user_id
     *         - category_id
     *         - amount
     *         - date
     *       properties:
     *         id:
     *           type: integer
     *           description: The auto-generated id
     *         user_id:
     *           type: integer
     *           description: User id
     *         category_id:
     *           type: integer
     *           description: Category id
     *         amount:
     *           type: number
     *           format: float
     *           description: Transaction amount
     *         date:
     *           type: string
     *           format: date
     *           description: Transaction date (YYYY-MM-DD)
     *         description:
     *           type: string
     *           description: Description of the transaction
     *       example:
     *         user_id: 1
     *         category_id: 1
     *         amount: 150.50
     *         date: "2024-03-01"
     *         description: "Grocery shopping"
     */

    /**
     * @swagger
     * tags:
     *   name: Transactions
     *   description: Transactions managing API
     */

    /**
     * @swagger
     * /api/transactions:
     *   post:
     *     summary: Create a new transaction
     *     tags: [Transactions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Transaction'
     *     responses:
     *       201:
     *         description: Successfully created
     *       400:
     *         description: Bad request
     */
    async createTransaction(req, res) {
        try {
            const transaction = await transactionService.createTransaction(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/transactions:
     *   get:
     *     summary: Returns transactions with optional filters
     *     tags: [Transactions]
     *     parameters:
     *       - in: query
     *         name: user_id
     *         schema:
     *           type: integer
     *         description: Filter by user id
     *       - in: query
     *         name: start_date
     *         schema:
     *           type: string
     *           format: date
     *         description: Filter by start date (YYYY-MM-DD)
     *       - in: query
     *         name: end_date
     *         schema:
     *           type: string
     *           format: date
     *         description: Filter by end date (YYYY-MM-DD)
     *     responses:
     *       200:
     *         description: List of transactions
     */
    async getAllTransactions(req, res) {
        try {
            const filters = {
                user_id: req.query.user_id,
                start_date: req.query.start_date,
                end_date: req.query.end_date
            };
            const transactions = await transactionService.getAllTransactions(filters);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/transactions/summary/monthly:
     *   get:
     *     summary: Returns monthly summary for a user
     *     tags: [Transactions]
     *     parameters:
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: integer
     *       - in: query
     *         name: year
     *         required: true
     *         schema:
     *           type: integer
     *       - in: query
     *         name: month
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Monthly Summary
     */
    async getMonthlySummary(req, res) {
        try {
            const { user_id, year, month } = req.query;
            if (!user_id || !year || !month) throw new Error("Missing required query params");
            
            const summary = await transactionService.getMonthlySummary(user_id, year, month);
            res.status(200).json(summary);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/transactions/summary/report:
     *   get:
     *     summary: Returns income vs expense report for a user in a date range
     *     tags: [Transactions]
     *     parameters:
     *       - in: query
     *         name: user_id
     *         required: true
     *         schema:
     *           type: integer
     *       - in: query
     *         name: start_date
     *         schema:
     *           type: string
     *           format: date
     *       - in: query
     *         name: end_date
     *         schema:
     *           type: string
     *           format: date
     *     responses:
     *       200:
     *         description: Report summary
     */
    async getIncomeVsExpenseReport(req, res) {
        try {
            const { user_id, start_date, end_date } = req.query;
            if (!user_id) throw new Error("Missing user_id");

            const report = await transactionService.getIncomeVsExpenseReport(user_id, start_date, end_date);
            res.status(200).json(report);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/transactions/{id}:
     *   get:
     *     summary: Get transaction by id
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Transaction object
     */
    async getTransaction(req, res) {
        try {
            const transaction = await transactionService.getTransaction(req.params.id);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/transactions/{id}:
     *   put:
     *     summary: Update transaction
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Transaction'
     *     responses:
     *       200:
     *         description: Updated transaction
     */
    async updateTransaction(req, res) {
        try {
            const transaction = await transactionService.updateTransaction(req.params.id, req.body);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/transactions/{id}:
     *   delete:
     *     summary: Delete transaction
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Successful delete
     */
    async deleteTransaction(req, res) {
        try {
            const result = await transactionService.deleteTransaction(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new TransactionController();
