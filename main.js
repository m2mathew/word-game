// Initialize variables
var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude', 'man', 'person', 'dog', 'turtle', 'drum', 'internet', 'game'];
var wordLength = 0;
var randomWord = '';
var guessWord = '';
var usedLetters = [];
var counter = 8;
var startButton = document.getElementById('start-button');
var message = document.getElementById('message');
var form = document.getElementById('form');
var errorMessage = document.getElementById('error-message');
var wordSection = document.getElementById('word-section');
var wordDisplay = document.getElementById('word-display');
var input = document.getElementById('letter-submit');
var submitButton = document.getElementById('submit-button');

// Initialize functions
function getRandomWord() {
	randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	wordLength = randomWord.length;
	console.log('the chosen word is:', randomWord);
	if (randomWord.length < 3) {
		getRandomWord();
	}
	getBlankWord();
	return randomWord;
}

function messageDisplay() {
	message.firstChild.nodeValue = 'Let\'s do this';
}

function getBlankWord() {
	var newArray = [];
	for(var i = 0; i < wordLength; i++) {
		newArray.push('_ ');
	}
	guessWord = newArray.join('');
	return guessWord;
}

function checkForLetter(letter) {
	var letter = letter.toLowerCase();
	return letter.length === 1 && letter >= 'a' && letter <= 'z';
}

function checkGuess(guess) {
	if (usedLetters.indexOf(guess) !== -1) {
		setTimeout(function() {
			message.firstChild.nodeValue = 'Already guessed that letter.';
		}, 175)
	}
	usedLetters.push(guess);
	console.log('used letters:', usedLetters);

  if (randomWord.indexOf(guess) !== -1) {
		form.reset();
		setTimeout(function() {
			message.firstChild.nodeValue = 'Most excellent.';

			// find the index of the current guess in the random word
			var newIndex = randomWord.indexOf(guess);
			console.log('new index:', newIndex);

			// assign the guessed letter to the correct index
			guessWord.split(' ');
			console.log(typeof guessWord);

			// display the new word on the screen
			wordDisplay.textContent = guessWord;
		}, 175)
	}
	else {
		form.reset();
		setTimeout(function() {
			message.firstChild.nodeValue = 'Nope. Try again.';
		}, 175)
	}
}

// Interact with the DOM

// Start button shows game board
startButton.addEventListener('click', function() {
	messageDisplay();
	getRandomWord();

	setTimeout(function() {
		startButton.style.display = 'none';
		form.style.display = 'block';
		wordSection.style.display = 'block';
		wordDisplay.style.display = 'block';
		wordDisplay.textContent = guessWord;
		input.focus();
	}, 500);

}, false);

// Display error message on keyUp
input.addEventListener('input', function(e) {
	var attempt = e.target.value.toLowerCase();

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
form.addEventListener('submit', function(e) {
	e.preventDefault();
	counter--;
	var attempt = e.target[0].value.toLowerCase();

	if (counter === 0) {
		message.firstChild.nodeValue = 'Game over!';
	}
	else if (attempt === '') {
		errorMessage.textContent = 'Please enter something!';
	}
	else if (attempt.length === 1 && attempt >= 'a' && attempt <= 'z') {
		checkGuess(attempt);
	}
	console.log('count:', counter);

}, false);

