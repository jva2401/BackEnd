import { collection as clientCollection, ObjectId } from '../models/clientesModels.js';

// Create Client
async function createClient(req, res) {
  const { nombre, direccion, telefono, email, fecha_registro } = req.body;

  try {
    const newClient = {
      nombre,
      direccion,
      telefono,
      email,
      fecha_registro: new Date(fecha_registro),
      date_create: new Date()
    };

    await clientCollection.insertOne(newClient);
    res.status(201).json({ message: 'Client created successfully' });
  } catch (error) {
    console.error(`Error creating client: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Clients
async function getAllClients(req, res) {
  try {
    const clients = await clientCollection.find().toArray();
    res.json(clients);
  } catch (error) {
    console.error(`Error getting clients: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One Client
async function getClient(req, res) {
  try {
    const id = req.params.id;
    const client = await clientCollection.findOne({ _id: new ObjectId(id) });
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Client
async function updateClient(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      email: req.body.email,
      fecha_registro: req.body.fecha_registro ? new Date(req.body.fecha_registro) : undefined,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await clientCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Client not found' });
    } else {
      res.status(200).json({ message: 'Client updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating client: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete Client
async function deleteClient(req, res) {
  try {
    const id = req.params.id;
    const result = await clientCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Client not found' });
    } else {
      res.status(200).json({ message: 'Client deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting client: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createClient, getAllClients, getClient, updateClient, deleteClient };
