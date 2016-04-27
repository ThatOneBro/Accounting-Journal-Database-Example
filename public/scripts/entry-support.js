//Creates Remove Button
function createRemove(par, line){
	var removeLine = document.createElement("input");
    
	removeLine.type = "button";
	removeLine.name = "remove-line";
	removeLine.id = "remove-line" + line;
	removeLine.value = "-";
    removeLine.className = "button remove-button";
	removeLine.onclick = function(){clearLine(i - 1)};
	par.appendChild(removeLine);
}

//Creates Add Button
function createAdd(par){
	var addLine = document.createElement("input");
	var f = document.getElementById("gend-form");
	
	addLine.type = "button";
	addLine.name = "add-line";
	addLine.id = "add-line" + i;
	addLine.value = "+";
	addLine.className = "button add-button";
	addLine.onclick = function(){makeEntryForm()};
	par.appendChild(addLine);
}

//Removes Add Button from Previous Row
function removeOldAdd(valueToRemove, par){
	var oldAdd = document.getElementById("add-line" + valueToRemove);
	document.getElementById(par).removeChild(oldAdd);
}