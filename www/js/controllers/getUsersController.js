var myApp = angular.module('myApp');

myApp.controller("getUsers", function($scope, Users, userService, groupService) {
    $scope.loading = true;
    //$scope.groupName = groupService.get();
        $scope.groupName = groupService.get();
        console.log("get group "+$scope.groupName);
    

    $scope.users = Users.all;
    var userID = x.$getRecord(postId);
    $scope.users.$loaded().then(function() {
        $scope.loading = false;
    });
        
    $scope.setUser = function(uName) {
            console.log("setUser clicked");
            userService.set(uName);
        };
    });