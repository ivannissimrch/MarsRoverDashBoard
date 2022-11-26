require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

//get data for the Curiosity Rover
app.get("/curiosity", async (req, res) => {
  try {
    let curiosityData = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ curiosityData });
  } catch (err) {
    console.log("error:", err);
  }
});

//get data for the Oportunity Rover
app.get("/opportunity", async (req, res) => {
  try {
    let opportunityData = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ opportunityData });
  } catch (err) {
    console.log("error:", err);
  }
});

//get data for the Spirit Rover
app.get("/spirit", async (req, res) => {
  try {
    let spiritData = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ spiritData });
  } catch (err) {
    console.log("error:", err);
  }
});

//End of API calls

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
