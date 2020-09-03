const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const redis = require("redis");
const app = express();
const port = 4003;

app.use(express.json());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "MyDatabase";

// Create a new MongoClient
const client = new MongoClient(url);

//Create a redis client
const redisClient = redis.createClient();

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  //creating an user
  app.post("/api/auth/create", (req, res) => {
    let counter = 0; //carry count from redis
    redisClient.get("createCount", (err, count) => {
      if (err) {
        console.log(err);
      }
      console.log(count);

      if (count !== null) {
        console.log("Cache hit");
        redisClient.incr("createCount", (err, updatedValue) => {
          if (err) {
            console.log(err);
          } else {
            console.log("create endpoint #hit: " + updatedValue);
            redisClient.publish(
              "myPubSubChannel",
              `create user endpoint #hit: ${updatedValue}`
            );
          }
        });
      } else {
        console.log("Cache miss");
        counter++;
        redisClient.set("createCount", counter);
        console.log("create endpoint #hit: " + counter);
        redisClient.publish(
          "myPubSubChannel",
          `create user endpoint #hit: ${counter}`
        );
      }
    });

    console.log("checking username");

    const { userId, password } = req.body;
    db.collection("UserCollection")
      .findOne({
        userId: userId,
      })
      .then((doc) => {
        if (doc === null) {
          db.collection("UserCollection").insertOne({
            userId: userId,
            password: password,
            notes: [],
          });
          res.send({ valid: true, redisCount: counter });
          console.log("user created");
        } else {
          res.send({
            valid: false,
            msg: "Username already taken",
            redisCount: counter,
          });
          console.log("username already taken");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  //user authentication
  app.post("/api/auth/authenticate", (req, res) => {
    let counter = 0; //carry count from redis
    redisClient.get("authenticateCount", (err, count) => {
      if (err) {
        console.log(err);
      }
      console.log(count);

      if (count !== null) {
        console.log("Cache hit");

        redisClient.incr("authenticateCount", (err, updatedValue) => {
          if (err) {
            console.log(err);
          } else {
            console.log("authenticate endpoint #hit: " + updatedValue);
            redisClient.publish(
              "myPubSubChannel",
              `user authentication endpoint #hit: ${updatedValue}`
            );
          }
        });
      } else {
        console.log("Cache miss");
        // counter = 1;
        counter++;
        redisClient.set("authenticateCount", counter);
        console.log("authenticate endpoint #hit: " + counter);
        redisClient.publish(
          "myPubSubChannel",
          `user authentication endpoint #hit: ${counter}`
        );
      }
    });

    console.log("check login");

    const { userId, password, note } = req.body;
    if (!password) {
      res.send({
        valid: false,
        msg: "password not entered",
      });
    }
    db.collection("UserCollection")
      .findOne({
        userId: userId,
      })
      .then((doc) => {
        if (doc) {
          if (doc !== null && doc.password === password) {
            res.send({
              valid: true,
              redisCount: counter,
            });
            console.log("login success");
          } else {
            res.send({
              valid: false,
              msg: "username or password is incorrect",
              redisCount: counter,
            });
            console.log("login fail");
          }
        } else {
          res.send({
            valid: false,
            msg: "username not entered",
            redisCount: counter,
          });
          console.log("login fail");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
