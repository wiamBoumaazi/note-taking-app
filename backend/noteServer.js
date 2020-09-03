const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const axios = require("axios");
const redis = require("redis");
const port = 4002;

app.use(express.json());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "MyDatabase";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  //redis
  const redisClient = redis.createClient();

  //creating a note
  app.post("/api/notes/create", (req, res) => {
    let counter = 0; //carry count from redis
    redisClient.get("noteCreateCount", (err, count) => {
      if (err) {
        console.log(err);
      }

      if (count !== null) {
        console.log("Cache hit");
        redisClient.incr("noteCreateCount", (err, updatedValue) => {
          if (err) {
            console.log(err);
          } else {
            console.log("note create endpoint #hit: " + updatedValue);
            redisClient.publish(
              "myPubSubChannel",
              `note create endpoint #hit: ${updatedValue}`
            );
          }
        });
      } else {
        console.log("Cache miss");
        counter++;
        redisClient.set("noteCreateCount", counter);
        console.log("note create endpoint #hit: " + counter);
        redisClient.publish(
          "myPubSubChannel",
          `note create endpoint #hit: ${counter}`
        );
      }
    });

    console.log("note creating");
    const { userId, password, note } = req.body;
    const body = {
      userId: userId,
      password: password,
    };
    axios
      .post("http://localhost:4001/api/auth/authenticate", body)
      .then((res) => {
        const data = res.data;
        return data;
      })
      .then((data) => {
        if (note && data.valid) {
          db.collection("UserCollection")
            .findOneAndUpdate({ userId: userId }, { $push: { notes: note } })
            .then((doc) => {
              res.send({ valid: true });
              console.log("Note added..");
            })
            .catch((e) => res.send("error", e));
        } else {
          res.send({
            valid: false,
            msg: "User authentication failed or Note is empty",
          });
        }
      });
  });

  //logic for getting notes
  app.post("/api/notes/get", (req, res) => {
    let counter = 0; //carry count from redis
    redisClient.get("noteGetCount", (err, count) => {
      if (err) {
        console.log(err);
      }
      console.log(count);

      if (count !== null) {
        console.log("Cache hit");

        redisClient.incr("noteGetCount", (err, updatedValue) => {
          if (err) {
            console.log(err);
          } else {
            console.log("note get endpoint #hit: " + updatedValue);
            redisClient.publish(
              "myPubSubChannel",
              `notes get endpoint #hit: ${updatedValue}`
            );
          }
        });
      } else {
        console.log("Cache miss");
        counter++;
        redisClient.set("noteGetCount", counter);
        console.log("note get endpoint #hit: " + counter);
        redisClient.publish(
          "myPubSubChannel",
          `notes get endpoint #hit: ${counter}`
        );
      }
    });

    console.log("getting notes");
    const { userId, password } = req.body;
    const body = {
      userId: userId,
      password: password,
    };
    axios
      .post("http://localhost:4001/api/auth/authenticate", body)
      .then((res) => {
        const data = res.data;
        return data;
      })
      .then((data) => {
        if (data.valid) {
          db.collection("UserCollection")
            .findOne({ userId: userId })
            .then((doc) => {
              res.send({ valid: true, notes: doc.notes });
            })
            .catch((e) => res.send("error", e));
        } else {
          res.send({ valid: false, msg: "User authentication failed" });
        }
      });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
