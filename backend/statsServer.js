const express = require("express");
const redis = require("redis");

const { MongoClient, ObjectID } = require("mongodb");
const app = express();
//const redis = require("redis");
const port = 4005;
/*
app.use(express.json());

const url = "mongodb://localhost:27017";

const dbName = "MyDatabase";

const client = new MongoClient(url);
*/

const redisClient = redis.createClient();


app.get("/api/stats/get", (req, res) => {
 
  const result = {
  authCount: 0,
  createCount: 0,
  noteCreateCount: 0,
  noteGetCount: 0,

  }
 





let resultPromise = new Promise((resolve, reject) => {

  redisClient.get("authenticateCount", (err, count) => {
    if (err) {
      console.log(err);
    }
    console.log("authenticateCount: " + count);
   if(count != null) result.authCount = count;
    //console.log(authCount);
});


redisClient.get("createCount", (err, count) => {
  if (err) {
    console.log(err);
  }
  console.log("createUserCount: " + count);

  if(count !== null) result.createCount = count;
});


redisClient.get("noteCreateCount", (err, count) => {
  if (err) {
    console.log(err);
  }
  console.log("noteCreateCount: " + count);
  if(count !== null) result.noteCreateCount = count;


});


redisClient.get("noteGetCount", (err, count) => {
  if (err) {
    console.log(err);
  }
  console.log("noteGetCount: " + count);

  if(count !== null) result.noteGetCount = count;

});
 
  setTimeout( function function2 () {

resolve(result);

  },1000)

})



resultPromise.then((success) => {
  console.log("success: " + success.authCount);

//const totalCount = authCount + createCount + noteCreateCount + noteGetCount;
//console.log("total" + totalCount);

  
res.json({
  valid: true, 
  auth: success.authCount, 
  createCount: success.createCount, 
  noteCreateCount: success.noteCreateCount, 
  noteGetCount: success.noteGetCount, 
 

});

})

























})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



/*
client.connect((err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  
    console.log("Connected successfully to server");
    const db = client.db(dbName);
  
    //creating an user
    app.get("/api/stats/get", (req, res) => {

    });

  
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  });*/
  // if (err) {
  //   console.log(err);
  //   process.exit(1);
  // }

  // console.log("Connected successfully to server");
  // const db = client.db(dbName);
/*
  redisClient.on('message', (channel, message) => {
    console.log(`${channel} : ${message}`);
  })
  redisClient.subscribe('myPubSubChannel')
  app.get("/api/stats/get", (req, res) => {
    console.log('stats server');
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
});*/
