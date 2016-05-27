////////////////////////////////////////
/*//    JOURNAL DATABASE EXAMPLE    //*/
/*//        VERSION: 1.0.5          //*/
/*//    AUTHOR: DERRICK FARRIS      //*/
////////////////////////////////////////

//Declares modules as variables
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require ('bcrypt-nodejs');

//Creates a connection to MySQL database
var con = mysql.createConnection({
	host: '127.0.0.1',
	port: '8888',
	user: 'root',
	password: 'blabla123',
	database: 'journal_db_ex',
	multipleStatements: true
});

//Connects to database
con.connect(function(err){
	
	//Checks for errors
	if(err){
		console.log('Connection to database failed.');
		console.log(err);
		return;
	}
	console.log('Connection to database established.');
});

//Sets up cookie parser and sessions
app.use(cookieParser());
app.use(session({
	secret: 'superbigsecret123',
	saveUninitialized: false,
	resave: true
}));

//Sets up body parser for JSON as well as URL-encoded HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Sets static folders for /public/styles and /public/scripts folders
app.use('/styles', express.static(__dirname + '/public/styles'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));

//Declares session variable and sorter options list to compare to client inputs
var sess;
var sortByOptions = ['Ascending By Date','Descending By Date','Entries On Specified Date','Entries Before Date','Entries After Date','Specific Account Balance'];

////////////////////////
//   Root/Login Page  //
////////////////////////
app.get('/', function(req, res){
	
	//Sets sess variable equal to the requested session; this is done for each page to ensure that session is created
	sess = req.session;
	
	//Checks for existing user from session; redirects to Home if there is existing session
	if (sess.user){
		res.redirect('/home');
	}
	
	//Serves login page otherwise
	else{
		res.sendFile(__dirname + '/public/index.html');
	}
});

///////////////////////////////////////
//  Login Request Processing Page    //
///////////////////////////////////////
app.post('/login', function(req, res){
	
	//Verifies required form inputs
	if (req.body.user && req.body.pass){
		sess = req.session;
		
		//Redirects to Home if session exists for user
		if (sess.user){
			res.redirect('/home');
		}
		
		//Login Credential Validation//
		else {
			var username = req.body.user;
			
			//Queries database for password corresponding to entered username
			con.query('SELECT pass, admin FROM users WHERE username = ?;', username,
				function(err, userData){
					
					//If an error occurs, throws it to console
					if (err){
						throw err;
						res.send('Error.');
					}
					else {
						//If username returned no results, sends 'Invalid login' to user
						if (userData[0] == undefined){
							res.send('Invalid login.');
						}
						//Checks if password matches
						else {
							var passw = userData[0].pass;
							var auth = userData[0].admin;
                            
                            //Hashes received password and compares to hash retrieved from database
                            bcrypt.compare(req.body.pass, passw, function(err, match){
                                if (err){
                                    throw err;
                                    res.send('Error.');
                                }
                            
                                else {
                                    
                                    //If hashes match, and auth level for user is 1, a session is created for user and redirects to Home
                                    if (match == true){
                                        if (auth == 1){
                                            sess.user = username;
                                            res.redirect('/home');
                                        }

                                        //         Dead Code          //
                                        /*else {
                                            res.sendFile(__dirname +'/public/homenoauth.html');
                                        }*/
                                        //      End Dead Code        //
                                    }

                                    //If password does not match, indicate to user that password is incorrect
                                    else {
                                        res.send('Incorrect username or password.');
                                    }
                                }
                            
                            });
						}
					}
				}
			);
		}
	}
	
	//If an input is missing, indicates to user that the form is invalid
	else {
		res.send('Error processing form. Please ensure all fields are valid.');
	}
});

///////////////////////////////
//  Logout Processing Page   //
///////////////////////////////
app.get('/logout', function (req, res){
	
	//Destroys current session
	req.session.destroy(function(err){
		
		//Checks for errors
		if (err){
			console.log(err);
		}
		
		//Redirects to root (Login Page)
		else {
			res.redirect('/');
		}
	});
});

///////////////////
//   Home Page   //
///////////////////
app.get('/home', function(req, res) {
	sess = req.session;
	
	//If session exists for user, deletes possible stored queries and serves HTML file
	if (sess.user){
		if (sess.entry){
			delete sess.entry;
		}
		if (sess.viewLedger){
			delete sess.viewLedger;
		}
		if (sess.viewBalance){
			delete sess.viewBalance;
		}
		res.sendFile(__dirname +'/public/home.html');
	}
	
	//If no valid session, redirects to Login page
	else {
		res.redirect('/');
	}
});

