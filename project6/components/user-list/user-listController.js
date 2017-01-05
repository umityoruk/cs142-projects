'use strict';

cs142App.controller('UserListController', ['$scope',
    function ($scope) {
    	console.log('window.cs142models.userListModel()', window.cs142models.userListModel());
        $scope.main.title = 'Users';
        $scope.userList = {};

        $scope.userList.getUserList = function () {
        	$scope.FetchModel('/user/list', $scope.userList.processUserList);
        };

        $scope.userList.processUserList = function (userList) {
        	$scope.$apply(function () {
        		$scope.userList.users = userList;
        	});
        };

        $scope.userList.getUserList();
    }]);

