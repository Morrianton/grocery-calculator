const express = require('express');
const router = express.Router();
const GroceryItem = require('../models/groceryItem');

// Get all grocery items
router.get('/', async (req, res) => {
  try {
    const items = await GroceryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new grocery item
router.post('/', async (req, res) => {
  console.log('Received item data:', req.body);
  const item = new GroceryItem(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get a specific grocery item
router.get('/:id', async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a grocery item
router.put('/:id', async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (item) {
      Object.assign(item, req.body);
      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a grocery item
router.delete('/:id', async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear all items from cart
router.delete('/', async (req, res) => {
  try {
    await GroceryItem.deleteMany({});
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;