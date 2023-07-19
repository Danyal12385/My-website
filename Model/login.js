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

  const loginSchema =  mongoose.Schema({
 
    email          : String,
    password       : String,
   

});

const login = mongoose.model("login",loginSchema);

module.exports = login;