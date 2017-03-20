var myApp = angular.module('myApp');

myApp.controller("groupDB", ["$scope", "$firebaseArray", 
    function($scope, $firebaseArray) {
        $scope.loading = false;
        $scope.submit = true;
        var ref = new Firebase("https://flickering-fire-9394.firebaseio.com/group");
        var obj = $firebaseArray(ref);
        //$scope.users = $firebaseArray(ref);
        obj.$loaded().then(function() {
            $scope.group = obj;
        });
    
        //ADD MESSAGE METHOD
        $scope.submitGroup = function() {
            console.log("clicked submit");
            $scope.loading = true;
            $scope.submit = false;
            var name = $scope.name.toLowerCase();
            monaca.getDeviceId(function(id){
                $scope.group.$add({ name: name, deviceID: id})
                    .then(function(p){
                        // do something on success
                        $scope.message = "Group Added";
                        window.location = 'index.html';
                    });
                }
            )};
        }
]);

myApp.controller("ladderDB", ["$scope", "roundService", "$firebaseArray", 
  function($scope, roundService, $firebaseArray) {
    $scope.roundNumber= roundService.get();
    var ref = new Firebase("https://flickering-fire-9394.firebaseio.com/ladder");
    $scope.ladder = $firebaseArray(ref);
    
  }
]);