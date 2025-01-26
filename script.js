const redLight = document.querySelector('.red');
const greenLight = document.querySelector('.green');
const player = document.getElementById('player');
const startButton = document.getElementById('startGame');
const moveButton = document.getElementById('moveButton');
const doll = document.getElementById('doll');

let isGameRunning = false;
let isGreenLight = false; // True if the light is green
let gameInterval;

// Load selected player image
const selectedPlayerImage = localStorage.getItem('selectedPlayer') || 'player1.png'; // Default to player1
player.src = selectedPlayerImage;

// Start the game
function startGame() {
  isGameRunning = true;
  startButton.disabled = true;
  moveButton.disabled = false;
  player.style.bottom = '10px'; // Reset player position
  player.style.left = '85px'; // Position the player in the center

  // Toggle lights and doll's direction every 2 seconds
  gameInterval = setInterval(() => {
    isGreenLight = Math.random() > 0.5;

    if (isGreenLight) {
      // Light is green, doll turns away
      redLight.classList.remove('active');
      greenLight.classList.add('active');
      doll.src = 'doll-back.png'; // Doll turned away image
    } else {
      // Light is red, doll looks at the player
      greenLight.classList.remove('active');
      redLight.classList.add('active');
      doll.src = 'doll-front.png'; // Doll looking image
    }
  }, 2000);
}

// Stop the game
function stopGame(message) {
  clearInterval(gameInterval);
  isGameRunning = false;
  startButton.disabled = false;
  moveButton.disabled = true;
  alert(message);
}

// Move the player upward
moveButton.addEventListener('click', () => {
  if (!isGameRunning) return;

  const currentBottom = parseInt(player.style.bottom, 10) || 0;

  if (isGreenLight) {
    // Move the player up
    player.style.bottom = (currentBottom + 10) + 'px';

    // Check if the player wins (reaches the top)
    if (currentBottom + 10 >= 390) {
      stopGame('You Win!');
    }
  } else {
    // Player moved during a red light
    stopGame('The doll saw you move! Game Over.');
  }
});

// Start button click event
startButton.addEventListener('click', startGame);
