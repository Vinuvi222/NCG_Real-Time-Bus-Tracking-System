import express from "express";
import Bus from "../models/bus.model.js";

const router = express.Router();

/**
 * @route   POST /api/buses
 * @desc    Create a new bus
 */
router.post("/add", async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/buses
 * @desc    Get all buses
 */
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/buses/:id
 * @desc    Get bus by ID
 */
router.get("/get/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/buses/:id
 * @desc    Update bus details
 */
router.put("/update/:id", async (req, res) => {
  try {
    const { busNumber } = req.body;

    if (busNumber) {
      const existingBus = await Bus.findOne({
        busNumber,
        _id: { $ne: req.params.id }
      });

      if (existingBus) {
        return res.status(409).json({
          message: "Bus number already exists"
        });
      }
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @route   DELETE /api/buses/:id
 * @desc    Delete a bus
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);

    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/buses/:id/status
 * @desc    Update bus status (active / inactive)
 */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
