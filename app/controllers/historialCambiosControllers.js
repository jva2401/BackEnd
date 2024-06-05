import { collection as historyCollection } from '../models/historialCambiosModels.js';

// Create History
async function createHistory(req, res) {
  const { tipo_documento, documento_id, usuario_id, cambio_realizado } = req.body;

  try {
    const newHistory = {
      tipo_documento,
      documento_id,
      usuario_id,
      cambio_realizado,
      date_create: new Date()
    };

    await historyCollection.insertOne(newHistory);
    res.status(201).json({ message: 'History created successfully' });
  } catch (error) {
    console.error(`Error creating history: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Histories
async function getAllHistories(req, res) {
  try {
    const histories = await historyCollection.find().toArray();
    res.json(histories);
  } catch (error) {
    console.error(`Error getting histories: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One History
async function getHistory(req, res) {
  try {
    const id = req.params.id;
    const history = await historyCollection.findOne({ _id: new ObjectId(id) });
    if (history) {
      res.status(200).json(history);
    } else {
      res.status(404).json({ message: 'History not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update History
async function updateHistory(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      tipo_documento: req.body.tipo_documento,
      documento_id: req.body.documento_id,
      usuario_id: req.body.usuario_id,
      cambio_realizado: req.body.cambio_realizado,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await historyCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'History not found' });
    } else {
      res.status(200).json({ message: 'History updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating history: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete History
async function deleteHistory(req, res) {
  try {
    const id = req.params.id;
    const result = await historyCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'History not found' });
    } else {
      res.status(200).json({ message: 'History deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting history: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createHistory, getAllHistories, getHistory, updateHistory, deleteHistory };
