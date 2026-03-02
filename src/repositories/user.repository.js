const pool = require('../../db/config');

class UserRepository {
    async create(user) {
        const [result] = await pool.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [user.name, user.email]
        );
        return { id: result.insertId, ...user };
    }

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    async findByEmail(email) {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    async findAll() {
        const [rows] = await pool.execute('SELECT * FROM users');
        return rows;
    }

    async update(id, user) {
        await pool.execute(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [user.name, user.email, id]
        );
        return await this.findById(id);
    }

    async delete(id) {
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new UserRepository();
