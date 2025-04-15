const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID'); // Replace with your Google Client ID

router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = new User({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', { expiresIn: '1h' });
    res.json({ token: jwtToken, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;