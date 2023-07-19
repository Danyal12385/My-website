const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://dashboard_123456789:dashboard_12345678910111213@cluster0.mflaup4.mongodb.net/Sign-up', {

  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Perform database operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  })

  const registerSchema =  mongoose.Schema({
    firstname      : String,
    lastname       : String,
    email          : String,
    phone          : Number,
    password       : String,
    confirmpassword      : String,
    country        : String,

});

const register = mongoose.model("Register",registerSchema);

module.exports = register;