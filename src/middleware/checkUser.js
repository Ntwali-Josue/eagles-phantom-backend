import dotenv from 'dotenv';
import { decode } from '../utils/jwt';


dotenv.config();

// eslint-disable-next-line consistent-return
const authentication = (req, res, next) => {
  try {
    const token = req.header('x-access-token');
    if (!token) return res.status(401).json({ status: 401, message: 'Please login' });

    const user = decode(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Invalid token' });
  }
};


export default authentication;
