const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// POST endpoint to receive user information
app.post('/send-email', (req, res) => {
    // Extract user information from the request body
    const { firstName, lastName, email, place, start, end } = req.body;

    console.log(firstName +" "+ lastName +" "+ email +" "+ place +" "+ start +" "+ end);
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'verdie.prosacco9@ethereal.email',
            pass: 'dNGyJ2uEN63JgWtPAD'
        }
    });

    // Email content
    const mailOptions = {
        from: 'verdie.prosacco9@ethereal.email',
        to: email,
        subject: 'Appointment Verification',
        text: `Dear ${firstName} ${lastName},\n\nYour appointment has been scheduled for ${start}-${end} at ${place}.\n\nPlease click on the following link to verify your appointment: http://your-verification-url\n\nRegards,\nYour App Team`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'An error occurred while sending the email.' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
