// Initialize variables
var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude', 'man', 'person', 'dog', 'turtle', 'drum', 'internet', 'game'];
var wordLength = 0;
var randomWord = '';
var guessWord = '';
var usedLetters = [];
var counter = 0;
var guessCount = 8;
var isWinner = false;
var wordToCheck = '';
var startButton = document.getElementById('start-button');
var message = document.getElementById('message');
var form = document.getElementById('form');
var errorMessage = document.getElementById('error-message');
var wordSection = document.getElementById('word-section');
var wordDisplay = document.getElementById('word-display');
var input = document.getElementById('letter-submit');
var submitButton = document.getElementById('submit-button');
var letterBank = document.getElementById('letter-bank');
var letterDisplay = document.getElementById('letter-display');
var guessText = document.getElementById('guess-text');
var guessNumber = document.getElementById('guess-number');


// Initialize functions
function messageDisplay() {
	if (counter === 0) {
		message.firstChild.nodeValue = 'You get 8 guesses.';
	}

	setTimeout(function() {
		message.firstChild.nodeValue = 'Let\'s do this';
	}, 1500);
}

function getRandomWord() {
	randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();
	wordLength = randomWord.length;
	console.log('the chosen word is:', randomWord);
	if (randomWord.length < 3) {
		getRandomWord();
	}
	getBlankWord();
	return randomWord;
}

function getBlankWord() {
	var newArray = [];
	for(var i = 0; i < wordLength; i++) {
		newArray.push('-');
	}
	guessWord = newArray.join('');
	return guessWord;
}

function checkForLetter(letter) {
	return letter.length === 1 && letter >= 'a' && letter <= 'z';
}

function guessTransform(guessWord, newIndex, guess) {

	wordToCheck = guessWord.trim().split('');
	console.log(wordToCheck);

	console.log(wordToCheck);

	wordToCheck[newIndex] = guess;
	console.log('2nd', wordToCheck);

	return wordToCheck.join('');
}

// checking if guess is in word and displaying that new word, also updating the guessed letters
function checkGuess(guessLetter) {
	usedLetters.push(guessLetter);
	console.log('used letters:', usedLetters[0]);

	letterBank.style.display = 'inline-block';
	var disp = usedLetters[counter - 1];
	letterDisplay.textContent += (disp + '  ');

  if (randomWord.indexOf(guessLetter) !== -1) {
		form.reset();
		setTimeout(function() {
			message.firstChild.nodeValue = 'Most excellent.';

			// find the index of the current guess in the random word
			var newIndex = randomWord.indexOf(guessLetter);

			// assign the guessed letter to the correct index
			wordToShow = guessTransform(guessWord, newIndex, guessLetter);

			// console.log(wordToShow);

			// display the new word on the screen
			wordDisplay.textContent = wordToShow;
		}, 175)
		checkWinner(wordDisplay);
	}
	else {
		form.reset();
		setTimeout(function() {
			message.firstChild.nodeValue = 'Nope. Try again.';
		}, 175)
	}
}

function guessInfo() {
	if (counter === 0) {
		guessText.textContent = "Guesses left: " + guessCount;
	}
	else {
		guessCount --;
		guessText.textContent = "Guesses left: " + guessCount;
	}
}

function checkWinner(word) {
	if (wordDisplay.indexOf('-') === -1) {
		isWinner = true;
	}
}

// end the game
function gameOver() {
	if (isWinner === true) {
		message.firstChild.nodeValue = 'You got it!';
		form.reset();
	}
	else
	if (counter === 7 && isWinner === false) {
		message.firstChild.nodeValue = 'Game over!';
		errorMessage.style.display = 'none';
		guessText.style.display = 'none';
		form.style.display = 'none';
		form.reset();
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
		guessText.style.display = 'inline-block';
		guessInfo();
		input.focus();
	}, 500);

}, false);

// Display error message on keyUp
input.addEventListener('input', function(e) {
	var guessLetter = e.target.value.toLowerCase();

	if (guessLetter === '') {
		errorMessage.textContent = '';
	}
	else
	if (usedLetters.indexOf(guessLetter) !== -1) {
		errorMessage.firstChild.nodeValue = 'Already guessed that letter.';
		form.reset();
	}
	else
	if (guessLetter.length === 1) {
		if (!checkForLetter(guessLetter)) {
			errorMessage.textContent = 'Please enter a letter';
			form.reset();
		}
	}
	else
	if (guessLetter === ' ') {
		errorMessage.textContent = 'Please enter a letter';
		form.reset();
	}
 	else
 	if (guessLetter.length !== 1) {
		errorMessage.textContent = 'Please enter only one letter';
		form.reset();
	}
}, false);

// Handle submit
form.addEventListener('submit', function(e) {
	e.preventDefault();

	var guessLetter = e.target[0].value.toLowerCase();

	if (guessLetter === '') {
		errorMessage.textContent = 'Please enter something!';
		form.reset();
	}
	else
	if (guessLetter.length === 1 && guessLetter >= 'a' && guessLetter <= 'z') {
		counter++;
		checkGuess(guessLetter);
	}

	// update guesses left info
	guessInfo()

	// console.log('count:', counter);

}, false);
