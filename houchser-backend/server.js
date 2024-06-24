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
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your_stripe_secret_key');
const twilio = require('twilio')('your_twilio_account_sid', 'your_twilio_auth_token');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/houchser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ServiceSchema = new mongoose.Schema({
  type: String,
  provider: String,
  date: Date,
  userId: String,
});

const Service = mongoose.model('Service', ServiceSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/services', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

app.post('/book', async (req, res) => {
  const { type, provider, date, userId } = req.body;
  const service = new Service({ type, provider, date, userId });
  await service.save();

  twilio.messages.create({
    body: `Your ${type} service is booked for ${date}.`,
    from: 'your_twilio_phone_number',
    to: 'user_phone_number'
  });

  res.send('Service booked!');
});

app.post('/pay', async (req, res) => {
  const { amount, token } = req.body;
  const charge = await stripe.charges.create({
    amount,
    currency: 'usd',
    source: token,
    description: 'Houchser service payment',
  });

  res.send(charge);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

