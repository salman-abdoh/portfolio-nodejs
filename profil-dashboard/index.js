const express=require("express");
const app=express();
const assert = require("assert")
const mogoose = require("mongoose");
const skill = require("./models/skills");
app.use(express.static("public/"))
const { default: mongoose } = require("mongoose");
var path = require('path');
const server=require('http').createServer(app);




app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('public/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
  app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
  app.use('public/images', express.static(path.join(__dirname, 'public/images')));
  app.use('public/fonts', express.static(path.join(__dirname, 'public/fonts')));
  app.set('views', path.join(__dirname, 'views'));
app.get("/",(req,res)=>{
    res.render("home");
    //res.send("<h1>hello Coding Acadmey</h1>")
})

mogoose
  .connect("mongodb://localhost:27017/profile_nodejs")
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
  //add skils
  app.get("/skills/add",  (req, res) => {
    res.rander("skills");});
  app.post("/skills/add", (req, res) => {
    const s = new skill({
      id: mongoose.Types.ObjectId,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      place: req.body.plase,
      marks: req.body.marks,
    });
  
    s.save((error,result)=>{
        if(error)
       console.log(error.message);
        else
        console.log(result);
       

    });

    console.log("data inserted successful");
    res.redirect("/skills/list")
    res.end();
    
});

app.get('/skills/list',(req,res)=>{
skill.find().then((reslut)=>{

        console.log(skill.length);

        res.render('skills',{skill:reslut});
    });
  });
  app.get('/skills/delete/(:id)', function (req, res, next) {
    skill.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect('/skills/list');
      
      } else {
        console.log('Failed to Delete user Details: ' + err);
      }
    });
  })
  
 

  
 
  
server.listen("3000");
console.log("server connected ");




