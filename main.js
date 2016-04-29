var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude', 'man', 'person', 'dog', 'turtle'];
var wordLength = 0;
var guessWord = '';
var counter = 0;

function randomWord() {
	var word = wordBank[Math.floor(Math.random() * wordBank.length)];
	wordLength = word.length;
	console.log('word length:', wordLength);
	console.log('the chosen word is:', word);
	if (word.length < 3) randomWord();
	blankWord();
	return word;
}

function messageDisplay() {
	message.firstChild.nodeValue = 'Let\'s do this';
}

function blankWord() {
	var newArray = [];
	for(var i = 0; i < wordLength; i++) {
		newArray.push('_ ');
	}
	guessWord = newArray.join('');
	console.log(guessWord);
	return guessWord;
}

var startButton = document.getElementById('start-button');
var message = document.getElementById('message');
var inputForm = document.getElementById('form');
var errorMessage = document.getElementById('error-message');
var wordSection = document.getElementById('word-section');
var wordDisplay = document.getElementById('word-display');

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

inputForm.addEventListener('submit', function(e) {
	e.preventDefault();
	var attempt = e.target[0].value;

	if (attempt === '') {
		errorMessage.style.display = 'block';
		errorMessage.textContent = 'Please enter a letter';
	}

	if (attempt.length !== 1) {
		errorMessage.style.display = 'block';
		errorMessage.textContent = 'Please enter only one letter';
	}

}, false);
