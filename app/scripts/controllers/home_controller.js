;(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('HomeController', [
            '$scope',
            'ngDialog',
            '$state',
            'UserService',
            homeCtrl
        ]);

        function homeCtrl($scope, ngDialog, $state, UserService) {
          $scope.createNewFeed = function() {
              ngDialog.open({
                  template: 'views/partials/create-new-feed.html',
                  controller: 'CreateNewFeedController'
              });
          };
          $scope.currentUser = UserService.currentUser();
        }


})();