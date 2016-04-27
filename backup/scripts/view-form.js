//Creates View Form
function makeViewForm(){
	
		//Enables Clear Button and Disables Form Creation Buttons
		clearButton.disabled = false;
		entryButton.disabled = true;
		viewButton.disabled = true;
		
		//Creates Div for Form
        formWrapper = document.getElementById("form-wrapper");
		var formSpace = document.createElement("div");
		formSpace.id = "datafield";
		formWrapper.appendChild(formSpace);
		
		//Creates Form and Appends It to formSpace Div
		var f = document.createElement("form");
		f.name = "gend-form";
		f.id = "gend-form";
		f.action = "/viewrequest";
		f.method = "post";
		formSpace.appendChild(f);
		
        var inputWrap = document.createElement("div");
        inputWrap.className = "input-wrap";
        inputWrap.id = "input-wrap";
        f.appendChild(inputWrap);
    
		//Defines List of Sort Methods for Data Viewing
		var sortList = ["Ascending By Date","Descending By Date","Entries On Specified Date","Entries Before Date","Entries After Date","Specific Account Balance"];
		
		//Creates Drop-Down Menu Using List
		var sortBy = document.createElement("select");
		sortBy.name = "sort-by";
		sortBy.id = "sort-by";
		sortBy.onchange = function(){changeNextSelect(sortList)}; //Calls changeNextSelect When Option Changes
		createSelectOptions(sortList, sortBy);
		inputWrap.appendChild(sortBy);
		
		//Creates Break and Submit Button
		createSubmit(f);
}