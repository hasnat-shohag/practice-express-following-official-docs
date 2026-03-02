const categoryService = require('../services/category.service');

class CategoryController {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Category:
     *       type: object
     *       required:
     *         - name
     *         - type
     *         - user_id
     *       properties:
     *         id:
     *           type: integer
     *           description: The auto-generated id of the category
     *         name:
     *           type: string
     *           description: Category name
     *         type:
     *           type: string
     *           enum: [Income, Expense]
     *           description: The type of the category
     *         user_id:
     *           type: integer
     *           description: The id of the user creating the category
     *         created_at:
     *           type: string
     *           format: date-time
     *           description: Auto-generated timestamp
     *       example:
     *         id: 1
     *         name: Groceries
     *         type: Expense
     *         user_id: 1
     *         created_at: 2024-03-01T12:00:00Z
     */

    /**
     * @swagger
     * tags:
     *   name: Categories
     *   description: Category managing API
     */

    /**
     * @swagger
     * /api/categories:
     *   post:
     *     summary: Create a new category
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       201:
     *         description: The category was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Bad request
     */
    async createCategory(req, res) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/categories/user/{userId}:
     *   get:
     *     summary: Returns all categories for a user
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user id
     *     responses:
     *       200:
     *         description: List of user categories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    async getUserCategories(req, res) {
        try {
            const categories = await categoryService.getUserCategories(req.params.userId);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/categories/{id}:
     *   get:
     *     summary: Get category by id
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The category id
     *     responses:
     *       200:
     *         description: The category details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Category not found
     */
    async getCategory(req, res) {
        try {
            const category = await categoryService.getCategory(req.params.id);
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/categories/{id}:
     *   put:
     *     summary: Update category
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Category id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       200:
     *         description: The updated category
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Category not found
     */
    async updateCategory(req, res) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/categories/{id}:
     *   delete:
     *     summary: Delete a category
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Category id
     *     responses:
     *       200:
     *         description: Category deleted
     *       404:
     *         description: Category not found
     */
    async deleteCategory(req, res) {
        try {
            const result = await categoryService.deleteCategory(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();
