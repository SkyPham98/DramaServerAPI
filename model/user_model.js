const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleID: String,
    tokenID: String,
    name: String,
    email: String,
    photoUrl: String,
    serverAuthCode: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;