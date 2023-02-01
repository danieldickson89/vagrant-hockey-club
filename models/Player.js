import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  offense: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  skating: {
    type: Number,
    required: true,
  },
  passing: {
    type: Number,
    required: true,
  },
  shot: {
    type: Number,
    required: true,
  },
  stick: {
    type: Number,
    required: true,
  },
  attending: {
    type: Boolean,
    required: true,
  },
});

module.exports =
  mongoose.models.Player || mongoose.model("Player", PlayerSchema);
