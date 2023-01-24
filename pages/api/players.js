import dbConnect from "../../lib/dbConnect";
import Player from "../../models/Player";
import sortData from "../../services/sortData";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      Player.find().then((response) => {
        // when getting the list of players we'll sort it alphabetically by default
        sortData(response, "name", true);
        res.status(200).json({
          message: "Get Success",
          response: response,
        });
      });
      break;
  }
}
