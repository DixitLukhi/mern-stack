const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 12,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String, // random no. generate
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("pass")
  .set(function (pass) {
    this._pass = pass;
    this.salt = uuidv4();
    this.password = this.securePassword(pass);
  })
  .get(function () {
    return this._pass;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      console.log(error);
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
