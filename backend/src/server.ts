import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './components/common/db';
import studentRoutes from './components/common/students/students.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'College Management System API is running!' });
});

// Routes
app.use('/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 