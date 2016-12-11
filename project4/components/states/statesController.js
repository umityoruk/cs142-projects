/**
 * Define StatesController for the states component of CS142 project #4
 * problem #2.  The model data for this view (the states) is available
 * at window.cs142models.statesModel().
 */

"use_strict";

cs142App.controller('StatesController', ['$scope', function($scope) {

   // Replace this with the code for CS142 Project #4, Problem #2
   console.log('window.cs142models.statesModel()', window.cs142models.statesModel());

   var getStatesWithSubstring = function(states, substring) {
   		var re = new RegExp(substring, "i");
   		var output = [];
   		for (var i=0; i < states.length; i++) {
   			if (states[i].search(re) >= 0) {
   				output.push(states[i]);
   			}
   		}
   		return output;
   };

   $scope.states = {};
   $scope.states.substring = "";

   var allStates = window.cs142models.statesModel();
   $scope.$watch('states.substring', function () {
   		$scope.states.statesList = getStatesWithSubstring(allStates, $scope.states.substring);	
   });

}]);
