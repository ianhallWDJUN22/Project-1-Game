let prompt = [];
let playerPrompt = [];
let step = 0;
let startBtn = document.getElementById('btnStart');
const info = document.querySelector('.game-info');
const wirePanel = document.querySelector('.wire-panel');
const startInfo = document.querySelector('.start-info');
const startDiv = document.querySelector('.startDiv');
const warningLabel = document.querySelector('.backgroundInfo');


function activateBox(color) {
  const box = document.querySelector(`[data-box='${color}']`);
  // const sound = document.querySelector(`[data-sound='${color}']`);
  box.classList.add('activated');
  // sound.play();
  
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

function playerTurn(step) {
  wirePanel.classList.remove('unclickable');
  info.textContent = `INPUT CODE FOR SEQUENCE.. (${step})`;
}

function nextStep() {
  const boxes = ['red', 'green', 'blue', 'yellow'];
  const random = boxes[Math.floor(Math.random() * boxes.length)];
  return random;
}

function nextRound() {
  step += 1;
  
  wirePanel.classList.add('unclickable');
  info.textContent = '...PLAYING REFERENCE CODE...'
  // This would be the spot to add a leve/step/round tracker 
  // notification should I add one.  Just remember to create 
  //a variable for it then (variable.textContent)

  const nextPrompt = [...prompt];
  nextPrompt.push(nextStep());
  playRound(nextPrompt);
  
  prompt = [...nextPrompt];
  setTimeout(() => {
    playerTurn(step);
  }, step * 600 + 1000);
}

function playerClick(box) {
  const arrayIndex = playerPrompt.push(box) - 1;
  // const sound = document.querySelector(`[data-sound='${box}']`);
  // sound.play();
}

function startGame() {
  startBtn.classList.add('hidden');
  wirePanel.classList.remove('hidden');
  startInfo.classList.add('hidden');
  info.classList.remove('hidden');
  warningLabel.classList.add('hidden');
  info.textContent = '...PLAYING REFERENCE CODE...';
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
wirePanel.addEventListener('click', event => {
  const { box } = event.target.dataset;

  if (box) playerClick(box);
})



