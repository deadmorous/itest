itest: web-server for testing student skills in programming
===========================================================

Pre-requisites
--------------
- git
- node.js
- npm

Installation
------------

After cloning the repository, run
```
npm install
```
once in order to install the dependencies.

Starting the server
-------------------

To start the web-server, run
```
npm start
```
By default, the web-server listens at port 3000.
The port can be specified using the `PORT` environment variable. For example, to srtart server listening at port 80 on Linux, you could run
```
sudo PORT=80 npm start
```
Assuming your server is running at port 3000 on the local machine, use the `http://localhost:3000` URL for a student log-in or the `http://localhost:3000/su` URL for a teacher login. In the latter case, you have to enter a password. Currently the teacher's sha1-hash is hardcoded in file `routers/su.js` (to find it, search for the first occurrence of `SuPassHash`).
