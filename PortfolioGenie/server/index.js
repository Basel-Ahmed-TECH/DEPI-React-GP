const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json()); // Parses incoming request bodies as JSON objects


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('PortfolioGenie Express Server Is Live!');
});

app.listen(PORT, () => {
  console.log(`Server spinning on port ${PORT} 🚀`);
});