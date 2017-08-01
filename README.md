# Prometheus Chrome Plugin
*A small proof-of-concept plugin for Chrome that checks the facts of the websites you're visiting.*

## Usage
The latest version is available as a release here as a Github release. Just download and extract the latest `dist.tar.gz` and load that folder into Chrome as an unpacked developer plugin, see [this guide](https://developer.chrome.com/extensions/getstarted#unpacked).

## Building from source
First build the plugin using gulp.

- `npm install --save-dev`. Using [yarn](https://yarnpkg.com/) might work better.
- `gulp`

This builds the plugin to `dist/`. 

You might want to change the `PROMETHEUS_URL` variable in `background.js` to use a custom server. Currently it is set to use a dynamic dns that points to 127.0.0.1. However if you are running this plugin behind a corporate http proxy you need to manually change this to 127.0.0.1 because the proxy will interfere with the dns resolution.
