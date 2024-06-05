import { collection as paymentMethodCollection } from '../models/metodosPagoModels.js';

// Create Payment Method
async function createPaymentMethod(req, res) {
  const { nombre, descripcion } = req.body;

  try {
    const newPaymentMethod = {
      nombre,
      descripcion,
      date_create: new Date()
    };

    await paymentMethodCollection.insertOne(newPaymentMethod);
    res.status(201).json({ message: 'Payment method created successfully' });
  } catch (error) {
    console.error(`Error creating payment method: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Payment Methods
async function getAllPaymentMethods(req, res) {
  try {
    const paymentMethods = await paymentMethodCollection.find().toArray();
    res.json(paymentMethods);
  } catch (error) {
    console.error(`Error getting payment methods: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One Payment Method
async function getPaymentMethod(req, res) {
  try {
    const id = req.params.id;
    const paymentMethod = await paymentMethodCollection.findOne({ _id: new ObjectId(id) });
    if (paymentMethod) {
      res.status(200).json(paymentMethod);
    } else {
      res.status(404).json({ message: 'Payment method not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Payment Method
async function updatePaymentMethod(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await paymentMethodCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Payment method not found' });
    } else {
      res.status(200).json({ message: 'Payment method updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating payment method: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete Payment Method
async function deletePaymentMethod(req, res) {
  try {
    const id = req.params.id;
    const result = await paymentMethodCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Payment method not found' });
    } else {
      res.status(200).json({ message: 'Payment method deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting payment method: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createPaymentMethod, getAllPaymentMethods, getPaymentMethod, updatePaymentMethod, deletePaymentMethod };
