var myApp = angular.module('myApp');

myApp.controller("resultsDB", ["roundService","$scope", "$firebaseArray", 
  function(roundService,$scope, $firebaseArray) {
    $scope.loading = true;
    $scope.pRound = false;
    $scope.tRound = true;
    var rNumber = roundService.get();
    $scope.roundNumber = parseInt(rNumber, 8) - 1;
    var ref = new Firebase("https://flickering-fire-9394.firebaseio.com/results/round"+rNumber);
    var obj = $firebaseArray(ref);
        //$scope.users = $firebaseArray(ref);
        obj.$loaded().then(function() {
            $scope.results = obj;
            $scope.loading = false;
            console.log("getting results...");
        });
    
    //GET previous round resuslts
    var previousref = new Firebase("https://flickering-fire-9394.firebaseio.com/results/round"+$scope.roundNumber);
    var previousObj = $firebaseArray(previousref);
        //$scope.users = $firebaseArray(ref);
        previousObj.$loaded().then(function() {
            $scope.previousResults = previousObj;
            $scope.loading = false;
            console.log("getting previous results...");
        });
    
    //$scope.results = $firebaseArray(ref);  
     $scope.curRound = function() {
        $scope.displayRoundNumber = roundService.get();
        console.log("Round number "+$scope.displayRoundNumber);
        $scope.pRound = false;
        $scope.tRound = true;
    };
    $scope.lastRound = function() {
        var rNumber = roundService.get();
        $scope.displayRoundNumber = parseInt(rNumber, 8) - 1;
        console.log("Round number "+$scope.displayRoundNumber);
        $scope.pRound = true;
        $scope.tRound = false;
    };
  }
]);
