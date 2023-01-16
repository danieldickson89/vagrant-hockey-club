import dbConnect from "../../lib/dbConnect";
import Skater from "../../models/Skater";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        Skater.findById(Object(id)).then((response) => {
          res.status(200).json({
            message: "Get Success",
            response: response,
          });
        });
        break;
      } catch (error) {
        res.status(400).json({ success: false });
      }
    case "POST":
      const name = req.body.name;
      const offense = req.body.offense;
      const defense = req.body.defense;
      const skating = req.body.skating;
      const passing = req.body.passing;
      const shot = req.body.shot;
      const stick = req.body.stick;
      const newSkater = new Skater({
        name: name,
        offense: offense,
        defense: defense,
        skating: skating,
        passing: passing,
        shot: shot,
        stick: stick,
      });
      newSkater
        .save()
        .then((response) => {
          res.status(200).json({
            message: "Post Success",
            response: response,
          });
        })
        .catch((response) => {
          res.status(500).json({
            message: "Error creating skater",
            response: response,
          });
        });
      break;
    case "DELETE":
      const { id } = req.query;
      Skater.findByIdAndDelete(id)
        .then((response) => {
          res.status(200).json({
            message: "Delete Success",
            response: response,
          });
        })
        .catch((response) => {
          res.status(500).json({
            message: "Error deleting skater",
            response: response,
          });
        });
  }
}
