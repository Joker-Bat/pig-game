

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, targetValue;

var lastDice;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
	targetValue = document.getElementById('input-value').value;

	if (targetValue !== '') {


		if (gamePlaying) {

			// Hide the input field
			document.getElementById('input-value').style.display = 'none';

			// 1. Random number gereration
			var dice = Math.floor((Math.random() * 6) + 1);
			var dice2 = Math.floor((Math.random() * 6) + 1);

			// 2. Display the result
			var diceDOM = document.querySelectorAll('.dice');
			// console.log(diceDOM[0]);
			diceDOM[0].style.display = 'none';
			diceDOM[1].style.display = 'none';

			diceDOM[0].style.display = 'block';
			diceDOM[1].style.display = 'block';

			diceDOM[0].src = 'dice-' + dice + '.png';
			diceDOM[1].src = 'dice-' + dice2 + '.png';
			// console.log(dice, dice2);

			// 3. Update the round score if the rolled number was Not 1

			if (dice === 6 && dice2 === 6) {
				scores[activePlayer] = 0;
				document.querySelector('#score-' + activePlayer).textContent = '0';
			} if (dice !== 1 && dice2 !== 1){
				//Add score
				roundScore += (dice + dice2)
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			} else {
				//Next player
				nextPlayer();
			}

			lastDice = (dice + dice2);
			console.log(dice, dice2);
		}
	}
	
})


document.querySelector('.btn-hold').addEventListener('click', function() {

	if (targetValue !== '') {

		if (gamePlaying) {
			// Add the current score to the Global score
			scores[activePlayer] += roundScore;
			roundScore = 0;

			// Update the UI
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

			// Check if player won
			if (scores[activePlayer] >= Number(targetValue)) {
				document.getElementById('name-' + activePlayer).textContent = 'Winner';

				document.querySelectorAll('.dice')[1].style.display = 'none';
				document.querySelectorAll('.dice')[0].style.display = 'none';
				
				
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;
				document.querySelector('.btn-roll').classList.add('disabled');
				document.querySelector('.btn-hold').classList.add('disabled');
			} else {
				// Next player
				nextPlayer();
			}
		}
	}
})


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	targetValue = document.getElementById('input-value').value;


	document.getElementById('input-value').value = '';
	document.getElementById('input-value').style.display = 'block';

	document.querySelectorAll('.dice')[0].style.display = 'none';
	document.querySelectorAll('.dice')[1].style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');

	document.querySelector('.btn-roll').classList.remove('disabled');
	document.querySelector('.btn-hold').classList.remove('disabled');
}


function nextPlayer() {
		// document.getElementById('score-' + activePlayer).textContent = roundScore;
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		// Set the current score For both players to 0 after the calling of 1
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		//Change the background based on active player
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// Hide the dice after one players turn finished
		document.querySelectorAll('.dice')[0].style.display = 'none';
		document.querySelectorAll('.dice')[1].style.display = 'none';
}
