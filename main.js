// Initialize variables
var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude', 'man', 'person', 'dog', 'turtle', 'drum', 'internet', 'game'];
var wordLength = 0;
var randomWord = '';
var guessWord = '';
var usedLetters = [];
var counter = 0;
var isWinner = false;
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
	message.firstChild.nodeValue = 'You get 8 guesses.';

	setTimeout(function() {
		message.firstChild.nodeValue = 'Let\'s do this';
	}, 1500);
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

function guessTransform(word, newIndex, guess) {
	var wordToCheck = word.trim().split(' ');
	console.log(wordToCheck);

	wordToCheck[newIndex] = guess;

	return wordToCheck.join('');
}

// checking if guess is in word and displaying that new word, also updating the guessed letters
function checkGuess(guess) {
	usedLetters.push(guess);
	console.log('used letters:', usedLetters[0]);

	letterBank.style.display = 'block';
	var disp = usedLetters[counter - 1];
	letterDisplay.textContent += (disp + '  ');

  if (randomWord.indexOf(guess) !== -1) {
		form.reset();
		setTimeout(function() {
			message.firstChild.nodeValue = 'Most excellent.';

			// find the index of the current guess in the random word
			var newIndex = randomWord.indexOf(guess);

			// assign the guessed letter to the correct index
			wordToShow = guessTransform(guessWord, newIndex, guess);

			// display the new word on the screen
			wordDisplay.textContent = wordToShow;
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
			form.reset();
		}
	}
	else if (attempt === ' ') {
		errorMessage.textContent = 'Please enter a letter';
		form.reset();
	}
 	else if (attempt.length !== 1) {
		errorMessage.style.display = 'block';
		errorMessage.textContent = 'Please enter only one letter';
		form.reset();
	}
}, false);

// Handle submit
form.addEventListener('submit', function(e) {
	e.preventDefault();

	var attempt = e.target[0].value.toLowerCase();

	if (isWinner === true) {
		message.firstChild.nodeValue = 'You got it!';
		form.reset();
	}
	else if (counter === 8 && isWinner === false) {
		message.firstChild.nodeValue = 'Game over!';
		form.style.display = 'none';
		form.reset();
	}
	else if (attempt === '') {
		errorMessage.textContent = 'Please enter something!';
		form.reset();
	}
	else if (attempt.length === 1 && attempt >= 'a' && attempt <= 'z') {
		if (usedLetters.indexOf(attempt) !== -1) {
			setTimeout(function() {
				message.firstChild.nodeValue = 'Already guessed that letter.';
				form.reset();
			}, 175)
		}
		else {
			counter++;
			checkGuess(attempt);
		}
	}
	console.log('count:', counter);

}, false);

