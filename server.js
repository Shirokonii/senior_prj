const express = require("express");

require("dotenv").config();

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '1000mb', extended: true }))

app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 1000000 }));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("indexparcel");
});

app.get("/indexparcel", (req, res) => {
  res.render("indexparcel.ejs");
});

app.post("/secondpage", (req, res) => {
  res.render("secondpage.ejs", {
    p_code: req.body.p_code,polygon: req.body.polygon
  });
});

app.listen(process.env.PORT, () => {
  console.log('running on port ' + process.env.PORT + '..')
});

app.use(express.static(__dirname + '/www'));

global.__basedir = __dirname;

const api = require('./service/app');

app.use(api);