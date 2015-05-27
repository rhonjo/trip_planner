
    var myAppModule = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

    // myAppModule.config(function (localStorageServiceProvider) {
    //   localStorageServiceProvider
    //     .setStorageType('sessionStorage');
    // });

    myAppModule.config(function ($routeProvider) {
        $routeProvider
          .when('/users/:id',{
              templateUrl: 'partials/user.html'
          })
          .when('/plan/:id',{
              templateUrl: 'partials/plan.html'
          })
          .when('/dashboard',{
              templateUrl: 'partials/dashboard.html'
          })
          .when('/',{
              templateUrl: 'partials/main.html'
          })
          .otherwise({
            redirectTo: '/'
          });
      });
    myAppModule.controller('loginController', function($scope, localStorageService, customerFactory)
      {

          $scope.addUser = function ()
          {
            localStorageService.set('name', $scope.newUser);
   
          }
          
      })
      myAppModule.controller('dashboardController', function ($scope, localStorageService, customerFactory)
      {
          console.log('name:' , localStorageService.get('name'));
          $scope.newUser = localStorageService.get('name');
          customerFactory.getUser(function (data)
          {
              $scope.users = data;
          })
          customerFactory.getPlan(function (data)
          {
              $scope.plans = data;
          })
          // customerFactory.getComment(function (data)
          // {
          //     $scope.comments = data;
          //     console.log('im back with comments')
          //     console.log($scope.comments)
          // })
          $scope.addPlan = function ()
          {
            console.log("dashboard controller")
            $scope.newPlan.username = localStorageService.get('name').name;
            console.log($scope.newPlan)
            customerFactory.addPlan($scope.newPlan, function()
            {
              customerFactory.getPlan(function(data) 
              {  
                $scope.plans = data;
              });
                $scope.newPlan = {};
            });
          }
          $scope.upvote = function (id)
          {
            console.log('upvote :', id)
            
            customerFactory.upvote(id, function()
            {
              customerFactory.getPlan(function(data) 
              {  
                $scope.plans = data;
              });
                $scope.newPlan = {};
            });
          }
          $scope.downvote = function (id)
          {
            console.log('down vote :', id)
        
            customerFactory.downvote(id, function()
            {
              customerFactory.getPlan(function(data) 
              {  
                $scope.plans = data;
              });
                $scope.newPlan = {};
            });
          }
          $scope.logout = function ()
          {
            localStorage.clear();
          }
          
      })
      myAppModule.controller('userController', 
          function ( $scope, $routeParams, localStorageService, customerFactory)
            {
          // $scope.model = {
          //   name : $routeParams.id
          // }
          // console.log($scope.model.name)


          console.log('user controller')
          customerFactory.getOneTopic(function (data)
          {
              $scope.user = data;
          })
          customerFactory.getOneUser( function (data)
          {
              $scope.user = data;
          })
          $scope.logout = function ()
          {
            localStorage.clear();

          }
          
      })
      myAppModule.controller('planController', 
          function ( $scope, $routeParams, localStorageService, customerFactory)
            {
          // $scope.model = {
          //   name : $routeParams.id
          // }
          // console.log($scope.model.name)

          planId = $routeParams.id;
          console.log(planId )
          console.log('plan controller')
          customerFactory.getOnePlan(planId, function (data)
          {
              console.log('topic controller 2')
              $scope.plans = data[0];
              console.log($scope.plans)
          })
          customerFactory.getComments(planId, function (data)
              {
                console.log('topic comments 2', data)
                $scope.comments = data;
              })

          $scope.addComment = function (id)
          {
            console.log('adding comment :', id)
            $scope.newComment.id = id;
            console.log("add comment controller", $scope.newComment)
            customerFactory.addComment($scope.newComment, function()
            {
                console.log("finished adding comment: ", $scope.newComment)
              customerFactory.getComments($scope.newComment.id, function (data)
              {
                console.log('topic comments 2', data)
                $scope.comments = data;
              })
            });
          }


          
          
      })

    myAppModule.factory('customerFactory', function($http)
      {
        var factory = {};
        var user = [];
        var plan = [];
        var comment = [];
        factory.getOneUser = function (callback)
        {
            $http.get('/user').success(function(output)
            {
              // $scope.user = data;
              // $scope.whichUser = $routeParams.userID;
              // console.log('output factory' , output)
              user = output;
              callback(user);
            })
        }
        factory.getUser = function (callback)
        {
            $http.get('/users').success(function(output)
            {
              console.log(output)
              user = output;
              callback(user);
            })
        }
        factory.addUser = function(info, callback) 
        {
          $http.post('/add_user', info).success(function(output)
          {
            console.log('im here user')
            user = output;
            callback(user);
          })
        }
        factory.addPlan = function(info, callback) 
        {
          $http.post('/add_plan', info).success(function(output)
          {
            console.log('im here plan')
            plan = output;
            callback(plan);
          })
        }
        factory.getPlan = function (callback)
        {
            $http.get('/get_plans').success(function(output)
            {
              plan = output;
              callback(plan);
            })
        }
        factory.getOnePlan = function (id, callback)
        {
            console.log('plan factory', id)
            $http.post('/plan', {id : id}).success(function(output)
            {
              console.log('topic factory output', output)
              plan = output;
              callback(plan);
            })
        }
        factory.upvote = function (id, callback)
        {
            console.log('upvote factory', id)
            $http.post('/upvote', {id : id}).success(function(output)
            {
              plan = output;
              callback(plan);
            })
        }
        factory.downvote = function (id, callback)
        {
            console.log('downvote factory', id)
            $http.post('/downvote', {id : id}).success(function(output)
            {
              
              plan = output;
              callback(plan);
            })
        }
         factory.addComment = function(info, callback) 
        {
          console.log('im here topic comment')
          $http.post('/add_comment', info).success(function()
          {
            console.log('im here commentss')
            
            callback();
          })
        }
        factory.getComments = function (id, callback)
        {
            console.log("get comments ", id)
            $http.post('/comments', {id : id}).success(function(output)
            {
              comment = output;
              callback(comment);
            })
        }
        factory.getComment = function (callback)
        {
            $http.get('/get_comments').success(function(output)
            {
              comment = output;
              callback(comment);
            })
        }
        
        return factory
      });
      
 