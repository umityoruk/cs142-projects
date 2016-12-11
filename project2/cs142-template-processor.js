"use_strict";

function Cs142TemplateProcessor(template) {
	this.template = template;
	this.fields = [];
	this.sections = [];
	var sectionBegin = 0;
	if (typeof template === "string") {
		var re = /{{[^{}]*}}/g;
		while (true) {
			var field = re.exec(template);
			if (!field) {
				break;
			}
			var fieldName = field[0].slice(2, -2);
			var section = template.slice(sectionBegin, field.index);
			sectionBegin = field.index + field[0].length;
			this.fields.push(fieldName); 
			this.sections.push(section);
		}
		this.sections.push(template.slice(sectionBegin));
	}
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
	var filledInStr = this.sections[0];
	for (var i=0; i < this.fields.length; i++) {
		var fieldName = this.fields[i];
		var fieldVal = "";
		if (fieldName in dictionary) {
			fieldVal = dictionary[fieldName];
		} 
		filledInStr += fieldVal + this.sections[i+1];
	}
	return filledInStr;
};