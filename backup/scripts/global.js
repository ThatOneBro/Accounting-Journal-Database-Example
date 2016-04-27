//Global Variables; see loadForm()
var htmlBody;
var formWrapper;
var entryButton;
var viewButton;
var clearButton;

//Current Date and Format
var today = new Date();
var mm = today.getMonth() + 1;
var dd = today.getDate();
var yyyy = today.getFullYear();
if (mm < 10){
	mm = "0" + mm;
}
if (dd < 10){
	dd = "0" + dd;
}
var currentDate = yyyy + "-" + mm + "-" + dd;

//List of Journal Accounts; see 'account' element in makeEntryForm()
var accountList = ["Cash","Prepaid Insurance","Inventory","Supplies","Land","Equipment","Accounts Receivable","Notes Payable","Accounts Payable","Unearned Revenue","Common Stock","Paid-in Capital"];

//Global Counter
var i = 0;

//Post-Load Definitions
function loadForm(){
	htmlBody = document.getElementsByTagName("body")[0];
	entryButton = document.getElementById("make");
	viewButton = document.getElementById("view");
	clearButton = document.getElementById("clear");
}

//Label Creator for Forms
function createLabel(eleLabel, elePar){
	var newLabel = document.createElement("label");
	newLabel.innerHTML = eleLabel;
	elePar.appendChild(newLabel);
}

//Creates Drop-Down Menus
function createSelectOptions(optionsList, selectEle){
	for (var c = 0; c < optionsList.length; c++) {
		var option = document.createElement("option");
		option.value = optionsList[c];
		option.text = optionsList[c];
		selectEle.appendChild(option);
	}
}