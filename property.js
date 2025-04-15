const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  externalId: { type: String, required: true, unique: true }, // Domain API listing ID
  listingType: { type: String, required: true }, // e.g., "Rent"
  price: { type: Number, required: true }, // Weekly rent in AUD
  propertyType: { type: String, required: true }, // e.g., "House", "Apartment"
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  carspaces: { type: Number, required: true },
  address: {
    displayAddress: { type: String, required: true }, // e.g., "123 Ocean St, Bondi NSW 2026"
  },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true }, // Reference to Landlord model
  available: { type: Boolean, default: true }, // Whether the property is available for booking
  schoolProximity: { type: Number, default: 0 }, // Distance to nearest school in km (simulated for now)
  crimeRate: { type: Number, default: 0 }, // Crime rate (e.g., incidents per 1000 people, simulated for now)
  createdAt: { type: Date, default: Date.now }, // Timestamp of when the property was added
});

module.exports = mongoose.model('Property', propertySchema);