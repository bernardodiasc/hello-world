# Full-stack GraphQL with Apollo, Meteor & React

Playlist: https://www.youtube.com/playlist?list=PLLnpHn493BHFTDL9M1PKnxQwBwOZ8J-h4

## Step-by-step

Just some developer notes when following the tutorials.

Commits history: https://github.com/bernardodiasc/hello-world/commits/master/my-meteor-apollo-graphql-react-app

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

### Our First Schema & Query

- http://localhost:3000/graphiql is already up and running at this point
- create `typeDefs` and `resolvers`
- create `schema` using Apollo's `makeExecutableSchema({ typeDefs, resolvers })`
- run the Apollo server with the schema `createApolloServer({ schema })`

### Connecting React To Apollo & Apollo DevTools

- `npm install --save apollo-client-preset react-apollo graphql-tag`
- setup and wrap App with Apollo provider
- Apollo Client DevTools https://github.com/apollographql/apollo-client-devtools
- GraphQL Network https://github.com/Ghirro/graphql-network

### GraphQL Queries in React

- create graphql query and connect a react component with it

### GraphQL Schema Files

- The tutorial will be creating a "resolutions" app, designed similarly as a to-do list.
- `mkdir imports/api/resolutions`
- `touch imports/api/resolutions/Resolutions.graphql`
- Add syntax highlight to the editor https://github.com/dncrews/GraphQL-SublimeText3
- create Resolutions GraphQL type definition on `Resolutions.graphql`
- `touch imports/startup/server/register-api.js`
- on `register-api.js` import `ResolutionsSchema` from `Resolutions.graphql`
- import `register-api.js` on `startup/server/index.js`
- `touch .babelrc` and include `babel-plugin-inline-import` plugin
- `npm install --save-dev babel-plugin-inline-import`
- move the existing code that was on `startup/server/index.js` to `register-api.js`
- make `typeDefs` to be an array of schemas
  - the idea of this is to make the application scalable. most tutorials just demo all the stuff together and in this step was well explained the different pattern, from a hello-world app to a real app

### Object Queries

- include `resolutions()` in the resolvers returning an array of objects
- include `resolutions: [Resolution]` in the `type Query`
- include `resolutions` (with fields) in the React component GraphQL query
- prevent react to try to use data not yet available with `data.loading`

### Organizing Our Resolvers

- `touch imports/api/resolutions/resolvers.js`
- move resolutions resolvers object from `register-api.js` to `api/resolutions/resolvers.js`
- `npm install --save lodash` and use lodash's `merge` to merge all resolvers
  - alternatively this could be solved with `mergeSchemas` from `graphql-tools`
  - also alternatively `bundle` from https://github.com/lucasconstantino/graphql-modules could be used

### Creating A Collection and Using Our Database

- `touch imports/api/resolutions/resolutions.js`
- define new mongo collection "resolutions"
- return fetch from collection on resolver

### Introduction To Mutations

- include Mutation resolvers on `imports/api/resolutions/resolvers.js`
- include `creteResolution()` on resolutions mutation
- include `type Mutation` on resolutions schema with field `createResolution: Resolution`
- create new ui component `ResolutionForm`
- create graphql mutation query and wrap the react component with it

### Mutation Variables & Data Refetch

- pass variable `$name` on the `createResolution` mutation on `ResolutionForm` component
- pass the value from input as variable into `createResolution` function
- declare the variable `name` in the mutation schema of `createResolution`
- make the mutation resolver to insert received data on database
- include `data.refetch` from `App` on `ResolutionForm` component and call it on promised event after insertion of the new data

### Auto Refetching & Query Prop Assignment

- give a name for main query in `App.js`, as `query Resolution {...}`
- include `options: { refetchQueries: ['Resolution'] }` in `ResolutionForm` graphql HOC
- notice that `this.props.refetch()` is no longer needed, since it's refetching the query automatically now
- in the `App.js` graphql HOC, include extra argument object with `props` mapping `data`

