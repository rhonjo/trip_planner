var mongoose = require('mongoose');
// create our friendSchema
var UserSchema = new mongoose.Schema({
  name: String,
  topicNum: Number,
  postNum: Number,
  commentNum: Number,
  created_at: String
});
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('User', UserSchema);
