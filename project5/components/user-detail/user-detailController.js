'use strict';

cs142App.controller('UserDetailController', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
    console.log('UserDetail of ', userId);

    console.log('window.cs142models.userModel($routeParams.userId)',
        window.cs142models.userModel(userId));

    //var userData = window.cs142models.userModel(userId);

    $scope.userDetail = {};

    $scope.userDetail.getUserData = function (userId) {
      $scope.FetchModel('/user/' + userId, $scope.userDetail.processUserData);
    };

    $scope.userDetail.processUserData = function (userData) {
      $scope.$apply( function () {
        $scope.userDetail.userData = userData;
        $scope.userDetail.fullName = userData.first_name + " " + userData.last_name;
        if (userData.first_name){
          $scope.userDetail.first_name_possessive = $scope.main.makePossessive(userData.first_name);
          $scope.main.toolbarTitle = $scope.userDetail.first_name_possessive + " Profile";
        } 
        else {
          $scope.main.toolbarTitle = $scope.userDetail.fullName;
        }
      });
    };
    
    $scope.userDetail.getUserData(userId);
  }]);
