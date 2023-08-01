const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


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
    tokens      : [{
      token : {
      type : String,
      required:true
      }
    }]
});


registerSchema.methods.generateAuthToken = async function(){
try{
console.log(this._id);
const token = jwt.sign({_id:this._id.toString()},"mynameisvindobahdurtapayoutuber");
this.tokens = this.tokens.concat({token:token})
await this.save();
return token;
}catch(error){
  res.send("the error part" + error);
  console.log("the error part" + error);
}
}


registerSchema.pre("save",async function(next){
  if(this.isModified("password")){
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 6);
    console.log(`the current password is ${this.password}`);
   // this.confirmpassword = await bcrypt.hash(this.password,6);
   this.confirmpassword = undefined;
  }
  next();
})


const register = mongoose.model("Register",registerSchema);

module.exports = register;