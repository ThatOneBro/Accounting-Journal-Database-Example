//Defines What Should Happen When View Option Changes
function changeNextSelect(selectList){
	var inputWrap = document.getElementById("input-wrap");
    var sortBy = document.getElementById("sort-by");
	
	//Asc or Desc Option: Removes Extra Inputs If They Exist and Creates Submit Button
	if (sortBy.value == selectList[0] || sortBy.value == selectList[1]){
		if (document.getElementById("specified-date")){
			var dateToRemove = document.getElementById("specified-date");
			inputWrap.removeChild(dateToRemove);
		}
		if (document.getElementById("account-select")){
			var selectToRemove = document.getElementById("account-select");
			inputWrap.removeChild(selectToRemove);
		}
	}
	
	//If Not Asc Or Desc, Removes Submit Button and Last Break
	else {
		//Before, After, or On Date Options
		if (sortBy.value == selectList[2] || sortBy.value == selectList[3] || sortBy.value == selectList[4]){
			
			//Removes Account Select If Exists
			if (document.getElementById("account-select")){
				var selectToRemove = document.getElementById("account-select");
				inputWrap.removeChild(selectToRemove);
			}
			
			//Creates Date Input If It Does Not Exist
			if (!document.getElementById("specified-date")){
				
				var specifiedDate = document.createElement("input");
				specifiedDate.type = "date";
				specifiedDate.name = "specified-date";
				specifiedDate.id = "specified-date";
				specifiedDate.min = "2012-01-01";
				specifiedDate.max = currentDate;
				specifiedDate.required = "required";
				inputWrap.appendChild(specifiedDate);
			}
		}
		
		//Otherwise Remove Date Input and Create Account Select Input
		else {
			//Removes Date If Exists
			if (document.getElementById("specified-date")){
				var dateToRemove = document.getElementById("specified-date");
				inputWrap.removeChild(dateToRemove);
			}
            
			//Create Account Selector with Globally-Defined Account List
			var accountSelect = document.createElement("select");
			accountSelect.name = "account-select";
			accountSelect.id = "account-select";
			createSelectOptions(accountList, accountSelect);
			inputWrap.appendChild(accountSelect);
		}
	} 
}