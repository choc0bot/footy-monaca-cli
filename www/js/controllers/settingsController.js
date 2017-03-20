var myApp = angular.module('myApp');

myApp.controller("setting", function($scope, Users, userService, userIDService, groupService, userPhotoService, emailService, FirebaseUrl) {
    $scope.loading = true;
    //$scope.groupName = groupService.get();
        $scope.groupName = groupService.get();
        $scope.userName = userService.get();
        $scope.userID = userIDService.get();
        $scope.userPhoto = userPhotoService.get();
        $scope.email = emailService.get();
        $scope.users = Users.all;
        
        $scope.submitEmail = function() {
            var newEmail = $scope.newEmail;
            window.localStorage.email = newEmail;
            window.localStorage.setItem("sendMail", newEmail);
            console.log("set email "+ newEmail);
            $scope.email = newEmail;
            emailService.set(newEmail);
            app.slidingMenu.setMainPage("setting.html", {closeMenu: true});
        };
        
        $scope.deleteUser = function () {
            ons.notification.confirm({
                message: 'Are you sure delete this user and all ther data?',
                modifier: 'material',
                callback: function(idx) {
                    switch (idx) {
                      case 0:
                        break;
                      case 1:
                        fbURL = FirebaseUrl+ 'User' + '/' + $scope.userID;
                        var ref = new Firebase(fbURL);
                        response = ref.remove();
                        console.log("removing existing user at  "+fbURL);
                        app.slidingMenu.setMainPage("users.html", {closeMenu: true});
                        break;
                    }
                }
            });
        };
});
