(function() {
  angular
    .module('app.services')
    .factory('FeedService', ['$http', '$q', function($http, $q) {
      var feedService = {
        create: create,
        findAllFeed: findAllFeed,
        findFeedByUser: findFeedByUser
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
              if (file.type.indexOf('video') > -1) {
                feed.set('video', avFile);
              }
              if (file.type.indexOf('image') > -1) {
                feed.set('photo', avFile);
              }
              if (file.type.indexOf('audio') > -1) {
                feed.set('audio', avFile);
              }
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

      function findAllFeed(currentPage) {
        var deferred = $q.defer();
        var Feed = AV.Object.extend('Feed');
        var query = new AV.Query(Feed);
        var page = currentPage || 1;
        var skip = (page - 1)*10;
        query.limit(10);
        query.skip(skip);
        query.descending('createdAt');
        query.include('author');
        query.find({
          success: function(feeds) {
            deferred.resolve(feeds);
          },
          error: function(error) {
            deferred.reject(error.message);
          }
        });
        return deferred.promise;
      }

      function findFeedByUser(user, currentPage) {
        var deferred = $q.defer();
        var page = currentPage || 1;
        var skip = (page -1)*10;
        var Feed = AV.Object.extend('Feed');
        var query = new AV.Query(Feed);
        query.equalTo('author', user);
        query.limit(10);
        query.skip(skip);
        query.descending('createdAt');
        query.find({
          success: function(feeds) {
            deferred.resolve(feeds);
          },
          error: function(error) {
            deferred.reject(error.message);
          }
        });
        return deferred.promise;
      }
    }]);
})();