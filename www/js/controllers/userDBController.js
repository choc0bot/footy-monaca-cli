var myApp = angular.module('myApp');

myApp.controller("userDB", ["$scope", "groupService", "$firebaseArray", 
    function($scope,groupService, $firebaseArray) {
        $scope.loading = false;
        $scope.submit = true;
        var ref = new Firebase("https://flickering-fire-9394.firebaseio.com/User");
        var obj = $firebaseArray(ref);
        //$scope.users = $firebaseArray(ref);
        obj.$loaded().then(function() {
            $scope.users = obj;
            console.log("getting users...");
        });    
        //ADD MESSAGE METHOD
        $scope.submitUser = function() {
            $scope.loading = true;
            $scope.submit = false;
            console.log("clicked submit");
            var name = $scope.name;
            var group = groupService.get();
            $scope.photo = angular.element(document).find('img').attr('src');
            //console.log($scope.photo);
            if ($scope.photo) {
                $scope.users.$add({ name: name, photo: $scope.photo, group: group})
                    .then(function(p){
                        // do something on success
                        $scope.message = "New User Added";
                        window.location = 'index.html';
                    });
            }
        };
        
    }
]);
