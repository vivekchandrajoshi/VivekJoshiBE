const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const contactus = require("./model/contactusModel");
const uri = process.env.dbUri;
// const client = new MongoClient(uri, { useNewUrlParser: true });
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.response));

// perform actions on the collection object

app.post("/send-message", (req, res) => {
  contactus.insertMany(req.body, (err, msg) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(msg);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      sendEmailToSender(transporter, req.body);
      receiverEmailToSender(transporter, msg);
    }
  });
});

function sendEmailToSender(transporter, body) {
  var mailOptions = {
    from: '"Vivek Chandra Joshi 👍" <vjoshi139@gmail.com>', // sender address
    to: body.sender_email, // list of receivers
    subject: "Re:" + body.subject, // Subject line
    text:
      " Hello " +
      body.sender_name +
      " \n Thank you for reaching out to me about this role. I’m interested in hearing more, but I’d like to understand a bit more before I proceed. \n Can you let me know what company this is for and more about their services? I’d also like to know if this position is a management role, which is really what I’m in the market for right now.I appreciate your consideration and hope to hear back from you soon.", // plain text body
    html:
      "<div> <p>Hello " +
      body.sender_name +
      "</p> <p>Thank you for reaching out to me about this role. I’m interested in hearing more, but I’d like to understand a bit more before I proceed.</p><p>Can you let me know what company this is for and more about their services? I’d also like to know if this position is a management role, which is really what I’m in the market for right now.</p><p>I appreciate your consideration and hope to hear back from you soon.</p></div>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function receiverEmailToSender(transporter, msg) {
  var mailOptions = {
    from: '"Vivek Chandra Joshi 👍" <vjoshi139@gmail.com>', // sender address
    to: "vjoshi139@gmail.com", // list of receivers
    subject: "Got new email form the recruiter", // Subject line
    text: JSON.stringify(msg),
    html: "<p>" + JSON.stringify(msg) + "</p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
