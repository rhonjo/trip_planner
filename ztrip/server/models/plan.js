var mongoose = require('mongoose');
// create our friendSchema
var PlanSchema = new mongoose.Schema({
  name: String,
  color: String,
  cat: String,
  datefrom: String,
  dateto: String,
  username: String,
  numcomments: Number,
  vote: Number,
  created_at: String
});
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('Plan', PlanSchema);
