import express from 'express';
import Locations from '../models/locationsModel.js';  

import { broadcastBusLocation } from '../wsServer.js';

const router = express.Router();

router.post('/add-location', async (req, res) => {
  try {
    const { busNumber, latitude, longitude, speed } = req.body;

    // Add location, PostgreSQL automatically sets timestamp
    const data = await Locations.add({ busNumber, latitude, longitude, speed });

    // Broadcast to WebSocket clients
    broadcastBusLocation(data[0]); // data[0] has the timestamp set by DB

    res.status(201).json({ message: 'Location saved successfully!', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET latest location of a bus
router.get('/latest/:busNumber', async (req, res) => {
  try {
    const busNumber = req.params.busNumber;

    const latestLocation = await Locations.getLatest(busNumber);

    if (!latestLocation) {
      return res.status(404).json({ message: 'No location found for this bus.' });
    }

    res.status(200).json({ message: 'Latest location retrieved', data: latestLocation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

