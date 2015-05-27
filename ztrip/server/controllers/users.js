var mongoose = require('mongoose');
var User = mongoose.model('User');

var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10)
    {
    dd='0'+dd
    } 
    if(mm<10)
   	{
    mm='0'+mm
    } 
var today = mm+'/'+dd+'/'+yyyy;

module.exports = (function() {
  return {
    showOne: function(req, res) {
      console.log("find One: ", $routeParams.id, req.params.id, req.body);
      User.findOne({ name : req.params.id }, function(err, results) {
      if(err) {
        console.log(err);
      } else {
        // console.log(results);
        res.json(results);
      }
    })
    },
    show: function(req, res) {
      console.log("find : ", req.body);
      User.find({}, function(err, results) {
	    if(err) {
	      console.log(err);
	    } else {
	    	// console.log(results);
	      res.json(results);
	    }
	  })
    },
    add: function(req, res) {
      console.log("post data : ", req.body, today);
      var user = new User({name: req.body.name, topicNum: req.body.topicNum, postNum: req.body.postNum, commentNum: req.body.commentNum ,created_at: today})	
        user.save(function(err, response) {
  	    if(err) {
  	      console.log(err);
  	    } else {
  	      console.log(response);
  	      res.json(response);
  	    }
	  })
    }

  }
})();