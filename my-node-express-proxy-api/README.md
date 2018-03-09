# React with Express proxy to APIs

Simple PoC of proxying server setup.

This is fresh install, mostly boilerplate, the logic included can be found here https://github.com/bernardodiasc/react-backend/blob/master/routes/api.js#L5-L18 for the server and here https://github.com/bernardodiasc/react-backend/blob/master/client/src/App.js#L12 for the client.

The setup contains an Express server that provides basic redirecting:

```
user -> server: POST /
server -> remote: POST /
remote -> server: 200 OK
server -> user: 200 OK
```

And a basic React boilerplate of `create-react-app` on the client.

## Server

On project root (`/`) run `npm start`, let it running.

### Tech details

Rely on:

- node
- express

More information about the structure used:

- http://stackoverflow.com/questions/17612695/expressjs-how-to-redirect-a-post-request-with-parameters
- https://expressjs.com/en/api.html
- https://nodejs.org/api/http.html
- https://www.npmjs.com/package/request-promise

## Client

On client project (`/client`) run `npm start`, the app will open in the browser and watch all changes in the code, then hot load browser.

### Tech details

There is a browser end demo on `/client`

- create-react-app, provides workflow cli
- webpack, js bundler
- babel, js transpiler
- jest, test scripts
- storybooks, provides development tools

More infor about the structure used:

- https://daveceddia.com/create-react-app-express-backend/
