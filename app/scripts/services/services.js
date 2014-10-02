/**
 * Created by nicholas_xue on 14/10/2.
 */
var app = angular.module('app.services', []);

app.factory('UserService', ['$q','avoscloud', function($q, avoscloud) {
    var userService = {};
    console.log(avoscloud);
    userService.signUp = function(userinfo) {
        var defer = $q.defer();
        avoscloud.users.save({}, {
            username: userinfo.name,
            email: userinfo.email,
            password: userinfo.password
        }, function(res) {
            avoscloud.users.get({objectId: res.objectId}, function(res) {
                res.status = 'success';
                defer.resolve(res);
            }, function(err) {
                defer.reject(err);
            });
        }, function(err) {
            defer.reject(err);
        });
        return defer.promise;
    };

    userService.login = function(userinfo) {
        var defer = $q.defer();
        avoscloud.login.get({
            username: userinfo.name,
            password: userinfo.password
        }, function(res) {
            res.status = 'success';
            defer.resolve(res);
        }, function(err) {
            defer.reject(err);
        });

        return defer.promise;
    }
    return userService;

}]);