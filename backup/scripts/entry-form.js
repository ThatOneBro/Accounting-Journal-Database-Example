//Creates Entry Form
function makeEntryForm(){

	var f;
    var entryLinesWrap;
	
	//Creates Form and Entry Date
	if (i == 0){
		
		//Enables Clear Button and Disables Form Creation Buttons
		clearButton.disabled = false;
		viewButton.disabled = true;
		entryButton.disabled = true;
		
		//Creates Div for Form
        formWrapper = document.getElementById("form-wrapper");
        
		var formSpace = document.createElement("div");
		formSpace.id = "datafield";
		formWrapper.appendChild(formSpace);
		
		//Creates Form and Appends It to the formSpace Div
		f = document.createElement("form");
		f.name = "gend-form";
		f.id = "gend-form";
		f.action = "/submit";
		f.method = "post";
		f.onsubmit = function(){return validateEquality()};
		formSpace.appendChild(f);
		
		//Creates Entry Date Input
        var entryDateWrap = document.createElement("div");
        entryDateWrap.className = "entry-date-wrap";
        
		var entryDate = document.createElement("input");
        
		entryDate.type = "date";
		entryDate.name = "entry-date";
		entryDate.id = "entry-date";
		entryDate.min = "2012-01-01";
		entryDate.max = currentDate;
		entryDate.required = "required";
		
		//Creates Label for Entry Date and Appends Elements to Form
		createLabel("Date of Entry:", entryDateWrap);
		entryDateWrap.appendChild(entryDate);
        f.appendChild(entryDateWrap);
        
        //Creates Wrapper Element to Put Entry Lines Inside Of
        entryLinesWrap = document.createElement("div");
        entryLinesWrap.className = "entry-lines-wrap";
        entryLinesWrap.id = "entry-lines-wrap";
        f.appendChild(entryLinesWrap);
        
        createSubmit(f);
	}
	
	//Removes Old Add
	else {
        entryLinesWrap = document.getElementById("entry-lines-wrap");
		f = document.getElementById("gend-form");
		removeOldAdd(i - 1, "add-remove-wrap" + (i - 1));
	}
	
	//Defines Row Inputs
    var entryLine = document.createElement("div");
    var lineFields = document.createElement("fieldset");
	var dr = document.createElement("input");
	var cr = document.createElement("input");
	var account = document.createElement("select");
	var amount = document.createElement("input");
    
    entryLine.className = "entry-line";
    entryLine.id = "entry-line" + i;
    
    lineFields.className = "line-fields";
    lineFields.id = "line-fields" + i;
    
	dr.type = "radio";
	dr.name = "group" + i;
	dr.id = "debit" + i;
	dr.value = "debit";
	dr.checked = "checked";
	dr.required = "required";
	
	cr.type = "radio";
	cr.name = "group" + i;
	cr.id = "credit" + i;
	cr.value = "credit";
	cr.required = "required";
	
	account.name = "account";
	account.id = "account" + i;
	account.required = "required";
	createSelectOptions(accountList, account);
	
	amount.type = "number";
	amount.name = "amount";
	amount.id = "amount" + i;
	amount.min = "1";
	amount.placeholder = "Enter amount";
	amount.required = "required";
    
    entryLine.appendChild(lineFields);
	
	//Appends Each Element to Form and Creates Corresponding Label
    lineFields.appendChild(dr);
	createLabel("Debit", lineFields);
	
	lineFields.appendChild(cr);
	createLabel("Credit", lineFields);
	
	createLabel("Account:", lineFields);
	lineFields.appendChild(account);
	
	createLabel("Amount ($):", lineFields);
	lineFields.appendChild(amount);
    
    //Creates Wrap for Add + Remove Buttons
    var addRemoveWrap = document.createElement("div");
    addRemoveWrap.className = "add-remove-wrap";
    addRemoveWrap.id = "add-remove-wrap" + i;
    entryLine.appendChild(addRemoveWrap);
	
    //Creates Remove Button For All Rows Except Row 1
	if (i > 1 && !document.getElementById("remove-line" + i)){
		createRemove(addRemoveWrap, i);
	}
    
    if (i == 1) {
        if(!document.getElementById("remove-line0")){
            createRemove(document.getElementById("add-remove-wrap0"), "0");
        }
        createRemove(addRemoveWrap, i);
    }
    
	//Creates Add Button
	createAdd(addRemoveWrap);
	
    //Appends Entry Line to the Parent Wrapper
    entryLinesWrap.appendChild(entryLine);
    
	//Increments Counter
	i++;
}