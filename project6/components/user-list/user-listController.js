'use strict';

cs142App.controller('UserListController', ['$scope', '$resource',
    function ($scope, $resource) {
        $scope.main.title = 'Users';
        $scope.userList = {};

        $scope.userList.getUserList = function () {
            var userListResource = $resource('/user/list');
            var users = userListResource.query({}, function () {
                $scope.userList.users = users;
            });
        };

        $scope.userList.getUserList();
    }]);

