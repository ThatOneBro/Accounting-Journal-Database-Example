//Clears Current Line
function clearLine(valueToRemove){

	//Grabs Parent Wrapper and Line to Remove
	var entryLinesWrap = document.getElementById("entry-lines-wrap");
	var lineToRemove = document.getElementById("entry-line" + valueToRemove);
    
    //Removes Selected Line from Wrapper
    entryLinesWrap.removeChild(lineToRemove);
    
    //Decrements the line value of each of the lines after the cleared line
    var linesInForm = document.getElementsByTagName("fieldset");
    
    if(valueToRemove < (linesInForm.length - 1)){
    
        for (n = valueToRemove + 1; n < linesInForm.length; n++){

            var entryLineToDecrement = document.getElementById("entry-line" + n);
            var lineFieldsToDecrement = document.getElementById("line-fields" + n);
            var drToDecrement = document.getElementById("dr" + n);
            var crToDecrement = document.getElementById("cr" + n);
            var accountToDecrement = document.getElementById("account" + n);
            var amountToDecrement = document.getElementById("amount" + n);
            var addLineToDecrement = document.getElementById("add-line" + n);
            var removeLineToDecrement = document.getElementById("remove-line" + n);
            var addRemoveWrapToDecrement = document.getElementById("add-remove-wrap" + n);


            entryLineToDecrement.id = "entry-line" + (n-1);
            
            lineFieldsToDecrement.id = "line-fields" + (n-1);

            drToDecrement.name = "group" + (n-1);
            drToDecrement.id = "debit" + (n-1);

            crToDecrement.name = "group" + (n-1);
            crToDecrement.id = "credit" + (n-1);

            accountToDecrement.id = "account" + (n-1);

            amountToDecrement.id = "amount" + (n-1);

            addLineToDecrement.id = "add-line" + (n-1);

            removeLineToDecrement.id = "remove-line" + (n-1);
            
            addRemoveWrapToDecrement.id = "add-remove-wrap" + (n-1);
        }
    }
    
    //Decrements Counter Twice to Align with New Current Line
    if (i > 1){
        i-=2;
    }
    
    else {
        i = 0;
    }
    
    if (i == 0){
        var firstRowWrap = document.getElementById("add-remove-wrap0");
        firstRowWrap.removeChild(document.getElementById("remove-line0"));
    }
    
    createAdd(document.getElementById("add-remove-wrap" + i));
    
    //Re-increments Counter to Allow for Further Form Generation
    i++;
}