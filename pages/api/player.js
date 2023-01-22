import dbConnect from "../../lib/dbConnect";
import Player from "../../models/Player";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        Player.findById(id).then((response) => {
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
      const newPlayer = new Player({
        name: name,
        offense: offense,
        defense: defense,
        skating: skating,
        passing: passing,
        shot: shot,
        stick: stick,
      });
      newPlayer
        .save()
        .then((response) => {
          res.status(200).json({
            message: "Post Success",
            response: response,
          });
        })
        .catch((response) => {
          res.status(500).json({
            message: "Error creating player",
            response: response,
          });
        });
      break;
    case "PUT":
      try {
        const { id } = req.query;
        const name = req.body.name;
        const offense = req.body.offense;
        const defense = req.body.defense;
        const skating = req.body.skating;
        const passing = req.body.passing;
        const shot = req.body.shot;
        const stick = req.body.stick;
        Player.findById(id)
          .then((player) => {
            player.name = name;
            player.offense = offense;
            player.defense = defense;
            player.skating = skating;
            player.passing = passing;
            player.shot = shot;
            player.stick = stick;
            player.save().then((response) => {
              res.status(200).json({
                message: "Put Success",
                response: response,
              });
            });
          })
          .catch((response) => {
            res.status(500).json({
              message: "Error updating player",
              response: response,
            });
          });
        break;
      } catch (error) {}
    case "DELETE":
      const { id } = req.query;
      Player.findByIdAndDelete(id)
        .then((response) => {
          res.status(200).json({
            message: "Delete Success",
            response: response,
          });
        })
        .catch((response) => {
          res.status(500).json({
            message: "Error deleting player",
            response: response,
          });
        });
  }
}
