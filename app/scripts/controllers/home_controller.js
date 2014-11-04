;(function() {
    'use strict';
    angular
        .module('app.controllers')
        .controller('HomeController', [
            '$scope',
            'ngDialog',
            '$state',
            'UserService',
            'FeedService',
            '$rootScope',
            '$sce',
            homeCtrl
        ]);

        function homeCtrl($scope, ngDialog, $state, UserService, FeedService, $rootScope, $sce) {
          //loadFeeds here
          loadFeeds(FeedService, 1, $sce);
          $scope.createNewFeed = function() {
              ngDialog.open({
                  template: 'views/partials/create-new-feed.html',
                  controller: 'CreateNewFeedController'
              });
          };
          UserService.currentUser()
            .then(function(user) {
              $scope.currentUser = user;
            });
          $scope.logOut = function() {
            UserService.logOut();
            $state.go('welcome');
          }

          $rootScope.$on('feed:new', function() {
            loadFeeds(FeedService, 1, $sce);
          });

          function loadFeeds(FeedService, page, $sce) {
            FeedService.findAllFeed(page)
              .then(function(feeds) {
                var feedsArr = [];
                angular.forEach(feeds, function(feed) {
                  var feedInfo = {};
                  feedInfo.author = feed.get('author').toJSON();
                  feedInfo.feed = feed.toJSON();
                  console.log(feedInfo.feed);
                  if (feedInfo.feed.video) {
                    feedInfo.feed.video.config = {
                      theme: {
                        url: 'bower_components/videogular-themes-default/videogular.css'
                      },
                      sources: [
                        {src: $sce.trustAsResourceUrl(feedInfo.feed.video.url), type: 'video/mp4'},
                        {src: $sce.trustAsResourceUrl(feedInfo.feed.video.url), type: 'video/webm'},
                        {src: $sce.trustAsResourceUrl(feedInfo.feed.video.url), type: 'video/ogg'}
                      ]
                    }
                  }
                  feedsArr.push(feedInfo);
                });
                $scope.feeds = feedsArr;
                console.log($scope.feeds);
              });
          }
        }

})();