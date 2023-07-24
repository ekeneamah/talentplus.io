const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

class UserService {
  async authenticateUser(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async createUser(userData) {
    // Validate user data before creating a new user
    if (!userData.username || !userData.password) {
      throw new Error('Username and password are required');
    }

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username: userData.username });
    if (existingUser) {
      throw new Error('Username already taken');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await UserModel.create(userData);
    return user;
  }

  generateToken(user) {
    return jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  }
}

module.exports = new UserService();
