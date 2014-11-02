/**
 * Created by nicholas_xue on 14/10/2.
 */
 (function() {
  'use strict';
  angular
    .module('app.services')
    .factory('UserService', ['$http', '$q', function ($http, $q) {
      var userService = {
        signUp: signUp,
        logIn: logIn,
        updateInfo: updateUserInfo,
        currentUser: currentUser,
        logOut: logOut
      };
      return userService;
      function signUp(info) {
        var deferred = $q.defer();
        var user = new AV.User();
        user.set('username', info.username);
        user.set('password', info.password);
        user.set('email', info.email);
        //this info set to be default when new user sign up
        user.set('location', 'other');
        user.set('gender', 'secret');
        user.set('profile', 'No profile yet!');
        user.signUp(null, {
          success: function(user) {

            deferred.resolve(getCurrentUser(user));
          },
          error: function(user, error) {
            deferred.reject(error.message);
          }
        });
        return deferred.promise;
      }

      function logIn(info) {
        var deferred = $q.defer();
        AV.User.logIn(info.username, info.password, {
          success: function(user) {
            deferred.resolve(getCurrentUser(user));
          },
          error: function(user, error) {
            deferred.reject(error.message);
          }
        });
        return deferred.promise;
      }

      function currentUser() {
        var deferred = $q.defer();
        var user = AV.User.current();
        var query = new AV.Query(AV.User);
        query.equalTo('objectId', user.objectId);
        query.find({
          success: function(users) {
            if (users && users.length > 0) {
              deferred.resolve(getCurrentUser(users[0]));
            } else {
              deferred.reject('find cuser after updating error.');
            }
          }
        });
        return deferred.promise;
      }

      function logOut() {
        AV.User.logOut();
      }

      function updateUserInfo(info) {
        var deferred = $q.defer();
        var user = AV.User.current();
        user.fetchWhenSave(true);
        user.set('gender', info.gender);
        user.set('location', info.location);
        user.set('profile', info.profile);
        user.save();
        var query = new AV.Query(AV.User);
        query.equalTo('username', info.username);
        query.find({
          success: function(users) {
            if (users && users.length > 0) {
              deferred.resolve(getCurrentUser(users[0]));
            } else {
              deferred.reject('find user error after updating');
            }
          }
        });
        return deferred.promise;
      }

      function getCurrentUser(user) {
        var cUser = {
          id: user.id,
          username: user.attributes.username,
          email: user.attributes.email,
          createdAt: user.createdAt,
          gender: user.attributes.gender,
          location: user.attributes.location,
          profile: user.attributes.profile,
          avatar: user.attributes.avatar || 'images/default.jpg'
        };
        return cUser;
      }
    }]);
 })();