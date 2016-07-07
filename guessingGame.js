/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.


/* **** Guessing Game Functions **** */

// Generate the Winning Number'
var winningNumber, playerGuess, guessCount, guessLock;
$(document).ready(function(){
	winningNumber = generateWinningNumber();
	guessCount = 5;
	guessLock = false;
	console.log(winningNumber);
});

function generateWinningNumber(){
	// add code here
	var max = +$('#max').val();
	var min = +$('#min').val();
	if(min == 0){min = 1};
	if(max == 0){max = 100};
	$("#rangeBlock").text("Guess a number between " + min + " and " + max);
	return (Math.floor(Math.random() * (max - min + 1)) + min);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	if(guessLock == true){}
	else if(guessCount == 0){
		$('#answerBlock').text("Start Again");
	}
	else {
		playerGuess = $('#guessInput').val();
		$('#guessInput').val('');
		console.log(playerGuess);		
		checkGuess();
		guessCount -= 1;
		$('#guessNumberBlock').text('You have ' + guessCount + ' guesses left');
	}
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

	if(difference < 5 && difference > 0){
		return "You're higher by less than 5";
	}
	else if(difference > -5 && difference < 0){
		return "You're lower by less than 5";
	}
	else{
		var checks = [50,25,10,5];
		for(var i = 0; i < checks.length; i++) {
			if(difference < checks[i] * -1) {
				return lower + checks[i];
			}
			if(difference > checks[i]) {
				return higher + checks[i];
			}
		}
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if(playerGuess == winningNumber){	
		$('#previousGuessBlock').append(playerGuess);
		guessLock = true;	
		$('#answerBlock').css({'background-color':'#33FF33',
	'color':'#005500'});
		$('#answerBlock').text("RIGHT! The answer is "+ winningNumber);		
	}		
	else{
		$('#previousGuessBlock').append(playerGuess + " ");
		$('#answerBlock').text(guessMessage());
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here

	var fakeAnswer1 = generateWinningNumber();
	var fakeAnswer2 = generateWinningNumber();
	var hintArray = [fakeAnswer1,fakeAnswer2,winningNumber];
	shuffle(hintArray);

	$('#answerBlock').text('one of these is the right answer ' + hintArray[0] + ' ' + hintArray[1] + ' ' + hintArray[2]);
}

function shuffle(arr){
	var rand, b, c;
	for (c = arr.length; c; c -= 1){
		rand = Math.floor(Math.random() * c);
		b = arr[c-1];
		arr[c-1] = arr[rand];
		arr[rand] = b;
	}
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	$('#previousGuessBlock').text("");
	$('#answerBlock').css({'background-color':'#EEEEEE','color':'#555555'})
	$('#answerBlock').text('START');
	guessLock = false;
	guessCount = 5;
	$('#guessNumberBlock').text('You have ' + guessCount + ' guesses left');
	// add code here
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
	$('#guess').on('click',playersGuessSubmission);
	$('#playAgain').on('click',playAgain);
	$('#hint').on('click',provideHint);
	$(document).keypress(function(e){
		if(e.which == 13){
			playersGuessSubmission();
		}
	})
});
