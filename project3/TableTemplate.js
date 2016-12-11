"use_strict";

function TableTemplate() {

}

TableTemplate.fillIn = function(id, dictionary, columnName) {
	var tableElement = document.getElementById(id);
	var i, templateProcessor;

	if (!columnName) {
		templateProcessor = new Cs142TemplateProcessor(tableElement.innerHTML);
		tableElement.innerHTML = templateProcessor.fillIn(dictionary);
	}
	else {
		var rowElements = tableElement.getElementsByTagName("TR");
		var firstRowElement = rowElements[0];
		templateProcessor = new Cs142TemplateProcessor(firstRowElement.innerHTML);
		firstRowElement.innerHTML = templateProcessor.fillIn(dictionary);
		var columns = firstRowElement.getElementsByTagName("TD");
		var columnSelect = -1;
		for (i=0; i < columns.length; i++) {
			if (columns[i].innerHTML === columnName) {
				columnSelect = i;
			}
		}
		if (columnSelect >= 0) {
			for (i=1; i < rowElements.length; i++) {
				var dataElements = rowElements[i].getElementsByTagName("TD");
				templateProcessor = new Cs142TemplateProcessor(dataElements[columnSelect].innerHTML);
				dataElements[columnSelect].innerHTML = templateProcessor.fillIn(dictionary);
			}
		}
	}

	tableElement.style.visibility = "";
};