//////////////////////////////////
//  Entry Form Processing Page  //
//////////////////////////////////
app.post('/submit', function(req, res){
	sess = req.session;
	
	//Checks for valid session
	if (sess.user){
		
		//If all valid inputs exist, process begins
		if (req.body['entry-date'] && req.body.group0 && req.body.group1 && req.body.account && req.body.amount){
			
			//	Form Data Processing	//
			var entryDate = req.body['entry-date'];
			
			//Creates an array to store Debit or Credit value for each row
			var drOrCr = [];
			
			//Searches for the radio button values from the request
			for (var key in req.body){
				var properMatch = key.match(/^group(\d)$/);
				if (properMatch){
					
					 //Pushes the result to drOrCr array
					drOrCr.push(req.body[key]);
				}
			}
			
			//More form data
			var accounts = req.body.account;
			var amounts = req.body.amount;
			
			//Creates an array for all values from form data
			var allValues = [];
			
			//Pushes values from each row of entry to the array
			for (i = 0; i < drOrCr.length; i++){
				var values = [entryDate, accounts[i], drOrCr[i], amounts[i]];
				allValues.push(values);
			}
			
			//Inserts all form values into database via query
			con.query(
				'INSERT INTO journal (entry_date, account, debit, amount) VALUES ?;', [allValues],
				function(err, rows){
					
					//Checks for errors
					if (err){
						throw err;
						res.send('Error.');
					}
					
					//If successful, loads values into session and redirects to /submitted GET page to display data
					else {
						sess.entry = allValues;
						res.redirect('/submitted');
					}
				}
			);
		}
		
		//If there are missing elements from form, notifies user of error
		else {
			res.send('Error processing form. Please ensure all fields are valid.');
		}
	}
	
	//If no valid session, returns user to Login Page
	else {
		res.redirect('/');
	}
});

//////////////////////////
//  Entry Display Page  //
//////////////////////////
app.get('/submitted', function(req, res){
	sess = req.session;
	
	//Checks if an entry is stored in session
	if (sess.entry){
		
		//Creates header for rendered HTML to be sent to client
		var htmlHeader = '<title>Journal Database | Submitted</title>'
		+ '<link rel="stylesheet" type="text/css" href="styles/main.css">';
		
		//Creates base HTML for table to be generated using entry data
		var generatedTable = '<table><tr><th>Date</th><th>Dr/Cr</th><th>Account</th><th>Amount</th></tr>';
		
		//Creates a table row for each row of the journal entry
		for (i = 0; i < sess.entry.length; i++){
			var dynamicRows;
			if(i == 0){
				dynamicRows = '<tr><td>' + sess.entry[i][0] + '</td><td>' + sess.entry[i][2] + '</td><td>' + sess.entry[i][1] + '</td><td>$' + sess.entry[i][3] + '</td></tr>';
			}
			else {
				dynamicRows = dynamicRows + '<tr><td> </td><td>' + sess.entry[i][2] + '</td><td>' + sess.entry[i][1] + '</td><td>$' + sess.entry[i][3] + '</td></tr>';
			}
		}
		
		//Adds generated rows to the table and closes the tag
		generatedTable = generatedTable + dynamicRows + '</table>';
		
		//Creates a home button
		var homeButton = '<div class="home-button-wrap"><a class="button home-button" href="/home">Home</a></div>';
		
		//Combines all elements of the generated HTML into one string
		var generatedHtml = htmlHeader + '<div class="query-wrap"><h1>Entry successful. Your entry:</h1>' + generatedTable + homeButton + "</div>";
		
		//Writes the generated HTML to the client and closes the response
		res.write(generatedHtml);
		res.end();
	}
	
	//If no entry to be displayed, redirects to root
	else {
		res.redirect('/');
	}
});

