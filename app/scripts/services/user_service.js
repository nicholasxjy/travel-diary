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
        user.signUp(null, {
          success: function(user) {
            deferred.resolve(user);
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
            deferred.resolve(user);
          },
          error: function(user, error) {
            deferred.reject(error.message);
          }
        });
        return deferred.promise;
      }

      function currentUser() {
        return AV.User.current();
      }

      function logOut() {
        AV.User.logOut();
      }
    }]);
 })();