import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import UserSchema from "./module.js";
const app = express();
app.use(bodyParser.json());
// Connecting to the database
var db;
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
app.post("/login", (req, res) => {
  res.send(req.body);
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }
  //Create a Note
  const user = new User({
    title: req.body.user,
    content: req.body.password,
  });

  // Save Note in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
});

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.listen("3001", () => {
  console.log("Server is listening on port 3001 ");
});
