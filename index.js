const express = require("express");
const Register = require("./Model/register");
// require("./Model/login");
const path = require("path");

const port = 4300;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const staticPath = path.join(__dirname, "/public");
const templatePath = path.join(__dirname, "/templates/views");

// Set the view engine
app.set("view engine", "ejs");
app.set("views", templatePath);

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
      const registered = await registerEmployee.save();
      res.status(201).render("home");
    } else {
      res.send("Passwords do not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


app.post("/login",async(req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});
  
    if(useremail.password === password){
      res.status(201).render("Home");
    }else{
      res.send("Invalid login Details");
    }
  
  }catch(error){
    res.status(400).send("Invalided login Details")
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});