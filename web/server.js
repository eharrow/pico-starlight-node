const path = require('node:path');
const fs = require('fs');
const express = require('express')
const actuator = require('express-actuator')

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(actuator())

app.get('/', (req, res) => {
    console.log('GET request to the homepage');

    var options = {
        root: path.join(__dirname, 'www'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
          'Pragma': 'no-cache',
          'Expires': 'Thu, 1 Jan 1970 00:00:00 GMT',
          'Cache-Control': 'max-age=0, no-store, no-cache, must-revalidate'
        }
    };
  res.sendFile('index.html', options);
})

app.post('/', (req, res) => {
    console.log('POST request to the homepage');
    const json_req = JSON.stringify(req.body);

    const retval = writeConfig(json_req);
    if (retval) {
      res.send({success:true});
    } else {
      res.send({success:false});
    }
})

app.use(express.static('www'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

function writeConfig(config) {
    try {
      fs.writeFileSync('www/config.json', config);
      // file written successfully
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
}
