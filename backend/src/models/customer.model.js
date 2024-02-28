const mongoose = require("mongoose");

// Schema
const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    userEmail: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// model
const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;
