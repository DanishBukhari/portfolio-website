const express = require("express");
const app = express();

const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;

// applying middleware

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: 'dani.syed.18@gmail.com',
        pass: 'Playboy1541999',
        clientId: '1054319823074-69qekkqm96dt5nm1n7qcr5qba16qnqfj.apps.googleusercontent.com',
        clientSecret:'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',
        refreshToken:'1//04BmWYVuTx7ZVCgYIARAAGAQSNwF-L9IrRKGaw8_fBU7DyA0-VbC_OhA2ySaMbDGxtmm0zsm2sGFrsDtXBJ6izPGtgQi8wJ7oAGY'
    },
  });

  let mailOptions = {
    from: req.body.email,
    to: "dani.syed.18@gmail.com",
    subject: `message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("error occurs");
    } else {
      console.log("Email sent sucessfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
