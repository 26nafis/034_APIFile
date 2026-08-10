const express = require('express');
const connectDatabase = require('./config/Db');
// 1. Impor route genre yang dibuat 
const genreRoute = require('./routes/genreRoute');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Pasang jalurnya (endpoint /api/genres)
app.use('/api/genres', genreRoute);

app.use('/api', require('./routes/api'));

async function startServer() {
    await connectDatabase();
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();