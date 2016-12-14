'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
    console.log('UserPhoto of ', $routeParams.userId);

    console.log('window.cs142models.photoOfUserModel($routeParams.userId)',
       window.cs142models.photoOfUserModel(userId));

    $scope.userPhotos = {};

    $scope.userPhotos.getUserData = function (userId) {
      $scope.FetchModel('/user/' + userId, $scope.userPhotos.processUserData);
    };

    $scope.userPhotos.processUserData = function (userData) {
      $scope.$apply(function () {
        if (userData.first_name) {
          var firstNamePossessive = $scope.main.makePossessive(userData.first_name);
          $scope.main.toolbarTitle = firstNamePossessive + " Photo Album";
        }
        else {
          $scope.main.toolbarTitle = "Photo Album";
        }
      });
    };

    $scope.userPhotos.getUserPhotos = function (userId) {
      $scope.FetchModel('/photosOfUser/' + userId, $scope.userPhotos.processUserPhotos);
    };

    $scope.userPhotos.processUserPhotos = function (userPhotos) {
      $scope.$apply(function () {
        $scope.userPhotos.photos = userPhotos;
      });
    };

    $scope.userPhotos.getUserData(userId);
    $scope.userPhotos.getUserPhotos(userId);
  }]);
