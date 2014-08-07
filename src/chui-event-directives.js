///////////////////////////////////////////////////
// Create directives for ChocolateChip-UI gestures.
///////////////////////////////////////////////////
/*

This module provides the following directives:

cc-tap
cc-singletap
cc-longtap
cc-doubletap
cc-swipe
cc-swipeleft
cc-swiperight
cc-swipeup
cc-swipedown


You can import this module into your app however you like.
Then you can inject the even directives you need into your module.
You'll need to convert their names from hyphenated to camel case.
Only the first letter of the event gets capitalized:

var app = angular.module('MyApp', ['ccSingletap', 'ccDoubletap', 'ccSwiperight']);

You can then use the directives in your templates like this:

<li ng-repeat="item in list" cc-singletap='respondToSingleTap(item)' cc-swiperight='respondeToSwipe(item)'></li>

You might have these scope methods defined as follows:

app.controller('MyCtrl', function($scope){
  $scope.respondToSingleTap = function(item) {
    alert('You single tapped on: ' + item)
  };
  $scope.respondToSwipe = function(item) {
    alert('You swiped on: ' + item)
  };
});

*/

///////////////////////////////////////////
// Iterate over array of avaialable events.
///////////////////////////////////////////
['tap', 'singletap', 'longtap', 'doubletap', 'swipe', 'swipeleft', 
'swiperight', 'swipeup', 'swipedown'].forEach(function(gesture) {

  // Camel Case each directive:
  //===========================
  var ccGesture = 'cc' + (gesture.charAt(0).toUpperCase() + gesture.slice(1));

  // Create module for each directive:
  //==================================
  angular.module(ccGesture,[]).directive(ccGesture, ['$parse',
    function($parse) {
      return {
        // Restrict to attribute:
        restrict: 'A',
        compile: function ($element, attr) {
          // Define the attribute for the gesture:
          var fn = $parse(attr[ccGesture]);
          return function ngEventHandler(scope, element) {
            // Register event for directive:
            $(element).on(gesture, function (event) {
              scope.$apply(function () {
                fn(scope, {$event: event});
              });
            });
          };
        }
      };
    }
  ]);
});