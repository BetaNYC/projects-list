var directiveModule = window.angular.module('ngff.directives', [])
//These are from TodoMVC, so rad
.directive('squareFocus', function squareFocus($timeout) {

	return function (scope, elem, attrs) {
		scope.$watch(attrs.squareFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
					
				}, 0, false);
			}
		});
	};
})


.directive('squareEscape', function () {
	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;
	var TAB_KEY= 9
	return function (scope, elem, attrs) {
		elem.bind('keydown', function (event) {
			console.log(event.keyCode);
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.squareEscape);
			}
			if((event.keyCode === ENTER_KEY)||(event.keyCode === TAB_KEY)){
				elem[0].blur();
			}
		});
	};
})

.directive('squareToggle',function($timeout){
	return{
		restrict: 'A',
		replace: true
	}

})

;

;