import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getAllUsers, getUserById, updateUserOne } from '../controllers/userControllers.js';
import { authorize } from '../middleware/authMiddleware.js';
import { logoutUser} from '../controllers/authController.js';

const userRoutes = express.Router();

userRoutes.post('/users', createUser);
userRoutes.get('/users', getAllUsers);
userRoutes.get('/users/:id',  getUser);
userRoutes.put('/users/:id',  updateUser);
userRoutes.delete('/users/:id',  deleteUser);

userRoutes.get("/logout", logoutUser);
userRoutes.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await getUserById(userId);
  if (user) {
    res.status(200).json(user); 
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRoutes.post("/profile/:id", async (req, res) => { 
  const userId = req.params.id;
  const updatedUserData = req.body;
  await updateUserOne(userId, updatedUserData);
  res.redirect(`/profile/${userId}`); 
});

export default userRoutes;
