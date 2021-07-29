const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
let port = 6500;

app.get("/", (req, res) => {
    res.status(200).send('App Started');
    console.log('App Started');
})

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: '', // sender address
        pass: '' // password
    }
}));

app.get("/send", async (req, res) => {
    var mailOptions = {
        from: '', // sender address
        to: '', // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    };

    await smtpTransport.sendMail(mailOptions, (error) => {
        if (error) {
            res.send("Error: " + error)
            console.log(error)
        } else {
            res.send('✔ Email sent ')
            console.log('✔ Email sent ');
        }
    });
});



app.listen(port)
console.log("App runs at http://localhost:" + port)

