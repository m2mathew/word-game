// Initialize variables
var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude', 'man', 'person', 'dog', 'turtle', 'drum', 'internet', 'game'];
var wordLength = 0;
var pickedWord = '';
var guessWord = '';
var counter = 0;
var startButton = document.getElementById('start-button');
var message = document.getElementById('message');
var inputForm = document.getElementById('form');
var errorMessage = document.getElementById('error-message');
var wordSection = document.getElementById('word-section');
var wordDisplay = document.getElementById('word-display');
var input = document.getElementById('letter-submit');

// Initialize functions
function randomWord() {
	pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	wordLength = pickedWord.length;
	console.log('word length:', wordLength);
	console.log('the chosen word is:', pickedWord);
	if (pickedWord.length < 3) randomWord();
	guessedWord();
	return pickedWord;
}

function messageDisplay() {
	message.firstChild.nodeValue = 'Let\'s do this';
}

function guessedWord() {
	var newArray = [];
	for(var i = 0; i < wordLength; i++) {
		newArray.push('_ ');
	}
	guessWord = newArray.join('');
	console.log(guessWord);
	return guessWord;
}

function checkForLetter(letter) {
	var letter = letter.toLowerCase();
	return letter.length === 1 && letter >= 'a' && letter <= 'z';
}

function checkGuess(guess) {
	console.log('let me check that guess:', guess);
}

// Interact with the DOM

// Start button shows game board
startButton.addEventListener('click', function() {
	messageDisplay();
	randomWord();

	setTimeout(function() {
		startButton.style.display = 'none';
		inputForm.style.display = 'block';
		wordSection.style.display = 'block';
		wordDisplay.style.display = 'block';
		wordDisplay.textContent = guessWord;
	}, 500);

}, false);

// Display error message on keyUp
input.addEventListener('input', function(e) {
	var attempt = e.target.value;

	if (attempt === '') {
		errorMessage.textContent = '';
	}
	else if (attempt.length === 1) {
		if (!checkForLetter(attempt)) {
			errorMessage.textContent = 'Please enter a letter';
		}
	}
	else if (attempt === ' ') {
		errorMessage.textContent = 'Please enter a letter';
	}
 	else if (attempt.length !== 1) {
		errorMessage.style.display = 'block';
		errorMessage.textContent = 'Please enter only one letter';
	}

}, false);

// Handle submit
inputForm.addEventListener('submit', function(e) {
	e.preventDefault();
	var attempt = e.target[0].value;

	if (attempt === '') {
		errorMessage.textContent = 'Please enter something!';
	}
	else {
		checkGuess(attempt);
	}

}, false);
