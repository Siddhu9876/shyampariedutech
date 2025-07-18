import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Student from './student.model';

const router = express.Router();

// Route: POST /students/add
router.post('/add', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Route: POST /students/login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find student by username
    const student = await Student.findOne({ username });
    
    if (!student) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, student.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Return success with username and role
    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        username: student.username, 
        role: 'student' 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;

