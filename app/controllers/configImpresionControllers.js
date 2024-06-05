import { collection as configCollection } from '../models/configuracionImpresionModels.js';

// Create Config
async function createConfig(req, res) {
  const { nombre, tipo, ajustes } = req.body;

  try {
    const newConfig = {
      nombre,
      tipo,
      ajustes,
      date_create: new Date()
    };

    await configCollection.insertOne(newConfig);
    res.status(201).json({ message: 'Config created successfully' });
  } catch (error) {
    console.error(`Error creating config: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Configs
async function getAllConfigs(req, res) {
  try {
    const configs = await configCollection.find().toArray();
    res.json(configs);
  } catch (error) {
    console.error(`Error getting configs: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One Config
async function getConfig(req, res) {
  try {
    const id = req.params.id;
    const config = await configCollection.findOne({ _id: new ObjectId(id) });
    if (config) {
      res.status(200).json(config);
    } else {
      res.status(404).json({ message: 'Config not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Config
async function updateConfig(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      ajustes: req.body.ajustes,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await configCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Config not found' });
    } else {
      res.status(200).json({ message: 'Config updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating config: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete Config
async function deleteConfig(req, res) {
  try {
    const id = req.params.id;
    const result = await configCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Config not found' });
    } else {
      res.status(200).json({ message: 'Config deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting config: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createConfig, getAllConfigs, getConfig, updateConfig, deleteConfig };