//////////////////////////////////
//  View Data Processing Page   //
//////////////////////////////////
app.post('/viewrequest', function(req, res){
	sess = req.session;
	
	//Checks for valid session
	if (sess.user){
		
		//Checks for entry sort-by selector input
		if (req.body['sort-by']){
			var sort = req.body['sort-by'];
			
			//Checks if data does not pertain to a specified account
			if (sort != sortByOptions[5]){
				
				//Declares a variable to store query
				var viewQuery;
				
				//Checks if data is to be sorted by either ascending or descending with no associated date
				if (sort == sortByOptions[0] || sort == sortByOptions[1]){
					
					//Defines query for ordering data by ascending entry date
					if (sort == sortByOptions[0]){
						viewQuery = 'SELECT * FROM journal ORDER BY entry_date ASC;';
					}
					
					//Defines query for ordering data by descending entry date
					else {
						viewQuery = 'SELECT * FROM journal ORDER BY entry_date DESC;';
					}
					
					//Queries server based on assigned query
					con.query(
						viewQuery, function(err, rows){
							
							//Checks for errors
							if (err){
								throw err;
								res.send('Error.');
							}
							
							//If no error, puts data into an array to be stored in the session
							else {
								
								//Creates array for all of our data
								var allValues = [];
								
								//Pushes all fields for each row to allValues array
								for (i = 0; i < rows.length; i++){
									var entryDate = JSON.stringify(rows[i].entry_date);
									entryDate = entryDate.slice(1,11);
									var account = rows[i].account;
									var drOrCr = rows[i].debit;
									var amount = rows[i].amount;
									
									var values = [entryDate, account, drOrCr, amount];
									allValues.push(values);
								}
								
								//Stores all values in session and redirects to the /view GET page
								sess.viewLedger = allValues;
								res.redirect('/view');
							}
						}
					);
				}
				
				//Checks if data is to be queried by a specified date (before, after, or on date)
				else if (sort == sortByOptions[2] || sort == sortByOptions[3] || sort == sortByOptions[4]){
					
					//Checks if the date was properly received
					if (req.body['specified-date']){
						
						//Defines our specified date as a shorthand variable
						var comparisonDate = req.body['specified-date']; 
						
						//Query for On Date
						if (sort == sortByOptions[2]){
							viewQuery = 'SELECT * FROM journal WHERE entry_date = ?;';
						}
						
						//Query for Before Date
						if (sort == sortByOptions[3]){
							viewQuery = 'SELECT * FROM journal WHERE entry_date < ? ORDER BY entry_date ASC;';
						}
						
						//Query for After Date
						if (sort == sortByOptions[4]){
							viewQuery = 'SELECT * FROM journal WHERE entry_date > ? ORDER BY entry_date ASC;';
						}
						
						//Queries database based on defined query and specified date
						con.query(
							viewQuery, [comparisonDate], function(err, rows){
								
								//Checks for errors
								if (err){
									throw err;
									res.send('Error.');
								}
								
								//If no error, puts data into an array to be stored in the session
								else {
									
									//Declares an array to store our data in
									var allValues = [];
									
									//Pushes all fields for each row to allValues array
									for (i = 0; i < rows.length; i++){
										var entryDate = JSON.stringify(rows[i].entry_date);
										entryDate = entryDate.slice(1,11);
										var account = rows[i].account;
										var drOrCr = rows[i].debit;
										var amount = rows[i].amount;
										
										var values = [entryDate, account, drOrCr, amount];
										allValues.push(values);
									}
									
									//Stores our array of values in the session and redirects to the /view GET page
									sess.viewLedger = allValues;
									res.redirect('/view');
								}
							}
						);
					}
					
					//If no proper date field, prompts the user to provide a valid date
					else {
						res.send('Please enter a valid date.');
					}
				}
			}
			else {
				
				//Checks if an account selector was submitted
				if (req.body['account-select']){
					
					//Defines shorthand reference variable
					var account = req.body['account-select'];
					
					/*Defines our query for finding the specified account balance:
						1. Calls a stored procedure from the database that returns the debit and credit amounts from the account as well as normal balance
						2. Selects the stored data for each of the fields as referenceable aliases
					*/
					var viewQuery = 'CALL get_balance(?, @acc_debits, @acc_credits, @norm_bal);'
					+ 'SELECT @acc_debits AS acc_debits, @acc_credits AS acc_credits, @norm_bal AS norm_bal;';
					
					//Queries the server based on our specified query
					con.query(
						viewQuery, [account], function(err, rows){
							//Checks for erros
							if (err){
								throw err;
								res.send('Error.');
							}
							
							//Checks normal balance and subtracts debits from credits if debit normal balance, and credits from debits if credit normal balance
							else {
								
								//Sets normal balance
								var normalBalance = rows[1][0].norm_bal;
								
								//Sets total account debits
								var accountDebits = rows[1][0].acc_debits;
								
								//If no debits for account, sets amount to 0
								if (accountDebits == null){
									accountDebits = 0;
								}
								
								//Sets total account credits
								var accountCredits = rows[1][0].acc_credits;
								
								//If no credits, sets amount to 0
								if (accountCredits == null){
									accountCredits = 0;
								}
								
								//Declares account balance variable
								var accountBalance;
								
								//Subtracts debits from credits if debit NB
								if (normalBalance == 'debit'){
									accountBalance = accountDebits - accountCredits;
								}
								
								//Subtracts credits from debits if credit NB
								else if (normalBalance == 'credit'){
									accountBalance = accountCredits - accountDebits;
								}
								
								//If no entries for account, account balance is 0
								else {
									accountBalance = 0;
								}
								
								//Writes account balance into session and redirects to /view GET page
								sess.viewBalance = [account, accountBalance];
								res.redirect('/view');
							}
						}
					);
				}
				
				//If no account selector, notifies user to correct account selector input
				else {
					res.send('Please select a valid account.');
				}	
			}
		}
		
		//If no valid sort-by selector, notifies user of form processing error
		else {
			res.send('Error processing request. Please ensure all fields are valid.');
		}
	}
	
	//If no valid session, redirects to root
	else {
		res.redirect('/');
	}
});

