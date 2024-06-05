import { collection, ObjectId } from '../models/productosModels.js'; 
// Crear producto
export const createProduct = async (req, res) => {
  const { nombre, descripcion, precio_unitario, stock } = req.body;

  try {
    const newProduct = {
      nombre,
      descripcion,
      precio_unitario,
      stock,
      date_create: new Date()
    };

    await collection.insertOne(newProduct);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(`Error creating product: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await collection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error(`Error getting products: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Obtener un producto por ID
export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const product = await collection.findOne({ _id: new ObjectId(id) });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error getting product: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const updates = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio_unitario: req.body.precio_unitario,
      stock: req.body.stock
    };

    // Elimina cualquier campo undefined
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product updated successfully' });
    }
  } catch (error) {
    console.error(`Error updating product: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error(`Error deleting product: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
