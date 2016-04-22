var wordBank = ['the', 'bank', 'is', 'open', 'every', 'single', 'day', 'dude'];

function randomWord() {
	var word = wordBank[Math.floor(Math.random() * wordBank.length)];
	console.log('the chosen word is:', word);
	return word;
}

var startButton = document.getElementById('start-button');
var message = document.getElementById('message');

startButton.addEventListener('click', function() {

	message.firstChild.nodeValue = 'Let\'s do this';

	randomWord();

}, false);


