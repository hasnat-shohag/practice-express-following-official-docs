const userService = require('../services/user.service');

class UserController {
    /**
     * @swagger
     * components:
     *   schemas:
     *     User:
     *       type: object
     *       required:
     *         - name
     *         - email
     *       properties:
     *         id:
     *           type: integer
     *           description: The auto-generated id of the user
     *         name:
     *           type: string
     *           description: The name of the user
     *         email:
     *           type: string
     *           description: The user email
     *         created_at:
     *           type: string
     *           format: date-time
     *           description: The date the user was created
     *       example:
     *         id: 1
     *         name: John Doe
     *         email: john@example.com
     *         created_at: 2024-03-01T12:00:00Z
     */

    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: The user managing API
     */

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: The user was successfully created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Email already exists or bad input
     */
    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Returns the list of all the users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: The list of the users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get the user by id
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user id
     *     responses:
     *       200:
     *         description: The user response by id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: The user was not found
     */
    async getUser(req, res) {
        try {
            const user = await userService.getUser(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     summary: Update the user by the id
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: The user was updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: The user was not found
     */
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     summary: Remove the user by id
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user id
     *     responses:
     *       200:
     *         description: The user was deleted
     *       404:
     *         description: The user was not found
     */
    async deleteUser(req, res) {
        try {
            const result = await userService.deleteUser(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
