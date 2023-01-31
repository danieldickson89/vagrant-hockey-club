import dbConnect from "../../lib/dbConnect";
import Player from "../../models/Player";
import sortData from "../../services/sortData";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      const { sortBy, sortType, sortAsc } = req.query;
      Player.find().then((response) => {
        // when getting the list of players we'll sort it alphabetically by default
        sortData(response, sortBy, sortType, sortAsc);
        res.status(200).json({
          message: "Get Success",
          response: response,
        });
      });
      break;
  }
}