var mongoose = require('mongoose');
// create our friendSchema
var CommentSchema = new mongoose.Schema({
  id: String,
  comment: String,
  created_at: String
});
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('Comment', CommentSchema);
