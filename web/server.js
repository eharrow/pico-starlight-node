const path = require("node:path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const actuator = require("express-actuator");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(actuator());
app.use(cors());
app.options("*", cors()); // include before other routes
app.use(express.static("build"));

app.get("/", function(req, res) {
  res.redirect("index.html");
});

app.get("/config.json", (req, res) => {
  console.log("GET request to the homepage");

  var options = {
    root: __dirname,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
      "Pragma": "no-cache",
      "Expires": "Thu, 1 Jan 1970 00:00:00 GMT",
      "Cache-Control": "max-age=0, no-store, no-cache, must-revalidate",
    },
  };
  res.sendFile("config.json", options);
});

app.post("/config.json", (req, res) => {
  console.log("POST request to the homepage");
  const json_req = JSON.stringify(req.body);

  if (json_req.trim().length === 0 || json_req == "{}") {
    console.log("Error empty payload");
    res.status(400).send({ success: false });
  }

  const retval = writeConfig(json_req);
  if (retval) {
    res.status(201).send({ success: true });
  } else {
    res.status(500).send({ success: false });
  }
});

function writeConfig(config) {
  try {
    fs.writeFileSync("config.json", config);
    // file written successfully
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = app;
