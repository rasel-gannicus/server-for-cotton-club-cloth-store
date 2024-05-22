const express = require("express");
const app = express();
const port = process.env.PORT || 5002;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://shafikrasel5:YoZQRmzumtu9s0QQ@cluster0.bm8swql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const clothDb = client.db("Cloth_Collection").collection("cloths");

    // --- getting all the cloths
    app.get("/allCloths", async (req, res) => {
      const query = {};
      const cursor = clothDb.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // --- getting single item details
    app.get("/cloths/:id", async (req, res) => {
      const params = req.params;
      const { id } = params;
      const query = { _id: new ObjectId(id) };
      const result = await clothDb.findOne(query);
      res.send(result);
    });



  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Ok got it");
});

app.listen(port, () => {
  console.log("Listening to port,", port);
});
