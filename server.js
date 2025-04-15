const express = require('express');
const mongoose = require('mongoose');
const propertyService = require('./services/propertyService');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; // Changed to 3001

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/propmatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB successfully');
  try {
    await propertyService.syncProperties();
    console.log('Properties synced successfully');
  } catch (error) {
    console.error('Failed to sync properties:', error);
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
// ...existing code...

// Test route to add a sample property
app.post('/api/test-property', async (req, res) => {
  try {
    const Property = require('./models/Property');
    const testProperty = new Property({
      title: 'Test Property',
      price: 500000,
      location: 'Test Location',
      bedrooms: 3,
      bathrooms: 2
    });
    await testProperty.save();
    res.json({ message: 'Test property added successfully', property: testProperty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ...existing code...
// Routes
app.get('/', (req, res) => {
  res.send('PropMatch API is running');
});

app.use('/api/properties', require('./routes/properties'));
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server - explicitly listen on all interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API endpoints available at http://localhost:${port}/api`);
});