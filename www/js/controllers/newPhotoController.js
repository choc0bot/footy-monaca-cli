var myApp = angular.module('myApp');

myApp.controller("newPhoto", ["$scope", "userIDService", "userService", "userPhotoService", "groupService", "emailService", "$firebaseArray", 
    function($scope, userIDService, userService, userPhotoService, groupService, emailService, $firebaseArray) {
        $scope.groupName = groupService.get();
        $scope.userName = userService.get();
        userID = userIDService.get();
        console.log('USER ID = '+ userID);
        $scope.userPhoto = userPhotoService.get();
        $scope.loading = false;
        $scope.submit = false;
        $scope.email = emailService.get();
        console.log("email is "+ $scope.email);
        
        var ref = new Firebase("https://flickering-fire-9394.firebaseio.com/User");
        var list = $firebaseArray(ref);
        //$scope.users = $firebaseArray(ref);
        list.$loaded().then(function() {
            userItem = list.$getRecord(userID);
            console.log('USER item = '+ userItem);
        });
        
        //ADD MESSAGE METHOD
        $scope.submitUser = function() {
            $scope.loading = true;
            $scope.submit = false;
            console.log("clicked submit");
            $scope.photo = angular.element(document).find('img').attr('src');
            //console.log($scope.photo);
            if ($scope.photo) {
                    userItem.photo = $scope.photo;
                    list.$save(userItem).then(function(ref) {
                        console.log('photo update');
                        window.location = 'index.html';
                    });
            }
        };
        
    }
]);