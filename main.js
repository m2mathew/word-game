var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude', 'man', 'person', 'dog', 'turtle'];

function randomWord() {
	var word = wordBank[Math.floor(Math.random() * wordBank.length)];
	console.log('the chosen word is:', word);
	return word;
}

function messageDisplay() {
	message.firstChild.nodeValue = 'Let\'s do this';
}

var startButton = document.getElementById('start-button');
var message = document.getElementById('message');
var inputForm = document.getElementById('form');
var errorMessage = document.getElementById('error-message');

startButton.addEventListener('click', function() {
	messageDisplay();
	randomWord();

	startButton.style.display = 'none';
	inputForm.style.display = 'block';

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
