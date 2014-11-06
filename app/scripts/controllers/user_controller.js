(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('UserController', [
            '$scope',
            'ngDialog',
            '$state',
            'UserService',
            'FeedService',
            '$stateParams',
            userCtrl
        ]);

        function userCtrl($scope, ngDialog, $state, UserService, FeedService, $stateParams) {
            var userid = $stateParams.id;
            console.log(userid);
            UserService.findUserById(userid)
                .then(function(user) {
                    FeedService.findFeedByUser(user)
                        .then(function(feeds) {
                            console.log(feeds);
                        })
                })
        }
})();