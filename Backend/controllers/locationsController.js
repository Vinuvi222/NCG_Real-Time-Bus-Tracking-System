import express from 'express';
import Locations from './locationsModel.js';

const router = express.Router();

// Save a new bus location
router.post('/add-location', async (req, res) => {
  try {
    const { busNumber, latitude, longitude, speed } = req.body;

    if (!busNumber || !latitude || !longitude || !speed) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const data = await Locations.add({ busNumber, latitude, longitude, speed });
    res.status(201).json({ message: 'Location saved successfully!', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get latest location of a bus
router.get('/latest-location/:busNumber', async (req, res) => {
  try {
    const { busNumber } = req.params;
    const data = await Locations.getLatest(busNumber);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
