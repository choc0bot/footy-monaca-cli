var myApp = angular.module('myApp');

//FACTORY

myApp.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){
    var usersRef = new Firebase(FirebaseUrl+'User');
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).name;
      },
      all: users
    };

    return Users;
  });

myApp.factory('userService', function() {
 var savedData = {};
 function set(data) {
   savedData = data;
   console.log("userService saving user" + savedData);
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

});

myApp.factory('userIDService', function() {
 var savedData = {};
 function set(data) {
   savedData = data;
   console.log("userIDService saving user" + savedData);
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

});

myApp.factory('emailService', function() {
 var savedData = window.localStorage.getItem("sendMail");;
 function set(data) {
   savedData = data;
   console.log("emailService saving " + savedData);
 }
 function get() {
  console.log("emailService returning " + savedData);
  return savedData;
 }

 return {
  set: set,
  get: get
 };

});

myApp.factory('userPhotoService', function() {
 var savedData = {};
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 };

});

myApp.factory('deviceIDService', function() {
 var savedDeviceID = {};
 function set(data) {
   savedDeviceID = data;
   console.log('Saved Device ID: '+ savedDeviceID);
 }
 function get() {
  return savedDeviceID;
 }

 return {
  set: set,
  get: get
 };

});

myApp.factory('groupService', function($q) {
 var savedGroup = {};
 function set(data) {
   savedGroup = data;
   console.log('Saved Group: '+ savedGroup);
 }
 function get() {
    return savedGroup;
 };

 return {
  set: set,
  get: get
 };

});

myApp.factory('roundService', function() {
    var savedGroup = {};
    function set(data) {
       savedGroup = data;
       console.log('Saved round: '+ savedGroup);
    }
    function get() {
        return savedGroup;
    };
    return {
      set: set,
      get: get
    };
});

myApp.factory('Groups', function($firebaseArray, $firebaseObject, FirebaseUrl){
    var groupsRef = new Firebase(FirebaseUrl+'group');
    var groups = $firebaseArray(groupsRef);

    var Groups = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){
        return groups.$getRecord(uid).name;
      },
      getGroupName: function(uid){
        return groups.$getRecord(uid).deviceID;
      },
      all: groups
    };

    return Groups;
    
  });

myApp.factory('tipsFB', ["userService","roundService","FirebaseUrl" ,"$firebaseArray",
  function (userService,roundService,FirebaseUrl, $firebaseArray) {
  //create, retrieve, update, destroy data from angularfire 
  userName = userService.get();
  roundNumber = roundService.get();
  console.log("tips for "+ userName);
  var ref = new Firebase(FirebaseUrl+ 'tips' + '/' + userName+ '/' + 'round' + roundNumber);
  var tips = $firebaseArray(ref);

  return tips;  
  
 }]);
  
myApp.factory('resultsFB', ["roundService","FirebaseUrl" ,"$firebaseArray",
  function (roundService,FirebaseUrl, $firebaseArray) {
  //create, retrieve, update, destroy data from angularfire 
  roundNumber = roundService.get();
  console.log('results '+roundNumber);
  var ref = new Firebase(FirebaseUrl+ 'results' + '/' + 'round' + roundNumber);
  var results = $firebaseArray(ref);

  return results;

  }]);
