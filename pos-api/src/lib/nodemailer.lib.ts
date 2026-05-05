import nodemailer from 'nodemailer';
import { GOOGLE_APP_PASSWORD } from '../configs/dotenv.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ryan.fandy@gmail.com',
    pass: GOOGLE_APP_PASSWORD, // The 16-character App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
