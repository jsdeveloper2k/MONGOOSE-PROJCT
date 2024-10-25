const express = require("express");
const app = express();
const body_parser = require("body-parser");
const ex_hbs = require("express-handlebars");
const dbo = require("./db");
const bookModel = require("./models/bookModel");
dbo.getDataBase();
app.engine(
  "hbs",
  ex_hbs.engine({
    layoutsDir: "view/",
    defaultLayout: "main",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("view", "view");
app.use(body_parser.urlencoded({ extended: true }));

// getting the book details
app.get("/", async (req, res) => {
  let books = await bookModel.find({});
  let message = "";
  let edit_id, edit_book;

  if (req.query.edit_id) {
    edit_id = req.query.edit_id;
    edit_book = await bookModel.findOne({ _id: edit_id });
  }

  if (req.query.delete_id) {
    await bookModel.deleteOne({ _id:req.query.delete_id});
    return res.redirect("/?status=3");
  }

  switch (req.query.status) {
    case "1":
      message = "Inserted Succesfully!";
      break;

    case "2":
      message = "Updated Succesfully!";
      break;

    case "3":
      message = "Deleted Succesfully!";
      break;

    default:
      break;
  }
});

// creating the book details
app.post("/stor_book", async (req, res) => {
  //let book ={title:req.body.title, author:req.body.author};
  const book = new bookModel({
    title: req.body.title,
    author: req.body.author,
  });
  book.save(); // instead of insertOne()
  return res.redirect("/?status=1");
});

// updating the book details 
app.post('/update_book/:edit_id', async(req,res)=>{
let edit_id =req.params.edit_id;
await bookModel.findOneAndUpdate({_id:edit_id},{title:req.body.title,author:req.body.author})   
return res.redirect('/?status=2')
})

// creating the backend server 
app.listen(8000,()=>{console.log('Listening to t he port 8000')})