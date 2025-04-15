const express = require('express');
const propertyService = require('../services/propertyService');

const router = express.Router();

// Search properties
router.post('/search', async (req, res, next) => {
  try {
    const properties = await propertyService.searchProperties(req.body);
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

// Book inspection (placeholder for now)
router.post('/book/:id', async (req, res, next) => {
  try {
    const propertyId = parseInt(req.params.id);
    const result = await propertyService.bookInspection(propertyId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;