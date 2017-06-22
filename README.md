# Prometheus Chrome Plugin
*A small proof-of-concept plugin for Chrome that checks the facts of the websites you're visiting.*

## Usage
First build the plugin using gulp.

- `npm install --save-dev`
- `gulp`

This builds the plugin to `dist/`. Load that folder into Chrome as an unpacked developer plugin, see [this guide](https://developer.chrome.com/extensions/getstarted#unpacked).

You might want to change the `PROMETHEUS_URL` variable in `background.js` to use a custom server.
