const express = require('express');
const router = express.Router();
const Country = require('../models/Country');
const Achievement = require('../models/Achievement');

 // Get all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    // Attach achievements for each country (supports either ObjectId refs or country name strings)
    const countriesWithAchievements = await Promise.all(countries.map(async (country) => {
    // Try to find achievements where 'country' is either ObjectId referencing this country
    // or a string name (imported JSON used country names). Use the native collection find
    // to avoid Mongoose casting errors when documents store a string in the country field.
    const rawAchievements = await Achievement.collection.find({
      $or: [
        { country: country._id },
        { country: country.name }
      ]
    }).toArray();
    // Normalize achievements to plain objects and attach country name when needed
    const achievements = rawAchievements.map(a => {
      const ach = Object.assign({}, a);
      if (ach._id && ach._id.toString) ach._id = ach._id.toString();
      // If country stored as ObjectId, replace with country name for client-friendly output
      if (ach.country && ach.country.toString) {
        ach.country = country.name;
      }
      return ach;
    });
      const countryObj = country.toObject();
      countryObj.achievements = achievements;
      return countryObj;
    }));
    res.json(countriesWithAchievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 // Get single country by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const slugify = (s) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Try to find by slugified name first
    const all = await Country.find();
    const country = all.find((c) => slugify(c.name) === slug);

    if (!country) return res.status(404).json({ error: 'Country not found' });

    // Attach achievements (same strategy as other endpoints)
    const rawAchievements = await Achievement.collection.find({
      $or: [
        { country: country._id },
        { country: country.name }
      ]
    }).toArray();
    const achievements = rawAchievements.map(a => {
      const ach = Object.assign({}, a);
      if (ach._id && ach._id.toString) ach._id = ach._id.toString();
      if (ach.country && ach.country.toString) {
        ach.country = country.name;
      }
      return ach;
    });
    const countryObj = country.toObject();
    countryObj.achievements = achievements;
    res.json(countryObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single country
router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    // Try to find achievements where 'country' is either ObjectId referencing this country
    // or a string name (imported JSON used country names). Use the native collection find
    // to avoid Mongoose casting errors when documents store a string in the country field.
    const rawAchievements = await Achievement.collection.find({
      $or: [
        { country: country._id },
        { country: country.name }
      ]
    }).toArray();
    const achievements = rawAchievements.map(a => {
      const ach = Object.assign({}, a);
      if (ach._id && ach._id.toString) ach._id = ach._id.toString();
      if (ach.country && ach.country.toString) {
        ach.country = country.name;
      }
      return ach;
    });
    const countryObj = country.toObject();
    countryObj.achievements = achievements;
    res.json(countryObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create country
router.post('/', async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update country
router.put('/:id', async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
