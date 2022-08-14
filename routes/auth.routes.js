import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';

const router1 = new Router();

// /api/auth/register
router1.post(
  '/register',
  [
    check('email', 'Incorrect e-mail').isEmail(),
    check('password', 'Minimum password length 3 characters')
      .isLength({ min: 3 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        // errors: errors.array(),
        message: 'Incorrect data during registration', 
        errors });
    }

    const {email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'User created' })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

// /api/auth/login
router1.post(
  '/login',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid login information'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'User is not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password, please try again' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '24h' }
    )

    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

export default router1;