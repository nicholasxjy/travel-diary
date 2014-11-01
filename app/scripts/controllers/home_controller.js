;(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('HomeController', [
            '$scope',
            'ngDialog',
            '$state',
            '$rootScope',
            'UserService',
            homeCtrl
        ]);

        function homeCtrl($scope, ngDialog, $state, $rootScope, UserService) {
          $scope.createNewFeed = function() {
              ngDialog.open({
                  template: 'views/partials/create-new-feed.html',
                  controller: 'CreateNewFeedController'
              });
          };
          $scope.currentUser = getCurrentUser(UserService);
        }

        function getCurrentUser(UserService) {
          var currentUser = UserService.currentUser();
          var cUser = {
            id: currentUser.id,
            username: currentUser.attributes.username,
            email: currentUser.attributes.email,
            createdAt: currentUser.createdAt,
            gender: currentUser.attributes.gender,
            location: currentUser.attributes.location,
            profile: currentUser.attributes.profile,
            avatar: currentUser.attributes.avatar || 'images/default.jpg'
          };
          return cUser;
        }
})();