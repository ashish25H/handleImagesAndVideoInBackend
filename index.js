const express = require("express");
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const app = express();

app.set("view engin", "ejs");

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:'/tem/',
}));

app.get("/myget", (req, res) => {
  console.log(req.body);

  res.send(req.body);
});

app.post("/mypost", (req, res) => {
    console.log(req.body);
    console.log(req.files);

    let file = req.files.samplefile;
    
    details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    res.send(details);
  });

app.get("/mygetform", (req, res) => {
  res.render("getform.ejs");
});

app.get("/mypostform", (req, res) => {
  res.render("postform.ejs");
});

app.listen(4000, () => console.log("Server is running at prot 4000"));
