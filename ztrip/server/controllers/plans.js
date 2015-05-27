var mongoose = require('mongoose');
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
      console.log("plan model", req.body)
      Plan.find({}, function(err, results) {
      if(err) {
        console.log(err);
      } else {
        console.log('result ', results);
        res.json(results);
      }
    })
    },
    showOne: function(req, res) {
      console.log("plan model", req.body)
      Plan.find({_id : req.body.id}, function(err, results) {
	    if(err) {
	      console.log(err);
	    } else {
	    	console.log('result ', results);
	      res.json(results);
	    }
	  })
    },
    upvote: function(req, res) {
      console.log("post data : ", req.body);
      
      
          Plan.findOne({_id : req.body.id}, function(err, results) {
            if(err) {
              console.log(err);
            } else {
              console.log('results', results)
              console.log('results.vote before', results.vote)
              var counter = results.vote+ 1;
              // console.log('results.numcomments after', results.numcomments)
              Plan.update({_id : req.body.id}, {vote: counter},function(err, response2){
                console.log('response1',response2);
                res.json(response2);
                
              })
            }
          })
    },
    downvote: function(req, res) {
      console.log("post data : ", req.body);
    
          Plan.findOne({_id : req.body.id}, function(err, results) {
            if(err) {
              console.log(err);
            } else {
              console.log('results', results)
              console.log('results.vote before', results.vote)
              var counter = results.vote- 1;
              // console.log('results.numcomments after', results.numcomments)
              Plan.update({_id : req.body.id}, {vote: counter},function(err, response2){
                console.log('response1',response2);
                res.json(response2);
                
              })
            }
          })
    },
    add: function(req, res) {
      console.log("post data : ", req.body, today);

      function timeConverter(timestamp){
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        
        if(day<10)
        {
        day='0'+day
        } 
        if(month<10)
        {
        month='0'+month
        }
        if(hour<10)
        {
        hour='0'+hour
        }
        if(min<10)
        {
        min='0'+min
        }
        var newdate = month+'/'+day+'/'+year+' '+hour+':'+min;
        return newdate;
      }
      
      formatdatefrom = timeConverter(req.body.datefrom)
      formatdateto = timeConverter(req.body.dateto) 
      
      var plan = new Plan({name: req.body.name, color: req.body.color, cat: req.body.cat, datefrom: formatdatefrom, dateto: formatdateto, username: req.body.username, numcomments: 0, vote: 0,created_at: today})	
        plan.save(function(err, response) {
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