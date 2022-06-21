let prompt = [];
let playerPrompt = [];
let step = 0;
let startBtn = document.getElementById('btnStart');
const wirePanel = document.querySelector('.wire-panel');
const info = document.querySelector('.game-info');
const startInfo = document.querySelector('.start-info');
const startDiv = document.querySelector('.startDiv');
// const warningLabel = document.querySelector('.backgroundInfo');
function activateBox(color) {
  const box = document.querySelector(`[data-box='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  box.classList.add('activated');
  sound.play();
  setTimeout(() =>{
    box.classList.remove('activated');
  }, 300);
}

function playRound(nextPrompt) {
  nextPrompt.forEach((color, index) => {
    setTimeout(() => {
      activateBox(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const boxes = ['red', 'green', 'blue', 'yellow'];
  const random = boxes[Math.floor(Math.random() * boxes.length)];
  return random;
}

function nextRound() {
  step += 1;
  
  const nextPrompt = [...prompt];
  nextPrompt.push(nextStep());
  playRound(nextPrompt);
}

function startGame() {
  startBtn.classList.add('hidden');
  wirePanel.classList.remove('hidden');
  startInfo.classList.add('hidden');
  info.classList.remove('hidden');
  // startDiv.classList.add('hidden')
  
  // warningLabel.classList.add('hidden');
  info.textContent = 'WAIT FOR THE PROMPT';
  nextRound();
  let minute = 4;
  let sec = 59;
  setInterval(function() {
    document.getElementById("timer").innerHTML = '0' + `${minute}` + ":" + `${sec}`;
    sec--;
    if (sec == 0 && minute > 0) {
      minute --;
      sec = 59;
      if (minute == 0 && sec == 0) {
        boom();
      }
    }
    if (sec <= 9 && sec > 0) {
      sec = `0${sec}`;
    }
  }, 1000);
}


startBtn.addEventListener("click", startGame)



