const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema({
  sender_name: { type: String, required: true },
  sender_email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("contactus", ContactUsSchema);
