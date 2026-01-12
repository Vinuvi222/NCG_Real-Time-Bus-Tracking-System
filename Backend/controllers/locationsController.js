import Locations from '../models/locationsModel.js';
import { broadcastBusLocation } from '../wsServer.js';

export const addLocation = async (req, res) => {
  try {
    const { busNumber, latitude, longitude, speed } = req.body;

    // Validate input
    if (!busNumber || !latitude || !longitude || !speed) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to database
    const insertedData = await Locations.add({ busNumber, latitude, longitude, speed });

    // Broadcast to frontend
    broadcastBusLocation(insertedData[0]);

    res.status(201).json({
      message: 'Location saved and broadcasted successfully!',
      location: insertedData[0]
    });
  } catch (error) {
    console.error('Error adding location:', error.message);
    res.status(500).json({ message: 'Failed to save location', error: error.message });
  }
};

export default addLocation;

