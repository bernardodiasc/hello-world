# Full-stack GraphQL with Apollo, Meteor & React

Playlist: https://www.youtube.com/playlist?list=PLLnpHn493BHFTDL9M1PKnxQwBwOZ8J-h4

## Step-by-step

Just some developer notes when following the tutorials.

### Creating Our Project & Setup

- https://www.meteor.com/
- `curl https://install.meteor.com/ | sh`
- `meteor create apollo --bare`
- `cd apollo && meteor` then open http://localhost:3000
- **consider `./apollo` as the root folder**
  - create `index.html`
  - create a bunch of folders:

```
$ tree -d -I node_modules
.
├── client
├── imports
│   ├── api
│   ├── startup
│   │   ├── client
│   │   └── server
│   └── ui
└── server
```

### Getting Started With React

- `npm install --save react react-dom`
- `touch client/init.js`
  - meteor will automatically load this file
  - this file is used to import all the client modules
- `touch imports/startup/client/index.js`
  - this is a regular React application that renders with `Meteor.startup()`
- `touch imports/ui/App.js`
  - regular React ui components that will be used in the client app

### Creating Our Apollo GraphQL Server

- `npm install --save apollo-client graphql-server-express express graphql graphql-tools body-parser`
- include `apollo` in `.meteor/packages`
- `touch server/init.js`
  - meteor will automatically load this file
  - this file is used to import all the server modules
- `touch imports/startup/server/index.js`
  - this is the Apollo server initialization
