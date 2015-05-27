  // This is our routes.js file located in /config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  var user = require('./../server/controllers/users.js');
  var plan = require('./../server/controllers/plans.js');
  var comment = require('./../server/controllers/comments.js');

  module.exports = function(app) 
  {
    app.get('/users', function(req, res) 
    {
      user.show(req, res);
	  })
	  app.post('/add_user', function(req, res) 
    {
  		user.add(req, res);
	  })
    app.post('/add_plan', function(req, res) 
    {
      console.log('routes plan', req.body)
      plan.add(req, res);
    })
    app.get('/get_plans', function(req, res) 
    {
      console.log('routes', req.body)
      plan.show(req, res);
    })
    app.post('/plan', function(req, res) 
    {
      console.log('routes', req.body)
      plan.showOne(req, res);
    })
    app.post('/add_comment', function(req, res) 
    {
      comment.add(req, res);
    })
    app.post('/comments', function(req, res) 
    {
      console.log('comment routes', req.body)
      comment.show(req, res);
    })
    app.get('/get_comments', function(req, res) 
    {
      comment.showAll(req, res);
    })
    app.post('/upvote', function(req, res) 
    {
      plan.upvote(req, res);
    })
     app.post('/downvote', function(req, res) 
    {
      plan.downvote(req, res);
    })
    
  }