'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
    console.log('UserPhoto of ', userId);

    $scope.userPhotos = {};

    $scope.userPhotos.getUserData = function (userId) {
      var userResource = $resource('/user/:userId');
      var userData = userResource.get({'userId': userId}, function () {
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
      var photoResource = $resource('/photosOfUser/:userId');
      var photos = photoResource.query({'userId': userId}, function () {
        $scope.userPhotos.photos = photos;
      });
    };

    $scope.userPhotos.getUserData(userId);
    $scope.userPhotos.getUserPhotos(userId);
  }]);
