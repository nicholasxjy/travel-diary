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
            '$sce',
            userCtrl
        ]);

        function userCtrl($scope, ngDialog, $state, UserService, FeedService, $stateParams, $sce) {
            var userid = $stateParams.id;
            console.log(userid);
            UserService.findUserById(userid)
                .then(function(user) {
                    FeedService.findFeedByUser(user)
                        .then(function(feeds) {
                            var feedsArr = [];
                            angular.forEach(feeds, function(feed) {
                              var feedInfo = {};
                              feedInfo.author = feed.get('author').toJSON();
                              feedInfo.feed = feed.toJSON();
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
                              if (feedInfo.feed.audio) {
                                feedInfo.feed.audio.config = {
                                  theme: {
                                    url: 'bower_components/videogular-themes-default/videogular.css'
                                  },
                                  sources: [
                                    {src: $sce.trustAsResourceUrl(feedInfo.feed.audio.url), type: "audio/mpeg"},
                                    {src: $sce.trustAsResourceUrl(feedInfo.feed.audio.url), type: "audio/ogg"},
                                  ]
                                }
                              }
                              feedsArr.push(feedInfo);
                            });
                            $scope.feeds = feedsArr;
                            console.log($scope.feeds);
                        })
                })
        }
})();