const pool = require('../../db/config');

class CategoryRepository {
    async create(category) {
        const [result] = await pool.execute(
            'INSERT INTO categories (name, type, user_id) VALUES (?, ?, ?)',
            [category.name, category.type, category.user_id]
        );
        return { id: result.insertId, ...category };
    }

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    }

    async findAllByUserId(userId) {
        const [rows] = await pool.execute('SELECT * FROM categories WHERE user_id = ?', [userId]);
        return rows;
    }

    async update(id, category) {
        await pool.execute(
            'UPDATE categories SET name = ?, type = ? WHERE id = ?',
            [category.name, category.type, id]
        );
        return await this.findById(id);
    }

    async delete(id) {
        const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new CategoryRepository();
