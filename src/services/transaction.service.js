const transactionRepository = require('../repositories/transaction.repository');
const userRepository = require('../repositories/user.repository');
const categoryRepository = require('../repositories/category.repository');

class TransactionService {
    async createTransaction(transactionData) {
        const user = await userRepository.findById(transactionData.user_id);
        if (!user) {
            throw new Error('User not found');
        }

        const category = await categoryRepository.findById(transactionData.category_id);
        if (!category) {
            throw new Error('Category not found');
        }
        
        if (category.user_id !== transactionData.user_id) {
            throw new Error('Category does not belong to user');
        }

        return await transactionRepository.create(transactionData);
    }

    async getTransaction(id) {
        const transaction = await transactionRepository.findById(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        return transaction;
    }

    async getAllTransactions(filters) {
        return await transactionRepository.findAll(filters);
    }

    async getMonthlySummary(userId, year, month) {
        const summaries = await transactionRepository.getMonthlySummary(userId, year, month);
        return this._formatSummaryResult(summaries);
    }

    async getIncomeVsExpenseReport(userId, startDate, endDate) {
        const report = await transactionRepository.getIncomeVsExpenseReport(userId, startDate, endDate);
        return this._formatSummaryResult(report);
    }
    
    _formatSummaryResult(rows) {
        const result = { Income: 0, Expense: 0, Balance: 0 };
        rows.forEach(row => {
            if (row.type === 'Income') result.Income = parseFloat(row.total_amount);
            if (row.type === 'Expense') result.Expense = parseFloat(row.total_amount);
        });
        result.Balance = result.Income - result.Expense;
        return result;
    }

    async updateTransaction(id, transactionData) {
        const transaction = await transactionRepository.findById(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        if (transactionData.category_id) {
            const category = await categoryRepository.findById(transactionData.category_id);
            if (!category || category.user_id !== transaction.user_id) {
                throw new Error('Invalid related Category');
            }
        }

        return await transactionRepository.update(id, transactionData);
    }

    async deleteTransaction(id) {
        const deleted = await transactionRepository.delete(id);
        if (!deleted) {
            throw new Error('Transaction not found');
        }
        return { message: 'Transaction deleted successfully' };
    }
}

module.exports = new TransactionService();
