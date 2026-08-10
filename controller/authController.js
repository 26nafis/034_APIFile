const { Penulis } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller Register
const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi!' });
    }

    const existingUser = await Penulis.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Penulis.create({
      nama,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: 'Registrasi berhasil!',
      data: { id: newUser.id, nama: newUser.nama, email: newUser.email }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Penulis.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email tidak ditemukan!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key_default',
      { expiresIn: '1d' }
    );

    return res.json({ message: 'Login berhasil!', token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };