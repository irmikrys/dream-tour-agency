const path = require('path');
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect to the database
connectDB();

// init middleware to get req.body
app.use(express.json({extended: false}));

// allow for static frontend
app.use('/', express.static(path.join(__dirname, 'frontend')));

// enable CORS for all origins
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/trips', require('./routes/api/trips'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
