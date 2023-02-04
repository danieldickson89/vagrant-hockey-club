import dbConnect from "../../lib/dbConnect";
import Player from "../../models/Player";
import sortData from "../../services/sortData";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      Player.find({ attending: true }).then((response) => {
        sortData(response, "name", "abc", true);
        res.status(200).json({
          message: "Get Success",
          response: response,
        });
      });
      break;
  }
}
