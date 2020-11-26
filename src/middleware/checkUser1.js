import dotenv from 'dotenv';
import { decode } from '../utils/jwt';
import localStorage from 'localStorage'
dotenv.config();

const auth = (req, res, next) => {
  let token =localStorage.getItem('token');
     token = req.header('x-access-token');;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'you are not logged in',
      });
    }
    try {
      const decoded = decode(token, process.env.SECRETKEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({ error });
    }
    return token;
  };
  export default {
    auth,
  };