//Clears the Form
function clearForm(){
	//Removes formSpace Div from Body
	var formSpace = document.getElementById("datafield");
	formWrapper.removeChild(formSpace);
	
	//Resets Global Counter
	i = 0;
	
	//Enables Form Creation Buttons and Disables the Clear Buttons
	entryButton.disabled = false;
	viewButton.disabled = false;
	clearButton.disabled = true;
}