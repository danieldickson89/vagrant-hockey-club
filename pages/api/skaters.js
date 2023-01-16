import dbConnect from "../../lib/dbConnect";
import Skater from "../../models/Skater";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      Skater.find().then((response) => {
        res.status(200).json({
          message: "Get Success",
          response: response,
        });
      });
      break;
  }
}
