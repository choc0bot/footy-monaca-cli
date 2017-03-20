var myApp = angular.module('myApp');

myApp.controller('startUpController', function($scope, $http, Groups, Users, roundService, userService, userIDService, groupService, deviceIDService, userPhotoService, emailService) {
    //roundService.set(1);
    $scope.roundTipped = true;
    $scope.userName = userService.get();
    $scope.userPhoto = userPhotoService.get();
    email = emailService.get();    
    $scope.loading = true;
    monaca.getDeviceId(function(id){
       deviceIDService.set(id);
    });
    
    $http.get('./json/draw2016.json', { cache: true}).then(function(res){
            $scope.draw = res.data;    
            console.log("drawjson assigned!!!");
            roundNumberFull = function(){
                var currentTime = new Date();
                console.log("Getting roundNumberFull for "+ currentTime);
                //var currentTime = "2016-06-14 08:25:00";
                
                var cDate = Date.parse(currentTime);
                // current date plus four days
                var fourDay = new Date(currentTime.getTime() + 86400000 + 86400000 + 86400000 + 86400000);
                var fDate = Date.parse(fourDay);
                var gDate = Date.parse("1960-08-13 04:10:00");
                var rNumber = 0;
                var gameDate = 0;
                //var drawJson = $scope.draw;
                var i = 0;
                
                if ($scope.draw) {
                    while (cDate > gDate) {
                        if ( i < ($scope.draw.length)-1) {
                        //console.log(i + " - " + drawJson[i].date);
                        gameDate = $scope.draw[i].date;
                        gDate = Date.parse(gameDate);
                        gDate = gDate + 86400000 + 86400000 + 86400000 + 86400000;
                        i++;
                        }
                    }
                    
                    rNumber = $scope.draw[i].round;
                    console.log("rNumber = "+ rNumber);
                    $scope.rNumber = rNumber;
                    roundService.set(rNumber);
                    return rNumber;
                }
                else {
                    console.log("Round not save" + $scope.draw.length);
                }
            };
            $scope.roundNumber = roundNumberFull();
    },
    //return $scope.draw;
    function errorCallback(response) {
        console.log("error - "+ response);
    });
    
    
    //Check for group membership
    $scope.groups = Groups.all;
    $scope.groups.$loaded().then(function() {
        deviceID = deviceIDService.get();
        angular.forEach($scope.groups, function(key, value) {
            if (deviceID === key.deviceID) {
                groupService.set(key.name);
                $scope.groupName = (key.name);
                //$scope.groupName = "Test"
                if ($scope.groupName){
                    console.log("getting users... filter "+ $scope.groupName);
                    $scope.users = Users.all;
                    $scope.users.$loaded().then(function() {
                        $scope.loading = false;
                    });
                }
            }
        });
        if(typeof $scope.groupName === 'undefined'){
                app.slidingMenu.setMainPage("form_group.html", {closeMenu: true});
        }
        else {
            //Check for current user
            usobj = userService.get();
            if(Object.keys(usobj).length === 0 && JSON.stringify(usobj) === JSON.stringify({})){
                console.log('userService empty');
                app.slidingMenu.setMainPage("users.html", {closeMenu: true});
        }
    }
});
    
    $scope.setUser = function(uName, uID, uPhoto) {
        console.log("setUser clicked");
        userService.set(uName);
        userIDService.set(uID);
        userPhotoService.set(uPhoto);
        };
        
    
    //USES checktips() with checkIfUserExistsCallback to confirm seletion of exsiting tips.
    $scope.confirm = function() {
        console.log("confirm clicked");
        checkTips();
    };
    
    checkIfUserExistsCallback = function(exists) {
        if (exists) {
            ons.notification.confirm({
                message: 'You have already tipped for round '+ $scope.roundNumber + '. ' + 'Click OK If you want to keep overwrite your tips.',
                modifier: 'material',
                callback: function(idx) {
                    switch (idx) {
                      case 0:
                        break;
                      case 1:
                        app.slidingMenu.setMainPage("round.html", {closeMenu: true});
                        break;
                    }
                }
            });
        }
        else {
            app.slidingMenu.setMainPage("round.html", {closeMenu: true});
        }
    };   
   
    checkTips = function() {
        userID = userIDService.get();
        userName = userService.get();
        roundNumber = roundService.get();
        var TIPS_LOCATION = 'https://flickering-fire-9394.firebaseio.com/tips/' + userID + '/' + userName + '/' + 'round' + roundNumber;
        var tipsRef = new Firebase(TIPS_LOCATION);
        tipsRef.once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        console.log("checkIfTipExists  - " + exists);
        checkIfUserExistsCallback(exists);
      });
    };
    
});