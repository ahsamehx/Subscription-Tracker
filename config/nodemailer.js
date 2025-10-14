import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD } from './env.js'

export const EMAIL_ACCOUNT = 'edogawaconan9684@gmail.com';

const transporter = nodemailer.createTransport(
    {
        service : 'gmail', 
        auth: {
            user : EMAIL_ACCOUNT, 
            pass : EMAIL_PASSWORD
        }
    }   
)

export default transporter;