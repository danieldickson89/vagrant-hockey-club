import dbConnect from "../../lib/dbConnect";
import Player from "../../models/Player";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      Player.find().then((response) => {
        res.status(200).json({
          message: "Get Success",
          response: response,
        });
      });
      break;
  }
}
