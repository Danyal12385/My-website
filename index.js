const express = require("express");
const Register = require("./Model/register");
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const auth = require("./middlewares/auth");

// require("./Model/login");
const path = require("path");

const port = 4300;

const app = express();
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const staticPath = path.join(__dirname, "/public");
const templatePath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// Set the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);

hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("Home");
});


app.get("/Sigup", (req, res) => {
  res.render("Sigup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/Team", auth , (req,res)=>{
res.render("Team")
})
/*
app.get("/register", (req, res) => {
  res.render("register");
});
*/
// Create a new user in the database
app.post("/Sigup", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        password: password,
        confirmpassword: cpassword,
      });

// JWT Tokens 

const token =  await registerEmployee.generateAuthToken();
console.log("the Token is " + token);

//Cookies
res.cookie("jwt", token, {
  expires: new Date(Date.now() + 300000), // 1 minute expiry
  httpOnly: true,
});


const registered = await registerEmployee.save();

res.status(201).render("home");
}else{
res.send("Passwords do not match");
}
}catch (error) {
res.status(400).send(error);
}
})




app.post("/login",async(req,res)=>{
try{
const email = req.body.email;
const password = req.body.password;

const useremail = await Register.findOne({email:email});

const isMatch    = await bcrypt.compare(password, useremail.password);    

const token =  await useremail.generateAuthToken();
console.log("the Token is " + token);

res.cookie("jwt", token, {
  expires: new Date(Date.now() + 300000), // 5 minute expiry
  httpOnly: true,
});

if(isMatch){
      res.status(201).render("Home");
}else{
      res.send("Invaliding login Details");
 }
}catch(error){
    res.status(400).send("Invalided login Details")
  }
});

//login check for bcrypt secure password


// JWT Tokens that we can checks that our user is jenvwon or not(Signature verified) 
// id : 64c3b24cc6b0ac0b2c1f5188
/*
app.post("/Sigup", async(req,res)=> {
try{
  const password =  req.body.password;
  const cpassword = req.body.confirmpassword;

if (password === cpassword) {

const registerEmployee = new Register({

      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
    });
    console.log("the success part is"+ registerEmployee);
const token =  await registerEmployee.generateAuthToken();
console.log("the Token is" + token);

const registered = await registerEmployee.save();
console.log("the Token is" + registered);

res.status(201).render("Home");
}else{
  res.send("password are not matching");
}
}catch(error){
  res.status(400).send(error);
  console.log("the error part is");
}
});

*/

/*
// Create a new user in the database
app.post("/Sigup", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        password: password,
        confirmpassword: cpassword,
      });

      const token = await registerEmployee.generateAuthToken();
      console.log("the Token is", token);

      const registered = await registerEmployee.save();
      console.log("the Registered user is", registered);

      res.status(201).redirect("/"); // Redirect to the root path after successful registration
    } else {
      res.send("Passwords do not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login with bcrypt secure password
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Register.findOne({ email: email });

    if (!user) {
      return res.send("Invalid login details");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.status(201).render("Home");
    } else {
      return res.send("Invalid password/login details");
    }
  } catch (error) {
    res.status(400).send("Invalid login details");
  }
});

*/


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});