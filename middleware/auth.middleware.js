import jwt from 'jsonwebtoken';
import config from 'config';

export const auth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }
  try {
    const {authorization} = req.headers
    const token = authorization.split(' ')[1]
    if (!token) {
      return res.status(400).json({message: 'Not found'})
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded
    next()
  } catch(e) {
    return res.status(400).json({message: 'Not found'})
  }
}