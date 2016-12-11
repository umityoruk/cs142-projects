"use_strict";

function DatePicker(id, fixedDateCallback) {
	this.id = id;
	this.fixedDateCallback = fixedDateCallback;
	this.date = new Date();
	this.fixedDate = null;
	this.render(this.date);
}

DatePicker.prototype.prevMonth = function() {
	console.log("prevMonth");
	var month = this.date.getMonth();
	var year = this.date.getFullYear();
	month -= 1;
	if (month < 0) {
		year -= 1;
		month += 12;
	}
	this.date.setDate(1);
	this.date.setMonth(month);
	this.date.setFullYear(year);
	this.render(this.date);
};

DatePicker.prototype.nextMonth = function() {
	console.log("nextMonth");
	var month = this.date.getMonth();
	var year = this.date.getFullYear();
	month += 1;
	if (month > 11) {
		year += 1;
		month -= 12;
	}
	this.date.setDate(1);
	this.date.setMonth(month);
	this.date.setFullYear(year);
	this.render(this.date);
};

DatePicker.prototype.selectDate = function(selectedDate) {
	this.date.setDate(selectedDate);
	this.fixedDate = {"month": this.date.getMonth() + 1, 
					 "day": this.date.getDate(),
					 "year": this.date.getFullYear()};
	this.fixedDateCallback(this.id, this.fixedDate);
	this.render(this.date);
};


DatePicker.prototype.render = function(renderDate) {
	this.date = renderDate;
	var that = this;
	var i;
	var element = document.getElementById(this.id);
	element.innerHTML = "";

	var rDate = renderDate.getDate();
	var rMonth = renderDate.getMonth();
	var rYear = renderDate.getFullYear();

	var displayDate = new Date();
	displayDate.setFullYear(rYear);
	displayDate.setMonth(rMonth);

	/*Add header and days of the week*/
	var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
				  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var headerStr = months[rMonth] + ' ' + rYear;


	var tableElem, tableRow, tableData;
	tableElem = document.createElement('TABLE');
	tableElem.setAttribute("class", "datepickertable");
	element.appendChild(tableElem);
	tableRow = document.createElement('TR');
	tableElem.appendChild(tableRow);
	var prevButton = document.createElement('TD');
	prevButton.setAttribute("class", "prevmonthbutton");
	prevButton.onclick = function () { 
		that.prevMonth();
	};
	prevButton.innerHTML = "<";
	tableRow.appendChild(prevButton);
	var datepickerheader = document.createElement('TD');
	datepickerheader.setAttribute("colspan", "5");
	datepickerheader.innerHTML = headerStr;
	tableRow.appendChild(datepickerheader);
	var nextButton = document.createElement('TD');
	nextButton.setAttribute("class", "nextmonthbutton");
	nextButton.onclick = function () { 
		that.nextMonth();
	};
	nextButton.innerHTML = ">";
	tableRow.appendChild(nextButton);

	tableRow = document.createElement('TR');
	tableRow.setAttribute("class", "daysoftheweek");
	tableElem.appendChild(tableRow);
	for (i=0; i < daysOfTheWeek.length; i++) {
		tableData = document.createElement('TD');
		tableData.innerHTML = daysOfTheWeek[i];
		tableRow.appendChild(tableData);
	}

	/*Render the weeks*/
	var currentDate = 1;
	displayDate.setDate(currentDate);
	var firstDay = displayDate.getDay();
	if (firstDay !== 0) {
		tableRow = document.createElement('TR');
		tableElem.appendChild(tableRow);
		displayDate.setDate(1-firstDay);
		for (i=0; i < firstDay; i++) {
			tableData = document.createElement('TD');
			tableData.setAttribute("class", "inactivedate");
			tableData.innerHTML = displayDate.getDate();
			tableRow.appendChild(tableData);
			displayDate.setDate(displayDate.getDate() + 1);
		}
	}

	while (currentDate === displayDate.getDate()) {
		var currentDay = displayDate.getDay();
		if (currentDay === 0) {
			tableRow = document.createElement('TR');
			tableElem.appendChild(tableRow);
		}
		tableData = document.createElement('TD');
		tableRow.appendChild(tableData);
		if (this.fixedDate && 
			rMonth === this.fixedDate.month-1 && 
			rYear === this.fixedDate.year && 
			currentDate === this.fixedDate.day) {
			tableData.setAttribute("class", "selectdate");
		}
		tableData.innerHTML = currentDate;
		tableData.onclick = (function (selectedDate) {
			return function() {
				that.selectDate(selectedDate);
			};
		})(currentDate);
		currentDate += 1;
		displayDate.setDate(currentDate);
	}
	var lastDay = displayDate.getDay();
	if (lastDay !== 0) {
		for (i=0; i < 7-lastDay; i++) {
			tableData = document.createElement('TD');
			tableData.setAttribute("class", "inactivedate");
			tableData.innerHTML = i + 1;
			tableRow.appendChild(tableData);
		}
	}
};