import dotenv from 'dotenv';
import mail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import Models from '../database/models';
import { password } from '../utils/password';
import { message } from '../utils/mails';
import { encode } from '../utils/jwt';
const { Op } = require("sequelize");
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
        where: { email: req.body.email },
      });
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: 'The email is already in the system' });
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
        message: 'user created successfully',
        data: newUserDisplay,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async login(req, res) {
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
      return res.status(200).json({
        status: 200,
        message: res.__('logged In successfull'),
        token: accessToken,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Server Error',
      });
    }
  }

//updating driver or operator profile

static async updateProfile (req, res){
  try {
    
    const {email}=req.user;
    const updatedField  = await Users.update(req.body, { 
      where: { email },
      returning: true,
      plain: true,
    });

   const userData = updatedField[1]
      return res.status(200).json({ 
        status: 200,
        message: "user updated",
        data:  {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        role:userData.role,
        dateofbirth:userData.dateofbirth,
        gender:userData.gender,
        address:userData.address
       }
      })

  } catch (error) {
    return res.status(500).send(error.message);
  }
  
}

//---getall
static async getallusers(req,res){

    const users = await Users.findAll({ where: {
      [Op.or]: [
        { role: 'driver' },
        { role: 'operator' }
      ]
    },attributes:{
      exclude:['password']
    }});
  res.status(200).json({
    status:'success',
    data:{
      users
    }
  })
  
  
}



}

export default register;

