const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to the database
connectDB();

// init middleware to get req.body
app.use(express.json({extended: false}));

// routes
app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/trips', require('./routes/api/trips'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