/////////////////////////////
//  View Data Display Page //
/////////////////////////////
app.get('/view', function(req, res){
	sess = req.session;
	
	//Checks for a proper view session exists
	if (sess.viewLedger || sess.viewBalance){
		
		//Creates header for rendered HTML to be displayed
		var htmlHeader = '<title>Journal Database | View</title>'
		+ '<link rel="stylesheet" type="text/css" href="styles/main.css" />';
		
		//Creates HTML for home button and declares generated HTML variable
		var homeButton = '<div class="home-button-wrap"><a class="button home-button" href="/home">Home</a></div>';
		var generatedHtml;
		
		//Checks if data to be displayed is journal entries
		if (sess.viewLedger){
			
			//Checks if data to be displayed exists
			if (sess.viewLedger[0] != undefined){
				
				//Base HTML for table to display data
				var generatedTable = '<table><tr><th>Date</th><th>Dr/Cr</th><th>Account</th><th>Amount</th></tr>';
				
				//Generates a table row for each of the rows of data to be displayed
				for (i = 0; i < sess.viewLedger.length; i++){
					var dynamicRows;
					
					//Creates first row of table
					if(i == 0){
						dynamicRows = '<tr><td>' + sess.viewLedger[i][0] + '</td><td>' + sess.viewLedger[i][2] + '</td><td>' + sess.viewLedger[i][1] + '</td><td>$' + sess.viewLedger[i][3] + '</td></tr>';
					}
					
					//If previous row's entry date does not match the current row's entry date, write the date again
					else if(sess.viewLedger[i][0] != sess.viewLedger[i - 1][0]){
						dynamicRows = dynamicRows + '<tr><td>' + sess.viewLedger[i][0] + '</td><td>' + sess.viewLedger[i][2] + '</td><td>' + sess.viewLedger[i][1] + '</td><td>$' + sess.viewLedger[i][3] + '</td></tr>';
					}
					
					//If date is the same, don't write the date for this row
					else {
						dynamicRows = dynamicRows + '<tr><td> </td><td>' + sess.viewLedger[i][2] + '</td><td>' + sess.viewLedger[i][1] + '</td><td>$' + sess.viewLedger[i][3] + '</td></tr>';
					}
				}
				
				//Combines table's base HTML with the generated rows and closes the tag
				generatedTable = generatedTable + dynamicRows + '</table>';
				
				//Combines the header, display message, generated table and home button into one string
				generatedHtml = htmlHeader + '<div class="query-wrap"><h1>Your query:</h1>' + generatedTable + homeButton + "</div>";
			}
			
			//If no results to be displayed, notifies user that the query returned no results
			else {
				generatedHtml = htmlHeader + '<div class="query-wrap"><h1>Your query returned no results.</h1>' + homeButton + "</div>";
			}
			
			//Writes generated HTML to client and closes response
			res.write(generatedHtml);
			res.end();
		}
		
		//Checks if account balance is to be displayed
		else if (sess.viewBalance){
			
			//Creates base HTML for table to display data
			var generatedTable = '<table><tr><th>Account</th><th>Balance</th></tr>'
			+ '<tr><td>' + sess.viewBalance[0] + '</td><td>$' + sess.viewBalance[1] + '</td></tr></table>';
			
			//Combines the header, display message, generated table, and home button into one string
			generatedHtml = htmlHeader + '<div class="query-wrap"><h1>Your query:</h1>' + generatedTable + homeButton + "</div>";
			
			//Writes the generated HTML to the client and closes the response
			res.write(generatedHtml);
			res.end();
		}
		
		//If no valid display data, notify user of error
		else {
			res.send('Error processing request.');
		}
	}
	
	//If no valid session, redirect to root
	else {
		res.redirect('/');
	}
});


//Defines port for server to listen on
app.listen(8080, function(){
	console.log('Server running at http://localhost:8080/');
});