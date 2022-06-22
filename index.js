let prompt = [];
let playerPrompt = [];
let step = 0;
let startBtn = document.getElementById('btnStart');
let resetBtn = document.querySelector('#reset-btn');
let resets = 2
let wipe = document.querySelector('.full-wipe');
let errorInfo = document.querySelector('.error-info');
const row1 = document.querySelector('.row-1');
const row2 = document.querySelector('.row-2');
const resetCounter = document.querySelector('.mistakeCounter');
const info = document.querySelector('.game-info');
const wirePanel = document.querySelector('.wire-panel');
const startInfo = document.querySelector('.start-info');
const startDiv = document.querySelector('.startDiv');
const warningLabel = document.querySelector('.backgroundInfo');

function boom() {
  wipe.classList.add('hidden')
  wipe.classList.add('boom')
};



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

function resetGame() {
  prompt = [];
  playerPrompt = [];
  step = 0;
  row1.classList.add('unclickable');
  row2.classList.add('unclickable');
  resetBtn.classList.remove('unclickable');
  errorInfo.classList.remove('hidden')
  info.classList.add('hidden');
  errorInfo.textContent = 'INVALID CODE.. RESET DISARM'
  resets -= 1;
  if (resets == -1) {
    boom();
  }
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
  // a variable for it then (variable.textContent =)

  const nextPrompt = [...prompt];
  nextPrompt.push(nextStep());
  playRound(nextPrompt);
  
  prompt = [...nextPrompt];
  setTimeout(() => {
    playerTurn(step);
  }, step * 600 + 1000);
}

function playerClick(box) {
  const index = playerPrompt.push(box) - 1;
  // const sound = document.querySelector(`[data-sound='${box}']`);
  // sound.play();
  if (playerPrompt[index] !== prompt[index]){
  resetGame();
    return;
  }
  if (playerPrompt.length === prompt.length) {
    playerPrompt = [];
    info.textContent = 'VALID CODE.. CONTINUE';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
  //This would be the spot to add a tracker of how many button 
  //presses are left to complete the current round.  
  //this could be tracked with playerPrompt.length - prompt.length 
  //then displayed somewhere on the screen using ${  }
}
function startTimer(){
let minute = 3;
let sec = 59;
setInterval(function() {
  document.getElementById("timer").innerHTML = '0' + `${minute}` + ":" + `${sec}`;
  sec--;
  if (sec == 0 && minute > 0) {
    minute --;
    sec = 59;
  }
  if (sec <= 9 && sec > 0) {
    sec = `0${sec}`;
  }
  if (minute == 0 && sec == 0) {
    boom();
  }
}, 1000);
}

function restartPrompts() {
  resetBtn.classList.add('unclickable')
  row1.classList.remove('unclickable')
  row2.classList.remove('unclickable')
  info.classList.remove('hidden')
  errorInfo.classList.add('hidden')
  resetCounter.textContent = `${resets}`;
  nextRound()
}

function startGame() {
  startBtn.classList.add('hidden');
  wirePanel.classList.remove('hidden');
  startInfo.classList.add('hidden');
  info.classList.remove('hidden');
  warningLabel.classList.add('hidden');
  info.textContent = '...PLAYING REFERENCE CODE...';
  startTimer();
  nextRound();
}


startBtn.addEventListener("click", startGame)
wirePanel.addEventListener('click', event => {
  const { box } = event.target.dataset;

  if (box) playerClick(box);
})

resetBtn.addEventListener('click', restartPrompts)


