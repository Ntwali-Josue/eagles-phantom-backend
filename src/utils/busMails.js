import dotenv from 'dotenv';
import mail from '@sendgrid/mail';


dotenv.config();
mail.setApiKey(process.env.SENDGRID);

export const messageBus = (email) => {
  const toSend = {
    to: email,
    from: 'eaglesphantom1@gmail.com',
    subject: 'Phantom assignment',
    text: `Dear ${firstname}, you were assigned to drive bus with Plate No: ${busPlate}`,
    html: `Dear ${firstname}, you were assigned to drive bus with Plate No: ${busPlate}`,
  };
  mail.send(toSend);
};
