//packages
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
OurProjectData = {};
app.use(express.static("website"));
const MyPostData = function (req, res) {
  OurProjectData = req.body;
  console.log(OurProjectData);
  res.status(200).send(OurProjectData);
};
//post
app.post("/post", MyPostData);
const getAll = function (req, res) {
  res.status(200).send(OurProjectData);
};
//get
app.get("/get", getAll);
const OurPort = 4000;
const OurHostname = "127.0.0.1";
const listening = function () {
  console.log(`my server work wellat http://${OurHostname}:${OurPort}/`);
};

///i add belwo lines for deployment //////////////////////////////////
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
///////////////////////////////////////////////////////////////////
//to test our server
let d = new Date();
let newDate = d.toDateString();
console.log(newDate);
app.listen(OurPort, listening);
