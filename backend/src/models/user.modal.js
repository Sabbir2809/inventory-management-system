const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    photo: { type: String, default: `https://ibb.co/8474MbL` },
    role: { type: String, default: "user" },
  },
  { timestamps: true, versionKey: false }
);

// middleware hook: password hide
userSchema.post("save", async (doc, next) => {
  doc.password = "";
  next();
});

// model
const User = mongoose.model("users", userSchema);
module.exports = User;
