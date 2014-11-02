(function() {
  angular
    .module('app.services')
    .factory('FeedService', ['$http', '$q', function($http, $q) {
      var feedService = {
        create: create
      };
      return feedService;

      function create(feedInfo) {
        var deferred = $q.defer();
        var Feed = AV.Object.extend('Feed');
        var feed = new Feed();
        var content = feedInfo.content;
        feed.set('author', AV.User.current());
        feed.set('content', content);
        if (feedInfo.files && feedInfo.files.length > 0) {
          var files = feedInfo.files;
          angular.forEach(files, function(file, index) {
            var name = file.name;
            var avFile = new AV.File(name, file);
            avFile.save().then(function() {
              feed.set('photo', avFile);
              feed.save(null, {
                success: function(newFeed) {
                  deferred.resolve(newFeed);
                },
                error: function(newFeed, error) {
                  deferred.reject(error.message);
                }
              });
            }, function(error) {
              deferred.reject(error.message);
            });
          });
        } else {
          feed.save(null, {
            success: function(newFeed) {
              deferred.resolve();
            },
            error: function(newFeed, error) {
              deferred.reject(error.message);
            }
          });
        }
        return deferred.promise;
      }
    }]);
})();