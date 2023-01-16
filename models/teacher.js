//importing mongoose
const mongoose = require("mongoose")
// schema represents the structure of a particular document
// Each schema maps to a MongoDB collection
const { Schema } = mongoose;

//Teacher credential schema
const teacherSchema = new Schema({
  password: {
    type : String
  }
});

//exporting the model
// A model defines a programming interface for interacting with the database (read, insert, update, etc).
module.exports = mongoose.model("teacher", teacherSchema)