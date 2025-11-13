const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
app.use(express.json());
app.use(cors());

// const uri =
//   "mongodb+srv://ashik:2e5Ekv1JbPyPnF1Z@anisur.kaax7ve.mongodb.net/?appName=anisur";

const uri = "mongodb://localhost:27017";

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
    await client.connect();
    const ecoTrack = client.db("EcoTrack");
    const challengesCollection = ecoTrack.collection("challenges");
    const productsCollection = ecoTrack.collection("products");
    const bidsCollection = ecoTrack.collection("bids");

    // users related apis

    app.get("/challenges", async (req, res) => {
      const cursor = challengesCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/challenges", async (req, res) => {
      const newChallenge = req.body;
      console.log(newChallenge);
      const result = await challengesCollection.insertOne(newChallenge);
      res.send(result);
    });
    // app.post("/challenges", async (req, res) => {
    //   const newUser = req.body;
    //   const email = req.body.email;
    //   const query = { email: email };
    //   console.log(query);
    //   const existingUser = await usersCollection.findOne(query);

    //   if (existingUser) {
    //     res.send({ message: "user already exists" });
    //   } else {
    //     const result = await usersCollection.insertOne(newUser);
    //     res.send(result);
    //   }
    // });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // products related apis

    app.get("/products", async (req, res) => {
      // const projectFields = { name: 1, price_min: 1 };
      // const cursor = productsCollection
      //   .find({})
      //   .sort({ price_min: 1 })
      //   .skip(0)
      //   .limit(3)
      //   .project(projectFields);

      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
        console.log(query);
      }
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/latest-products", async (req, res) => {
      const projectFields = { name: 1, image: 1, price_min: 1 };
      const cursor = productsCollection
        .find({})
        .sort({ created_at: -1 })
        .skip(0)
        .limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(query);
      const result = await productsCollection.findOne(query);
      res.send(result);
    });
    app.post("/products", async (req, res) => {
      const newUser = req.body;
      const result = await productsCollection.insertOne(newUser);
      res.send(result);
    });
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: updatedUser,
      };
      const result = await productsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });
    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await productsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    // bids related apis

    app.get("/bids", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }
      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid);
      res.send(result);
    });
    app.delete("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBid = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: updatedBid,
      };
      const result = await bidsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
