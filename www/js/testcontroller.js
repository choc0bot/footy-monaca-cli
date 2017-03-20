var myApp = angular.module('myApp');

myApp.controller('startUpController', function($scope) {
    //roundService.set(1);
    $scope.roundTipped = true;
    console.log('THIS IS STARTUP');
});

