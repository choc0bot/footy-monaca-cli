var myApp = angular.module('myApp');

myApp.controller("tipsDB", ["$scope", "$route", "$timeout", "tipsFB", "resultsFB", "userService", "userIDService", "roundService","FirebaseUrl" ,"$firebaseArray",
    function($scope, $route, $timeout, tipsFB, resultsFB, userService, userIDService, roundService, FirebaseUrl , $firebaseArray) {
    $scope.loading = true;
    $scope.enterTips = false;
    $scope.userName = userService.get();
    $scope.uID = userIDService.get();
    $scope.roundNumber= roundService.get();
    
    //set initial tips to show
    $scope.pRound = false;
    $scope.tRound = true;
    
    getWinners = function(obj, tips) {
        results = obj;
        winners = [];
        console.log("getting results...");
        console.log("getting results tip length " + tips.length);
        console.log("getting results results length " + results.length);
        if (tips.length === 0) {
            return winners;
            $scope.enterTips = false;
        }
        if (results.length === 0) {
            $scope.enterTips = true;
            for(var i = 0; i < tips.length; i++){   
                winners.push({team: tips[i].team_id});
            }
        }
        else {
            $scope.enterTips = true;
            for(var i = 0; i < tips.length; i++){
                if (results[i]) {
                    var s = results[i];
                    var n = s.match.indexOf(' ');
                    winteam = s.match.substring(0, n != -1 ? n : s.length);
                    if (winteam === tips[i].team_id) {
                        winners.push({team: tips[i].team_id, result: 'check'});
                    }
                    else {
                        winners.push({team: tips[i].team_id, result: 'times'});
                    }
                }
                else {
                    winners.push({team: tips[i].team_id});
                }
                    
            }
        }
        return winners;
    };
    
    var fburl = FirebaseUrl+ 'tips' + '/' + $scope.uID + '/' + userName + '/' + 'round' + roundNumber;
    var ref = new Firebase(fburl);
    var FBtips = $firebaseArray(ref);
    $scope.tips = [];
    $scope.tips = FBtips;
    var obj = resultsFB;
    $scope.winners = [];
    
    obj.$loaded().then(function() {
        $scope.winners = getWinners(obj, $scope.tips);
        var rNumber = roundNumber - 1;
        var prevFBurl = FirebaseUrl+ 'tips' + '/' + $scope.uID + '/' + userName + '/' + 'round' + rNumber;
        var prevRef = new Firebase(prevFBurl);
        var prevFBtips = $firebaseArray(prevRef);
        prevTips = [];
        prevTips = prevFBtips;
        var resultRef = new Firebase(FirebaseUrl+ 'results' + '/' + 'round' + rNumber);
        var prevResults = $firebaseArray(resultRef);
        var prevObj = prevResults;
        $scope.previousWinners = [];
        prevObj.$loaded().then(function() {
            $scope.previousWinners = getWinners(prevObj, prevTips);
        });
        $scope.loading = false;
    });
    
    console.log('$scope.userName - '+ $scope.userName);
    var name = $scope.userName;
    var resultUrl = fburl.split("/");
    
    //waatch for user change and refresh winners array with corect user
    $scope.$watch(
        // This function returns the value being watched. It is called for each turn of the $digest loop
        function() { return $scope.userName; },
        // This is the change listener, called when the value returned from the above function changes
        function(newValue, oldValue) {
            console.log("watch values "+newValue +" "+ resultUrl[4]);
            if ( newValue !== resultUrl[4] ) {
                console.log("Watch triggered");
                $timeout(function () {
                // 0 ms delay to reload the page.
                    console.log("Reload triggered");
                    $scope.$apply(function(){
                        console.log("Apply scope reload");
                        //$scope.$apply;
                        //$route.reload();
                        $scope.loading = true;
                        var fburl = FirebaseUrl+ 'tips' + '/' + $scope.uID + '/' + $scope.userName + '/' + 'round' + roundNumber;
                        console.log("getting tips form "+ fburl);
                        var ref = new Firebase(fburl);
                        var FBtips = $firebaseArray(ref);
                        $scope.tips = [];
                        tipsObj = FBtips;
                        var obj = resultsFB;
                        $scope.winners = [];
                        tipsObj.$loaded().then(function() {
                            $scope.tips = tipsObj;
                            obj.$loaded().then(function() {
                                $scope.winners = getWinners(obj, $scope.tips);
                                //get previous round
                                var rNumber = roundNumber - 1;
                                var prevFBurl = FirebaseUrl+ 'tips' + '/' + $scope.uID + '/' + $scope.userName + '/' + 'round' + rNumber;
                                console.log("getting tips form "+ prevFBurl);
                                var prevRef = new Firebase(prevFBurl);
                                var prevFBtips = $firebaseArray(prevRef);
                                prevTips = [];
                                prevTipsObj = prevFBtips;
                                var resultRef = new Firebase(FirebaseUrl+ 'results' + '/' + 'round' + rNumber);
                                var prevResults = $firebaseArray(resultRef);
                                var prevObj = prevResults;
                                $scope.previousWinners = [];
                                prevTipsObj.$loaded().then(function() {
                                    prevTips = prevTipsObj;
                                    prevObj.$loaded().then(function() {
                                        $scope.previousWinners = getWinners(prevObj, prevTips);
                                    });
                                });
                                $scope.loading = false;
                            });
                        });
                    });
                },0);
            }
        }
    );
    
    $scope.thisRound = function() {
        $scope.roundNumber = roundService.get();
        console.log("Round number "+$scope.roundNumber);
        $scope.pRound = false;
        $scope.tRound = true;
    };
    $scope.previousRound = function() {
        var rNumber = roundService.get();
        $scope.roundNumber = parseInt(rNumber, 8) - 1;
        $scope.pRound = true;
        $scope.tRound = false;
    };
    }
]);