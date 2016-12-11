"use_strict";

var cs142MakeMultiFilter = function (arr) {
	var originalArr = arr;
	var currentArr = arr;
	var arrayFilterer = function (filter, callback) {
		if (typeof filter !== "function") {
			return currentArr;
		}
		var filteredArr = [];
		var arrayLength = currentArr.length;
		for (var i=0; i < arrayLength; i++) {
			var value = currentArr[i];
			if (filter(value)) {
				filteredArr.push(value);
			}
		}
		currentArr = filteredArr;
		if (typeof callback === "function") {
			callback.call(originalArr, currentArr);
		}
		return arrayFilterer;
	};
	return arrayFilterer;
};