import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';

const secretKey = process.env.JWT_SECRET || 'default_secret';


const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Register User
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const token = generateToken(User._id);    
  if (!email|| !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
        if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration issue' });
    }

    res.status(200).json({ username: user.username, email:user.email, token });
  } catch (error) {
    console.error('Error logging in:', error.message);

    res.status(500).json({ message: 'Internal server error' });
  }
};
