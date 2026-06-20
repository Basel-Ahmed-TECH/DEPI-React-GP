const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json()); // Parses incoming request bodies as JSON objects


app.use('/auth', authRoutes);
app.use('/portfolio', portfolioRoutes);

app.get('/', (req, res) => {
  res.send('PortfolioGenie Express Server Is Live!');
});

app.listen(PORT, () => {
  console.log(`Server spinning on port ${PORT} 🚀`);
});
