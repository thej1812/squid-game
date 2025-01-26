const redLight = document.querySelector('.red');
const greenLight = document.querySelector('.green');
const player = document.getElementById('player');
const startButton = document.getElementById('startGame');
const moveButton = document.getElementById('moveButton');
const doll = document.getElementById('doll');

let isGameRunning = false;
let isGreenLight = false; 
let gameInterval;

const selectedPlayerImage = localStorage.getItem('selectedPlayer') || 'player1.png'; // Default to player1
player.src = selectedPlayerImage;


function startGame() {
  isGameRunning = true;
  startButton.disabled = true;
  moveButton.disabled = false;
  player.style.bottom = '10px'; 
  player.style.left = '85px'; 

  gameInterval = setInterval(() => {
    isGreenLight = Math.random() > 0.5;

    if (isGreenLight) {
      
      redLight.classList.remove('active');
      greenLight.classList.add('active');
      doll.src = 'doll-back.png'; 
    } else {
      
      greenLight.classList.remove('active');
      redLight.classList.add('active');
      doll.src = 'doll-front.png'; 
    }
  }, 2000);
}

function stopGame(message) {
  clearInterval(gameInterval);
  isGameRunning = false;
  startButton.disabled = false;
  moveButton.disabled = true;
  alert(message);
}


moveButton.addEventListener('click', () => {
  if (!isGameRunning) return;

  const currentBottom = parseInt(player.style.bottom, 10) || 0;

  if (isGreenLight) {
   
    player.style.bottom = (currentBottom + 10) + 'px';

   
    if (currentBottom + 10 >= 390) {
      stopGame('You Escaped');
    }
  } else {
    stopGame('The doll saw you move! Game Over.');
  }
});

startButton.addEventListener('click', startGame);
