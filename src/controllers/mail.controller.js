import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "punitdekate.1999@gmail.com",
        pass: "mwkz dcfa fnqa kuqw",
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendNotification(email, subject, text) {
    // send mail with defined transport object
    const options = {
        from: 'punitdekate.1999@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }
    await transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email sent :  ${info.response}`);
        }
    });

}