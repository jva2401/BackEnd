import { collection as invoiceCollection } from '../models/facturaModels.js';

// Create Invoice
async function createInvoice(req, res) {
  const { cliente_id, fecha_emision, detalles, total, estado, fecha_vencimiento } = req.body;

  try {
    const newInvoice = {
      cliente_id,
      fecha_emision: new Date(fecha_emision),
      detalles,
      total,
      estado,
      fecha_vencimiento: new Date(fecha_vencimiento),
      date_create: new Date()
    };

    await invoiceCollection.insertOne(newInvoice);
    res.status(201).json({ message: 'Invoice created successfully' });
  } catch (error) {
    console.error(`Error creating invoice: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read All Invoices
async function getAllInvoices(req, res) {
  try {
    const invoices = await invoiceCollection.find().toArray();
    res.json(invoices);
  } catch (error) {
    console.error(`Error getting invoices: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Read One Invoice
async function getInvoice(req, res) {
  try {
    const id = req.params.id;
    const invoice = await invoiceCollection.findOne({ _id: new ObjectId(id) });
    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Update Invoice
async function updateInvoice(req, res) {
  try {
    const id = req.params.id;
    const updates = {
      cliente_id: req.body.cliente_id,
      fecha_emision: req.body.fecha_emision ? new Date(req.body.fecha_emision) : undefined,
      detalles: req.body.detalles,
      total: req.body.total,
      estado: req.body.estado,
      fecha_vencimiento: req.body.fecha_vencimiento ? new Date(req.body.fecha_vencimiento) : undefined,
      date_create: req.body.date_create ? new Date(req.body.date_create) : undefined
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await invoiceCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Invoice not found' });
    } else {
      res.status(200).json({ message: 'Invoice updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating invoice: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Delete Invoice
async function deleteInvoice(req, res) {
  try {
    const id = req.params.id;
    const result = await invoiceCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Invoice not found' });
    } else {
      res.status(200).json({ message: 'Invoice deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting invoice: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export { createInvoice, getAllInvoices, getInvoice, updateInvoice, deleteInvoice };
