var myApp = angular.module('myApp');

myApp.controller("getGroup", function($scope, groupService) {
    $scope.groupName = groupService.get();  
});

//TO BE DELETED
myApp.controller("checkGroup", function($scope, Groups, groupService, deviceIDService) {
    $scope.loading = true;
    monaca.getDeviceId(function(id){
       deviceIDService.set(id);
    });

    $scope.groups = Groups.all;
    $scope.groups.$loaded().then(function() {
        deviceID = deviceIDService.get();
        angular.forEach($scope.groups, function(key, value) {
            if (deviceID === key.deviceID) {
                groupService.set(key.name);
            }
        });
    });
    
    $scope.groupName = function(){
        return groupService.get();
    };
    console.log("Group Name "+ $scope.groupName);
});
