import dotenv from 'dotenv';
import { decode } from '../utils/jwt';
import localStorage from 'localStorage'
dotenv.config();

const authentication = (req, res, next) => {
  try {
    let token =localStorage.getItem('token');
    token = req.header('x-access-token');
    if (!token) return res.status(401).json({ status: 401, message: res.__('Please login') });

    const user = decode(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: res.__('Invalid token') });
  }
};

export default authentication;
