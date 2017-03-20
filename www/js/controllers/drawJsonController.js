// This is a JavaScript file

myApp.controller('drawJson', ["$scope", "$http", "userService", "userIDService", "roundService", "emailService", "FirebaseUrl", "$firebaseArray",
function($scope, $http, userService, userIDService, roundService, emailService, FirebaseUrl, $firebaseArray) {
    $scope.roundNumber = roundService.get();
    $http.get('draw2016.json', { cache: true}).then(function(res){
            $scope.draw = res.data;    
            //drawJSON=data;
            console.log("drawjson assigned!!!");  
    //return $scope.draw;
    }, 
    function errorCallback(response) {
        console.log("error - "+ response);
    });
    
    $scope.roundNumber = roundService.get();
    
    //$scope.roundNumber = function(){
    //    rNumber = 1;
        //console.log("rNumber = "+ rNumber);
    //    return rNumber;
    //};
    
    $scope.userName = function(){
        return userService.get();
    };
    
    $scope.roundLength = function(){
        var rNumber = roundService.get();
        if ($scope.draw) {
            var drawJson = $scope.draw;
            var count = 0;
            for(var i = 0; i < drawJson.length; ++i){   
                if(drawJson[i].round === rNumber)
                    count++;
            }
            return count;
        }
    };
    
    
    $scope.roundNumberFull = function(){
        var currentTime = Date();
        //var currentTime = "2016-06-14 08:25:00";

        var cDate = Date.parse(currentTime);
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
                i++;
                }
            }
            
            rNumber = $scope.draw[i].round;
            //console.log("rNumber = "+ rNumber);
            $scope.rNumber = rNumber;
            return rNumber;
        }
    };
    
    $scope.selections = [];
    $scope.activeIndex = 0;
    $scope.hideResults = true;
    $scope.mediaStatus = 4;
    
    $scope.next = function (team) {
        if ($scope.mediaStatus === 4) {
            //$scope.homeclass = "selected";
            // START PLAY AUDIO FUCNTION
            var src = team+".mp3";
            //Get Android path
            var path = window.location.pathname;
            path = path.substr( path, path.length - 10 );
            path = 'file://' + path;
            console.log(src);

            // Play the audio file at url
            var my_media = new Media(path+src,
            // success callback
            function () { console.log("playAudio():Audio Success"); },
            // error callback
            function (err) { console.log("playAudio():Audio Error: " + JSON.stringify(err)); },
            function (status) {
                $scope.mediaStatus = status;
                console.log("Currentmedia State - "+ status); }
            );
            
            console.log("Round Length is " + $scope.roundLength());
    
            // Play audio
            //var playTime = my_media.getDuration();
            //console.log(team+" audio duration - "+ playtime);
            my_media.play();
            
            // END PLAY AUDIO FUCNTION
                if ($scope.activeIndex === ($scope.roundLength() -1 ) ) {
                    $scope.activeIndex = $scope.activeIndex + 1;
                    $scope.hideResults = false;
                } else {
                    $scope.activeIndex = $scope.activeIndex + 1;
                    //$scope.homeclass = "";
                }
            var resultsDiv = angular.element(document.querySelector('#results'));
            $scope.selections.push(team);
        };
    };
    

    
    $scope.savetips = true;
    $scope.saveMessage = false;
    $scope.sendMessage = false;
    $scope.saveTips = function() {
        $scope.savetips = false;
        $scope.saveMessage = true;
        newName = userService.get();
        userID = userIDService.get();
        roundNumber = roundService.get();
        console.log("savetips");
        console.log("tips for "+ newName);
        fbURL = FirebaseUrl+ 'tips' + '/' + userID + '/' + newName + '/' + 'round' + roundNumber;
        console.log("save tips to "+fbURL);
        var ref = new Firebase(fbURL);
        response = ref.remove();
        console.log("removing existing at  "+fbURL);
        var tips = $firebaseArray(ref);
        $scope.tipArray = tips;
        var arrayLength = $scope.selections.length;
        for (var i = 0; i < arrayLength; i++) {
            $scope.tipArray.$add({team_id: $scope.selections[i]});
            //alert(myStringArray[i]);
            //Do something
        }
    };
    
    $scope.sendtips = true;
    $scope.sendMessage = false;
    $scope.sendTips = function() {
        $scope.sendtips = false;
        $scope.sendMessage = true;
        $scope.saveMessage = false;
        user = userService.get();
        email = emailService.get();
        var arrayLength = $scope.selections.length;
        tip_email = "";
        for (var i = 0; i < arrayLength; i++) {
            tip_email = tip_email.concat($scope.selections[i] + "\r\n");
        }
        ebody = encodeURIComponent(tip_email);
        window.location = "mailto:"+ email + "?subject=tips for " + user + " - Round " + $scope.roundNumber + "&body="+ ebody;
    };
    
    $scope.resetTips = function() {
        console.log("resettips");
        $scope.selections = [];
        $scope.activeIndex = 0;
        $scope.hideResults = true;
        $scope.mediaStatus = 4;
        app.slidingMenu.setMainPage("round.html", {closeMenu: true});
    };

    
}]);
