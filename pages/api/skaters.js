import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("hockeyApp");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("hockeyPlayers").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allSkaters = await db
        .collection("hockeyPlayers")
        .find({})
        .toArray();
      res.json({ status: 200, data: allSkaters });
      break;
  }
}
