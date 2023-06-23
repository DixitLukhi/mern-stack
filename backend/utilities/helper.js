const CryptoJS = require("crypto-js");

exports.passwordEncryptor = async (password) => {
    const encLayer1 = CryptoJS.AES.encrypt(password, process.env.PASSWORD_ENC).toString();
    // const encLayer2 = CryptoJS.DES.encrypt(encLayer1, 'secret key 123').toString();
    // const finalEncPassword = CryptoJS.TripleDES.encrypt(encLayer2, 'secret key 123').toString();
    return encLayer1;
}

exports.passwordDecryptor = async (password) => {
    // const decLayer1 = CryptoJS.TripleDES.decrypt(passwordKeyDecrypt, process.env.PASSWORD_ENCRYPTION_SECRET);
    // var deciphertext1 = decLayer1.toString(CryptoJS.enc.Utf8);
    // var decLayer2 = CryptoJS.DES.decrypt(deciphertext1, process.env.PASSWORD_ENCRYPTION_SECRET);
    // var deciphertext2 = decLayer2.toString(CryptoJS.enc.Utf8);
    const decLayer1 = CryptoJS.AES.decrypt(password, process.env.PASSWORD_ENC);
    const finalDecPassword = decLayer1.toString(CryptoJS.enc.Utf8);
    return finalDecPassword;
};

// userSchema
//     .virtual("pass")
//     .set(function (pass) {
//         this._pass = pass;
//         this.salt = uuidv4();
//         this.password = this.securePassword(pass);
//     })
//     .get(function () {
//         return this._pass;
//     });

// userSchema.methods = {
//     authenticate: function (plainPassword) {
//         return this.securePassword(plainPassword) === this.password;
//     },

//     securePassword: function (plainPassword) {
//         if (!plainPassword) return "";
//         try {
//             return crypto
//                 .createHmac("sha256", this.salt)
//                 .update(plainPassword)
//                 .digest("hex");
//         } catch (error) {
//             console.log(error);
//             return "";
//         }
//     },
// };