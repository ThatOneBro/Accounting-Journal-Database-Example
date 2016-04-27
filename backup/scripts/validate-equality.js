//Validates Equality of Debits and Credits
function validateEquality(){
	var f = document.getElementById("gend-form");	
	var row0 = document.getElementById("account0").value;
	
	//Checks If Second Row Exists, Then Grabs Its Account Name
	if (document.getElementById("account1")){
		var row1 = document.getElementById("account1").value;
	}
	
	//Otherwise Returns False and Tells User to Add At Least 1 More Account
	else {
		alert('Please add more than one account to the entry.');
		return false;
	}
	
	//Checks If The Entry Uses More Than One Account, Otherwise Function Returns False
	if (i == 2 && row0 == row1){
		alert("Please ensure that the entry is valid.");
		return false;
	}
	
	//If It's A Valid Entry, Checks This:
	else {
		
		//Creates An Array For Debit Or Credit Values of Each Row
		var drOrCr = [];
		
		//Goes Through Each Row and Checks If Debit or Credit; Pushes Result to drOrCr Array
		for (a = 0; a < i; a++){
			var currentGroup = "group" + a;
			
			//If The Current Group of Radio Buttons Exists, Checks Which Buttons Are Currently Selected
			if (currentGroup){
				
				//Creates Array With Both Radio Button Properties
				var groupArray = document.getElementsByName(currentGroup);
				
				//Checks Each Element Of the Array for the Checked [Selected] Property
				for (l = 0; l < groupArray.length; l++){
					var currentOption = groupArray[l];
					
					if (currentOption.checked == true){
						drOrCr.push(currentOption.value);
						break;
					}
					//Keeps Searching Until It Finds Which Button Is Checked
					else {
						continue;
					}
				}
			}
			//Ends The Loop If There Are No More Entries
			else {
				break;
			}
		}
		
		//Defines Total Debits And Credits Elements As Integers
		var totalDebits = 0;
		var totalCredits = 0;
		
		//Adds the Amounts of Each Debit and Credit Account to the Respective Total Amount
		for (c = 0; c < i; c++){
			var currentAmount = document.getElementById("amount" + c).value;
			
			//Compares Each Value from the Array; Adds Debit Amounts to Total Debits
			if (drOrCr[c] == "debit"){
				totalDebits = totalDebits + parseInt(currentAmount);
			}
			
			//Otherwise Adds It to the Total Credits
			else {
				totalCredits = totalCredits + parseInt(currentAmount);
			}
		}
		
		//If Equality Exists, Then Returns True
		if (totalDebits == totalCredits){
			return true;
		}
		
		//Otherwise Returns False and Tells User to Ensure Equality
		else {
			alert("Please ensure that debits equal credits.");
			return false;
		}
	}
}