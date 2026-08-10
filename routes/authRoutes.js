const express = require('express');
const router = express.Router();
// Hapus huruf 's' pada word controller
const { register, login } = require('../controller/authController');

// Dipanggil via: POST http://localhost:3000/api/auth/register
router.post('/register', register);

// Dipanggil via: POST http://localhost:3000/api/auth/login
router.post('/login', login);

module.exports = router;