/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.




/* **** Guessing Game Functions **** */

// Generate the Winning Number'
var winningNumber, playerGuess;
$(document).ready(function(){
	winningNumber = generateWinningNumber();
	console.log(winningNumber);
});



function generateWinningNumber(){
	// add code here

	var max = +$('#max').val();
	var min = +$('#min').val();
	if(min == 0){min = 1};
	if(max == 0){max = 100};
	$("#textBlock").text("Guess a number between " + min + " and " + max);
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	playerGuess = $('#guessInput').val();
	$('#guessInput').val('');
	console.log(playerGuess);
	checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	return (playerGuess - winningNumber);
}

function guessMessage(){
	var difference = lowerOrHigher();
	lower = "Your guess is lower by more than ";
	higher = "Your guess is higher by more than ";

	if(difference < -50){
		return lower + "50";
	}
	else if(difference < -25){
		return lower + "25";
	}
	else if(difference < -10){
		return lower + "10";
	}
	else if(difference < -5){
		return lower + "5";
	}
	else if(difference > 50){
		return higher + "50";
	}
	else if(difference > 25){
		return higher + "25";
	}
	else if(difference > 10){
		return higher + "10";
	}
	else if(difference > 5){
		return higher + "5";
	}
	else if(difference < 5 && difference > 0){
		return "You're higher by less than 5";
	}
	else if(difference > -5 && difference < 0){
		return "You're lower by less than 5";
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if(playerGuess == winningNumber){
		$('#answer').text("RIGHT!");
	}
	else{
		$('#answer').text(guessMessage());
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	generateWinningNumber();

	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){


	$('#guess').on('click',playersGuessSubmission);
	$('#playAgain').on('click',generateWinningNumber);
});
