const categoryRepository = require('../repositories/category.repository');
const userRepository = require('../repositories/user.repository');

class CategoryService {
    async createCategory(categoryData) {
        const user = await userRepository.findById(categoryData.user_id);
        if (!user) {
            throw new Error('User not found');
        }

        if (categoryData.type !== 'Income' && categoryData.type !== 'Expense') {
            throw new Error('Invalid category type. Must be Income or Expense.');
        }

        return await categoryRepository.create(categoryData);
    }

    async getCategory(id) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async getUserCategories(userId) {
        return await categoryRepository.findAllByUserId(userId);
    }

    async updateCategory(id, categoryData) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        
        if (categoryData.type !== 'Income' && categoryData.type !== 'Expense') {
            throw new Error('Invalid category type. Must be Income or Expense.');
        }

        return await categoryRepository.update(id, categoryData);
    }

    async deleteCategory(id) {
        const deleted = await categoryRepository.delete(id);
        if (!deleted) {
            throw new Error('Category not found');
        }
        return { message: 'Category deleted successfully' };
    }
}

module.exports = new CategoryService();
