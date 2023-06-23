const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    // userinfo: {
    //   type: String,
    //   trim: true,
    // },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false
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
  { timestamps: true, strict: false, autoIndex: true }
);

// userSchema
//   .virtual("pass")
//   .set(function (pass) {
//     this._pass = pass;
//     this.salt = uuidv4();
//     this.password = this.securePassword(pass);
//   })
//   .get(function () {
//     return this._pass;
//   });

// userSchema.methods = {
//   authenticate: function (plainPassword) {
//     return this.securePassword(plainPassword) === this.password;
//   },

//   securePassword: function (plainPassword) {
//     if (!plainPassword) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainPassword)
//         .digest("hex");
//     } catch (error) {
//       console.log(error);
//       return "";
//     }
//   },
// };

module.exports = mongoose.model("User", userSchema);
