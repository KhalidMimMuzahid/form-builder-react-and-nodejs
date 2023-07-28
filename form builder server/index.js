const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.ejj8xud.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const formCollection = client
      .db("formBuilderDatabase")
      .collection("formCollection");

    const formResponseCollection = client
      .db("formBuilderDatabase")
      .collection("formResponseCollection");

    app.post("/formCollection", async (req, res) => {
      const fields = req?.body;
      console.log("fields: ", fields);
      const result = await formCollection.insertOne(fields);
      if (result?.insertedId) {
        res.send({ success: true, message: "form added successfully" });
      } else {
        res.send({
          success: false,
          message: "Something went wrong, please try again",
        });
      }
    });
    app.post("/formResponse", async (req, res) => {
      const formResponse = req?.body;
      //   console.log("fields: ", fields);
      const result = await formResponseCollection.insertOne(formResponse);
      if (result?.insertedId) {
        res.send({
          success: true,
          message: "form response added successfully",
        });
      } else {
        res.send({
          success: false,
          message: "Something went wrong, please try again",
        });
      }
    });
    app.get("/formCollection", async (req, res) => {
      console.log("fuck");
      const result = await formCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/responseCollection", async (req, res) => {
      console.log("fuck");
      const result = await formResponseCollection.find({}).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log());

app.listen(port, () => {
  console.log("listening on port", port);
});