### Basic Meteor Accounts System

- add `accounts-password` into `.meteor/packages`
- an error will prompt to run `meteor npm install --save bcrypt`, then do it
- the `Accounts` variable are now available globaly in the application
  - or it can be implicit imported as `import { Accounts } from 'meteor/accounts-base'`
- `touch imports/ui/RegisterForm.js` and create a simple register form
- write the `registerUser` method using Meteor's `Accounts.createUser`
- `touch imports/ui/LoginForm.js` and create a simple login form
- write the `loginUser` method using `Meteor.loginWithPassword`
- test the app by registering a user
  - in the browser console type `Meteor.userId()` to see the logged user ID
  - in the browser console type `Meteor.logout()` to log out the session
  - try to log in with your newly created credentials, and confirm in the console with `Meteor.userId()`

### Connecting Meteor Accounts To Apollo

- `import { ApolloLink, from } from 'apollo-link'` at `imports/startup/client/index.js`
- create the `authLink` using `ApolloLink`
- on `client` const, update to `link: from([authLink, httpLink])`
- now on Resolution's `resolver.js` we can find `userId` in the `context` and filter values with that

### User Inserts & client.resetStore in Apollo

- include `userId` in the Resolution mutation `createResolution`
- import `withApollo` from `react-apollo` on `App.js`
- include `client.resetStore()` in the logout onclick function
- pass down `client` prop to forms
- on forms, on submit functions, if there's no errors, run `this.props.client.resetStore()`
- test the app, when register, log in or log out, the store will be updated
 
### User Schema & Query

- `mkdir imports/api/users`
- `touch imports/api/users/User.graphql`
- include GraphQL type of User in the file
- import User schema on `register-api.js`
- `touch imports/api/users/resolvers.js`
- create the User resolver Query
- import User resolvers on `register-api.js`
- update `App.js` GraphQL query and treat UI variations with given `user` prop

### Extending Schema Types

- move type Query of each schema to it's graphql file
- prepend `extend` keyword at `type Query`

### Custom Resolvers

- include `User` resolver at `users/resolvers.js` with a `email` method

### Our Goals Schema Resolvers & Collection

- `mkdir imports/api/goals`
- `touch imports/api/goals/resolvers.js`
- `touch imports/api/goals/Goal.graphql`
- `touch imports/api/goals/goals.js`
- create mongo collection at `goals.js`
- create type Goal at the GraphQL schema
- create the resolvers on Goals for the Mutation `createGoal`
- create the type Mutation on Goal schema
- include Goal schema and resolvers in the `register-api.js`
- `touch imports/ui/GoalForm.js` and create the form component there very similar to `ResolutionForm`
- add the GoalForm into App

### Relational Data Resolvers

- add `goals` field to `Resolutions` type schema
- create `Resolution` resolver in `resolutions/resolvers.js` to fetch `goals`

### Relational Data Query

- `mkdir imports/ui/resolutions`
- `touch imports/ui/resolutions/Goals.js`
- create Goal component and declare it on each individual resolution at App
- include `refetchQueries` for `Resolutions` at `GoalForm` component

### Writing A Toggle Mutation

- create `toggleGoal` Mutation in Goal resolver
- include `toggleGoal` Mutation in Goal schema
- wrap Goal component with graphql mutation `toggleGoal`
- include checkbox `onChange` to trigger `toggleGoal` passing the goal `_id`

#### Extra note:

There was an issue with babel preset when saving `.graphql` files, the Meteor wasn't reloading application automatically. To fix this issue I had to remove the babel plugin and include a meteor package:

- `meteor add swydo:graphql`
- `npm uninstall --save-dev babel-plugin-inline-import`
- `rm .babelrc`

### Custom Resolvers For Useful Data

- add new field `completed` at `type Resolution` schema
- add new method `completed` at Resolution resolver
