const userRepository = require('../repositories/user.repository');

class UserService {
    async createUser(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        return await userRepository.create(userData);
    }

    async getUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async updateUser(id, userData) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        const deleted = await userRepository.delete(id);
        if (!deleted) {
            throw new Error('User not found');
        }
        return { message: 'User deleted successfully' };
    }
}

module.exports = new UserService();
