const pool = require('../../db/config');

class TransactionRepository {
    async create(transaction) {
        const [result] = await pool.execute(
            'INSERT INTO transactions (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)',
            [transaction.user_id, transaction.category_id, transaction.amount, transaction.date, transaction.description]
        );
        return { id: result.insertId, ...transaction };
    }

    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM transactions WHERE id = ?', [id]);
        return rows[0];
    }

    async findAll(filters) {
        let query = 'SELECT * FROM transactions WHERE 1=1';
        const params = [];

        if (filters.user_id) {
            query += ' AND user_id = ?';
            params.push(filters.user_id);
        }

        if (filters.start_date) {
            query += ' AND date >= ?';
            params.push(filters.start_date);
        }

        if (filters.end_date) {
            query += ' AND date <= ?';
            params.push(filters.end_date);
        }

        query += ' ORDER BY date DESC';

        const [rows] = await pool.execute(query, params);
        return rows;
    }

    async getMonthlySummary(userId, year, month) {
        const [rows] = await pool.execute(
            `SELECT 
                c.type, 
                SUM(t.amount) as total_amount
             FROM transactions t
             JOIN categories c ON t.category_id = c.id
             WHERE t.user_id = ? 
             AND YEAR(t.date) = ? 
             AND MONTH(t.date) = ?
             GROUP BY c.type`,
            [userId, year, month]
        );
        return rows;
    }

    async getIncomeVsExpenseReport(userId, startDate, endDate) {
        let query = `
            SELECT 
                c.type, 
                SUM(t.amount) as total_amount
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = ?
        `;
        const params = [userId];

        if (startDate) {
            query += ' AND t.date >= ?';
            params.push(startDate);
        }
        if (endDate) {
            query += ' AND t.date <= ?';
            params.push(endDate);
        }

        query += ' GROUP BY c.type';

        const [rows] = await pool.execute(query, params);
        return rows;
    }

    async update(id, transaction) {
        await pool.execute(
            'UPDATE transactions SET category_id = ?, amount = ?, date = ?, description = ? WHERE id = ?',
            [transaction.category_id, transaction.amount, transaction.date, transaction.description, id]
        );
        return await this.findById(id);
    }

    async delete(id) {
        const [result] = await pool.execute('DELETE FROM transactions WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new TransactionRepository();
