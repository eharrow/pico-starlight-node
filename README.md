# Pimoroni Wireless Plasma Kit - Server [![Build](https://github.com/eharrow/pico-starlight-node/actions/workflows/main.yml/badge.svg)] ![docker]([https://github.com/github/docs/actions/workflows/main.yml/badge.svg](https://github.com/eharrow/pico-starlight-node/actions/workflows/docker.yml/badge.svg))

This repository is derived from https://github.com/brunon/Starlight and contains an implementation of Raspberry Pi Pico
MicroPython code for
the [Pimoroni Wireless Plasma Kit](https://shop.pimoroni.com/products/wireless-plasma-kit?variant=40449879081043).  This version uses a NodeJS/Express backend server rather than PHP.

Unlike the simple examples provided out of the box, this is a client/server implementation where the Pico will download
its configuration from an external Web server, and automatically change its animation implementation based on the
contents of the configuration file.

This repository contains both the MicroPython code to run on the Pico board, as well as a minimal NodeJS/Express web
service running on another Raspberry Pi.

## Web Server Setup

This part must be run on some other web server on your local network. For my testing I used a Rasbperry Pi 4 running
NodeJS or even better Docker (preferred).

These instructions assume you have a Rpi4 with Docker already installed, if not,
follow [this guide](https://docs.docker.com/engine/install/raspberry-pi-os/).  Copy the `docker-compose.yml` to the pi, then `docker compose up`
and then check http://localhost:3000 (you can change this to a port of your choosing in the compose file).

Alternatively clone this repo, install NodeJS and NPM following [this guide](https://raspberrytips.com/node-js-raspberry-pi/).
Change to the web directory and `npm install; npm start` and check http://localhost:3000.

### Test web server setup

You can try POST-ing a JSON file to the server, to test that NodeJS is installed correctly and all permissions are properly
set up:

```
sudo apt-get install curl -y

# this assumes you installed these files under / and your web server runs on port 3000, if not change accordingly
curl -X POST -v -d @/path/to/git/clone/SAMPLE_CONFIG.json 'http://localhost:3000/config.json'
```

This should update the `config.json` file and return:

```json
{
  "success": true
}
```

## Configure the Plasma Kit Light

Open Thonny, and copy the contents of the `pico/starlight.py` file into the `main.py` file on the Pico.

Edit the `WIFI_CONFIG.py` file that comes with the Plaska Kit and enter your WiFi network's `SSID`, password and country
code.

Finally, update the `SERVER_CONFIG.py` and modify the `URL` value to point to the IP/Port of the Web server you configured
above.  Save to the Plasma Kit.

Then plug this in and enjoy!

## How does this work?

It's simple: the Pico will ping the URL you configure every 10 seconds and look for a modified configuration file.

If it detects a change to the configuration file, it will stop the current animation, and start off a new one. This can
include changing the animation mode, or just tweaking some of the configurable settings of individual animation
algorithms (such as the color codes to use, etc.).

To make changes, navigate to the `index.html` page on the Web server configured above, and pick a different animation in
the dropdown.

The JavaScript code will automatically POST an updated configuration file to the server, replacing the file stored on
the server, and triggering the light to change within 10 seconds.

For now only the animation mode can be changed, but I plan to add some code to auto-generate form controls in the Web
page to open up all the individual settings to be modified.

Contributions welcome!

