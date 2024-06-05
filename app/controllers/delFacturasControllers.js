import { collection as deletionCollection } from '../models/delFacturaModels.js';

// Create Deletion
async function createDeletion(req, res) {
  const { factura_id, usuario_id, fecha_eliminacion, motivo } = req.body;

  try {
    const newDeletion = {
      factura_id,
      usuario_id,
      fecha_eliminacion: new Date(fecha_eliminacion),
      motivo,
      date_create: new Date()
    };

    await deletionCollection.insertOne(newDeletion);
    res.status(201).json({ message: 'Deletion record created successfully' });
  } catch (error) {
    console.error(`Error creating deletion record: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Deletions
async function getAllDeletions(req, res) {
  try {
    const deletions = await deletionCollection.find().toArray();
    res.json(deletions);
  } catch (error) {
    console.error(`Error getting deletion records: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One Deletion
async function getDeletion(req, res) {
  try {
    const id = req.params.id;
    const deletion = await deletionCollection.findOne({ _id: new ObjectId(id) });
    if (deletion) {
      res.status(200).json(deletion);
    } else {
      res.status(404).json({ message: 'Deletion record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Deletion
async function updateDeletion(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      factura_id: req.body.factura_id,
      usuario_id: req.body.usuario_id,
      fecha_eliminacion: req.body.fecha_eliminacion ? new Date(req.body.fecha_eliminacion) : undefined,
      motivo: req.body.motivo,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await deletionCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Deletion record not found' });
    } else {
      res.status(200).json({ message: 'Deletion record updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating deletion record: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete Deletion
async function deleteDeletion(req, res) {
  try {
    const id = req.params.id;
    const result = await deletionCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Deletion record not found' });
    } else {
      res.status(200).json({ message: 'Deletion record deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting deletion record: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createDeletion, getAllDeletions, getDeletion, updateDeletion, deleteDeletion };
