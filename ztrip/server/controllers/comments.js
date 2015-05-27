var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Plan = mongoose.model('Plan');


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
    show: function(req, res) {
      console.log("Comment model", req.body)
      Comment.find({id : req.body.id}, function(err, results) {
      if(err) {
        console.log(err);
      } else {
        // console.log('result comments ', results);
        res.json(results);
      }
    })
    },
    showAll: function(req, res) {
      console.log("show all model model", req.body)
      Comment.find({}, function(err, results) {
	    if(err) {
	      console.log(err);
	    } else {
	    	console.log('result ', results);
	      res.json(results);
	    }
	  })
    },
    add: function(req, res) {
      console.log("post data : ", req.body, today);
      
      
      var comment = new Comment({id: req.body.id, comment: req.body.comment, created_at: today})

        comment.save(function(err, response) {
  	    if(err) {
  	      console.log(err);
  	    } else {
          Plan.findOne({_id : req.body.id}, function(err, results) {
            if(err) {
              console.log(err);
            } else {
              console.log('results', results)
              console.log('results.numcomments before', results.numcomments)
              var counter = results.numcomments+ 1;
              // console.log('results.numcomments after', results.numcomments)
              Plan.update({_id : req.body.id}, {numcomments: counter},function(err, response2){
                console.log('response1',response2);
                res.json(response2);
                
              })
            }
          })
          
  	    }
        
	  })
    }

  }
})();