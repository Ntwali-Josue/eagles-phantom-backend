import dotenv from 'dotenv';
import mail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';
import Models from '../database/models';
import { password } from '../utils/password';
import { message } from '../utils/mails';
import { encode } from '../utils/jwt';

const { Op } = require('sequelize');

dotenv.config();
mail.setApiKey(process.env.SENDGRID);
const { Users } = Models;
class register {
  static async signup(req, res) {
    try {
      const {
        email,
        firstname,
        lastname,
        dateofbirth,
        gender,
        address,
        role,
      } = req.body;
      const id = uuidv4();
      const inSystem = await Users.findOne({
        where: { email },
      });
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The email is already in the system') });
      }
      const newUser = await Users.create({
        id,
        email,
        firstname,
        lastname,
        password,
        dateofbirth,
        gender,
        address,
        role,
      });
      const newUserDisplay = {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        dateofbirth: newUser.dateofbirth,
        gender: newUser.dateofbirth,
        address: newUser.address,
        role: newUser.role,
      };
      message(email);
      return res.status(201).json({
        status: 201,
        message: res.__('user created successfully'),
        data: newUserDisplay,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async login(req, res) {
    // eslint-disable-next-line no-shadow
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'The user with this email does not exist',
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          status: 400,
          message: res.__('Invalid email or password'),
        });
      }
      const payload = { email, role: user.role };
      const accessToken = encode(payload);

      localStorage.setItem('accessToken',accessToken);

      return res.status(200).json({
        status: 200,
        message: res.__('logged In successfull'),
        token: accessToken,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
//logout an authenticated user
// static async logout(req, res) {

//     localStorage.removeItem("accessToken");;
//     return res.status(200).json({ 
//       status: 200, 
//       message:res._('you are successfully logged out') });
//       res.redirect('/')
// }
static async logout(req,res){
  localStorage.removeItem("accessToken");
  res.status(200).json({ status: 200, message:res.__('Logout successfully')});
  res.redirect('/')

}
  // updating driver or operator profile

  static async updateProfile(req, res) {
    try {
      const { email } = req.user;
      const updatedField = await Users.update(req.body, {
        where: { email },
        returning: true,
        plain: true,
      });

      const userData = updatedField[1];
      return res.status(200).json({
        status: 200,
        message: 'user updated',
        data: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          role: userData.role,
          dateofbirth: userData.dateofbirth,
          gender: userData.gender,
          address: userData.address,
        },
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  // ---getall
  static async getallusers(req, res) {
    const users = await Users.findAll({
      where: {
        [Op.or]: [
          { role: 'driver' },
          { role: 'operator' },
        ],
      },
      attributes: {
        exclude: ['password'],
      },
    });
    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  }

  static async forgot(req, res) {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('The email is not in the system') });
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const resetToken = encode(payload);
      await user.update({ resetlink: resetToken });
      const forgottenMail = {
        to: email,
        from: 'eaglesphantom1@gmail.com',
        subject: 'Reseting of the password on phantom platform',
        html: `<h2> Dear customer we are pleased to give you this link to reset your password, follow the instructions: </h2><h3>paste the whole link in in postman and send the request with the newpassword, using a json format</h3><p>localhost:3020/api/v1/auth/reset-password/${resetToken}</p>`,
      };
      mail.send(forgottenMail);
      return res.status(403).json({
        status: 403,
        message: res.__('the link has been sent successfully to the provided email'),
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async resetPassword(req, res) {
    const { newpassword } = req.body;
    const { confirmation } = req.body;

    jwt.verify(
      req.params.resetToken,
      process.env.SECRET_KEY,
      (err, decodeData) => {
        if (err) {
          return res.status(401).json({ status: 400, message: res.__('Invalid or expired Token') });
        }
      },
    );
    const user = await Users.findOne({
      where: { resetlink: req.params.resetToken },
    });
    if (!user) {
      return res.status(403).json({
        status: 403,
        message: res.__('this user doesn`t exist in the system'),
      });
    }
    if (newpassword !== confirmation) {
      return res.status(400).json({
        status: 400,
        message: res.__('The password and its confirmation are not the same'),
      });
    }

    const cryption = bcrypt.hashSync(newpassword, 10);

    await user.update({ password: cryption, resetlink: '' });

    return res.status(403).json({
      status: 403,
      Message: res.__('Password changed Successfully'),
    });
  }
}

export default register;
