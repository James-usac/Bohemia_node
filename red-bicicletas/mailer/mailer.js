const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alanna.monahan@ethereal.email',
            pass: 'afWSEFyDsRScMVGVfN'
        }
    });

    // Message object
    let message = {
        from: 'Sender Name alanna.monahan@ethereal.email',
        to: 'Recipient frederik.schmidt44@ethereal.email',
        subject: 'Soy un mensaje ✔',
        text: 'Hello to myself!',
        html: '<h1> Soy un dino </h1> <img src="https://static.nationalgeographic.es/files/styles/image_3200/public/20391.600x450.jpg?w=1600&h=1200">'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

module.exports = nodemailer;