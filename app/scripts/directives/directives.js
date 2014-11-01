(function() {
	'use strict';
	angular
		.module('app.directives', [
		])
		.directive('photoDropzone', function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {

				}
			}
		})
		.directive('scrollBlurEffect', function() {
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
})();