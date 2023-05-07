const express = require("express");
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const app = express();

cloudinary.config({
  cloud_name: 'drfdp41qu',
  api_key:'246483475517767',
  api_secret:'FZBhPLUy2-NqQsKl6TmM6oay5Zw',
})

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

app.post("/mypost", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let result;
  let imageArray = [];

  // case - multiple images

  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "user"
        }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url
      });
    }
  }

  // ### use case for single image
  // let file = req.files.samplefile;
  // result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: "users",
  // });

  console.log(result);

  let details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray
  };
  console.log(details);

  res.send(details);
});

app.get("/mygetform", (req, res) => {
  res.render("getform.ejs");
});

app.get("/mypostform", (req, res) => {
  res.render("postform.ejs");
});

app.listen(4000, () => console.log("Server is running at prot 4000"));
