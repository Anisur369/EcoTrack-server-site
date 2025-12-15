const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
app.use(express.json());
require("dotenv").config();

// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://ecotrack-assigment10.netlify.app/","https://thunderous-jalebi-768faa.netlify.app/", "https://courageous-moonbeam-d0bd72.netlify.app"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);



// const uri = "mongodb://localhost:27017";
// const uri =
//   "mongodb+srv://ashik:2e5Ekv1JbPyPnF1Z@anisur.kaax7ve.mongodb.net/?appName=anisur";
const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function run() {
  try {
    // await client.connect();
    const ecoTrack = client.db("EcoTrack");
    const challengesCollection = ecoTrack.collection("challenges");
    const userChallengesCollection = ecoTrack.collection("userChallenges");
    const tipsCollection = ecoTrack.collection("tips");
    const eventsCollection = ecoTrack.collection("events");

    // challenges related apis
    app.get("/challenges", async (req, res) => {
      const cursor = challengesCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/challenges/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await challengesCollection.findOne(query);
      res.send(result);
    });
    app.post("/challenges", async (req, res) => {
      const newChallenge = req.body;
      console.log(newChallenge);
      const result = await challengesCollection.insertOne(newChallenge);
      res.send(result);
    });
    app.delete("/challenges/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await challengesCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/challenges/:id", async (req, res) => {
      const id = req.params.id;
      const updatedChallenge = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedChallenge.title,
          category: updatedChallenge.category,
          description: updatedChallenge.description,
          duration: updatedChallenge.duration,
          target: updatedChallenge.target,
          impactMetric: updatedChallenge.impactMetric,
          createdBy: updatedChallenge.createdBy,
          startDate: updatedChallenge.startDate,
          endDate: updatedChallenge.endDate,
          imageUrl: updatedChallenge.imageUrl,
        },
      };
      const result = await challengesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    app.patch("/challenges/:id", async (req, res) => {
      const id = req.params.id;
      const updatedChallenge = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedChallenge.title,
          category: updatedChallenge.category,
          metric: updatedChallenge.metric,
          image: updatedChallenge.image,
        },
      };
      const result = await challengesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // userChallenges related apis
    app.get("/userChallenges", async (req, res) => {
      const cursor = userChallengesCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/userChallenges/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userChallengesCollection.findOne(query);
      console.log(result);
      res.send(result);
    });
    app.post("/userChallenges", async (req, res) => {
      const newUserChallenge = req.body;
      console.log(newUserChallenge);
      const result = await userChallengesCollection.insertOne(newUserChallenge);
      res.send(result);
    });
    app.delete("/userChallenges/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userChallengesCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/userChallenges/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUserChallenge = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedUserChallenge.title,
          category: updatedUserChallenge.category,
          metric: updatedUserChallenge.metric,
          imageUrl: updatedUserChallenge.imageUrl,
          challengeId: updatedUserChallenge.challengeId,
          userId: updatedUserChallenge.userId,
          status: updatedUserChallenge.status,
          date: updatedUserChallenge.date,
        },
      };

      const result = await userChallengesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // tips related apis
    app.get("/tips", async (req, res) => {
      const cursor = tipsCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/tips/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tipsCollection.findOne(query);
      res.send(result);
    });
    app.post("/tips", async (req, res) => {
      const newTip = req.body;
      console.log(newTip);
      const result = await tipsCollection.insertOne(newTip);
      res.send(result);
    });
    app.delete("/tips/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tipsCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/tips/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTip = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedTip.title,
          category: updatedTip.category,
          metric: updatedTip.metric,
          image: updatedTip.image,
        },
      };
      const result = await tipsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    app.patch("/tips/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTip = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedTip.title,
          category: updatedTip.category,
          metric: updatedTip.metric,
          image: updatedTip.image,
        },
      };
      const result = await tipsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // events related apis
    app.get("/events", async (req, res) => {
      const cursor = eventsCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventsCollection.findOne(query);
      res.send(result);
    });
    app.post("/events", async (req, res) => {
      const newEvent = req.body;
      console.log(newEvent);
      const result = await eventsCollection.insertOne(newEvent);
      res.send(result);
    });
    app.delete("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventsCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/events/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEvent = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedEvent.title,
          category: updatedEvent.category,
          metric: updatedEvent.metric,
          image: updatedEvent.image,
        },
      };
      const result = await eventsCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    app.patch("/events/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEvent = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: updatedEvent.title,
          category: updatedEvent.category,
          metric: updatedEvent.metric,
          image: updatedEvent.image,
        },
      };
      const result = await eventsCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

