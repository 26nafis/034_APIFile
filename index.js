const express = require('express');
const connectDatabase = require('./config/Db');

// 1. Impor routes
const genreRoute = require('./routes/genreRoute');
const authRoute = require('./routes/authRoutes'); // Pakai 's'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Pasang jalur routes
app.use('/api/genres', genreRoute);
app.use('/api/auth', authRoute); // <--- Ditambahkan di sini (Endpoint: /api/auth/register & /api/auth/login)

app.use('/api', require('./routes/api'));

async function startServer() {
    await connectDatabase();
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();