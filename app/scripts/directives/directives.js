var app = angular.module('app.directives', []);

app.directive('photoDropzone', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			
		}
	}
});

app.directive('scrollBlurEffect', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$(window).scroll(function() {
				var oVal;
				oVal = $(window).scrollTop()/190;
				element.css('opacity', oVal);
			})
		}
	}
})