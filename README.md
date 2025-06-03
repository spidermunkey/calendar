# My Calendar App

this is pet project for managing birthdays, tasks, and timers inside of a web ui.

changes persisted mongo db 'birthdays','Timers','events' for use with multiple workspaces

## Bring Your Own Cluster

> server/.env.js

    MONGO_USER=yourMongoUser

    MONGO_PASSWORD=yourMongoPassword
 
    MONGO_CLUSTER=yourCluster

> server/.config/env.js
const CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@cluster${process.env.MONGO_CLUSTER}.fnp9j.mongodb.net/?retryWrites=true&w=majority`

## Start Local Server

> localhost:5173
    > localhost:8080

`cd ./latest; npm run dev`

`cd ./latest/server; npm start`
