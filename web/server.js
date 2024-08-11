const path = require("node:path");
const fs = require("fs");
const express = require("express");
const RateLimit = require("express-rate-limit");
const actuator = require("express-actuator");

const app = express();

// set up rate limiter: maximum of five requests per minute
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(actuator());

app.use((req, res, next) => {
  console.log(`${req.hostname} [${new Date().toISOString()}] "${req.method} ${req.url}" ${res.statusCode}`);
  next();
});

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname, "www"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
      "Pragma": "no-cache",
      "Expires": "Thu, 1 Jan 1970 00:00:00 GMT",
      "Cache-Control": "max-age=0, no-store, no-cache, must-revalidate",
    },
  };
  res.sendFile("index.html", options);
});

app.post("/", (req, res) => {
  const json_req = JSON.stringify(req.body);

  if (json_req.trim().length === 0 || json_req === "{}") {
    console.log("Error empty payload");
    res.status(400).send({ success: false, reason: "empty payload" });
  }

  const retval = writeConfig(json_req);
  if (retval) {
    res.status(201).send({ success: true });
  } else {
    res.status(500).send({ success: false });
  }
});

app.use(express.static("www"));

function writeConfig(config) {
  try {
    fs.writeFileSync("www/config.json", config);
    // file written successfully
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = app;
