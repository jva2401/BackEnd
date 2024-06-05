import { collection as paymentCollection } from '../models/pagosModels.js';

// Create Payment
async function createPayment(req, res) {
  const { factura_id, monto, metodo_pago } = req.body;

  try {
    const newPayment = {
      factura_id,
      monto,
      metodo_pago,
      date_create: new Date()
    };

    await paymentCollection.insertOne(newPayment);
    res.status(201).json({ message: 'Payment created successfully' });
  } catch (error) {
    console.error(`Error creating payment: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Payments
async function getAllPayments(req, res) {
  try {
    const payments = await paymentCollection.find().toArray();
    res.json(payments);
  } catch (error) {
    console.error(`Error getting payments: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One Payment
async function getPayment(req, res) {
  try {
    const id = req.params.id;
    const payment = await paymentCollection.findOne({ _id: new ObjectId(id) });
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Payment
async function updatePayment(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      factura_id: req.body.factura_id,
      monto: req.body.monto,
      metodo_pago: req.body.metodo_pago,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await paymentCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      res.status(200).json({ message: 'Payment updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating payment: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete Payment
async function deletePayment(req, res) {
  try {
    const id = req.params.id;
    const result = await paymentCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Payment not found' });
    } else {
      res.status(200).json({ message: 'Payment deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting payment: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createPayment, getAllPayments, getPayment, updatePayment, deletePayment };
