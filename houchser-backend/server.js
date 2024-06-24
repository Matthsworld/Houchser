const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/houchser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Define schema and model
const serviceSchema = new mongoose.Schema({
  type: String,
  provider: String,
  date: Date,
  userId: String,
});

const Service = mongoose.model('Service', serviceSchema);

// Routes
app.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/book', async (req, res) => {
  try {
    const { type, provider, date, userId } = req.body;
    const service = new Service({ type, provider, date, userId });
    await service.save();
    res.send('Service booked!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

