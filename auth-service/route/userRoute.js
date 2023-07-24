const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.authenticateUser(username, password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/users', async (req, res) => {
  const userData = req.body;
  try {
    const user = await userService.createUser(userData);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  try {
    const user = await userService.updateUser(userId, userData);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.deleteUser(userId);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
