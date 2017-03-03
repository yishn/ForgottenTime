# ForgottenTime

A simple timer app for everybody. [Download the latest release here.](https://github.com/yishn/ForgottenTime/releases/latest)

![Screenshot](screenshot.png)

This project is inspired by the wonderful [Minutes widget](http://minutes.en.softonic.com/mac) from Nitram-nunca.

## Building

Building ForgottenTime requires [Node.js](https://nodejs.org/en/download/) and npm. First, clone this repository:

~~~
$ git clone https://github.com/yishn/ForgottenTime
$ cd ForgottenTime
~~~

Install the dependencies using npm:

~~~
$ npm install
~~~

You can build using:

~~~
$ npm run pack
~~~

To create installers, use:

* `npm run dist:win` for Windows
* `npm run dist:linux` for Linux

The binaries will be created in `ForgottenTime/dist/`.
