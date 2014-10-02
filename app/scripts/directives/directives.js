var app = angular.module('app.directives', []);

app.directive('tipShow', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(element).focus(function() {
				var popover = $(this).parent();
				popover.popover('show');
				$timeout(function() {
					popover.popover('hide');
				}, 2000);
			});
		}
	}
}]);