# Full-stack GraphQL with Apollo, Meteor & React

Playlist: https://www.youtube.com/playlist?list=PLLnpHn493BHFTDL9M1PKnxQwBwOZ8J-h4

## Some Steps

- https://www.meteor.com/
- `curl https://install.meteor.com/ | sh`
- `meteor create apollo --bare`
- `cd apollo && meteor` then open http://localhost:3000
- consider `/apollo` as the root folder
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

