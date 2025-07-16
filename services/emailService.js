const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './production.env' : './.env' });

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || 'hotelkali6094@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'kali@6094'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email service error:', error);
    } else {
        console.log('✅ Email service is ready to send messages');
    }
});

module.exports = {
    sendEmail: async (to, subject, message) => {
        const mailOptions = {
            from: 'Hotel Kali <hotelkali6094@gmail.com>',
            to,
            subject,
            html: message
        };
        return transporter.sendMail(mailOptions);
    }
}; 