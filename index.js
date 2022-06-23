let prompt = [];
let playerPrompt = [];
let step = 0;
let resets = 2
let highestStreak = 0;
let startBtn = document.getElementById('btnStart');
let resetBtn = document.querySelector('#reset-btn');
let boom1 = document.querySelector('.boom1');
let boom2 = document.querySelector('.boom2');
let boom3 = document.querySelector('.boom3');
let errorInfo = document.querySelector('.error-info');
let wipe = document.querySelector('.full-game');
let allBoxes = document.querySelector('.box');
let winNote = document.querySelector('.winNotes');
const win = document.querySelector('.bombDisarmed');
const row1 = document.querySelector('.row-1');
const row2 = document.querySelector('.row-2');
const resetCounter = document.querySelector('.mistakeCounter');
const info = document.querySelector('.game-info');
const wirePanel = document.querySelector('.wire-panel');
const startInfo = document.querySelector('.start-info');
const startDiv = document.querySelector('.startDiv');
const warningLabel = document.querySelector('.backgroundInfo');

// function pauseAudio() {
//   ambiance.loop = false;
//   ambiance.muted = true;
// }
function boom() {
  ambiance.volume = 0;
  let explosion = new Audio('music/191693__deleted-user-3544904__explosion-3.wav');
  explosion.volume = 0.45;
  console.log(explosion.volume)
  explosion.play();

  wipe.classList.add('hidden');
  boom1.classList.remove('hidden');
  setTimeout(() => {
  boom1.classList.add('hidden');
  }, 20);
  boom2.classList.remove('hidden');
  boom2.classList.add('hidden');
  setTimeout(() => {
  boom3.classList.remove('hidden');
  }, 20);
  
  setTimeout(() => {
  boom3.textContent = 'Whoops'
  }, 3000);

  setTimeout(() => {
  boom3.textContent = `Your highest sequence reached was... ${highestStreak} ... refresh the page to try again.`
  }, 10000);
};

function youWin() {
  ambiance.volume = 0;
  allBoxes.classList.remove('activated');
  prompt = [];
  let winPing = new Audio('music/523763__matrixxx__select-granted-06.wav');
  winPing.volume = 0.3;
  winPing.play();
  let disarm = new Audio('music/169994__peepholecircus__power-down.mp3')
disarm.play();

info.textContent = '-- BOMB DISARMED --'
setTimeout(() => {
  wipe.classList.add('hidden');
  win.classList.remove('hidden');
  let winMusic = new Audio('music/361139__skibkamusic__shine-1-loop.wav');
  winMusic.loop = true;
  winMusic.volume = 0.3
  winMusic.play();
  winNote.innerHTML = `Well done! You disarmed the bomb and earned yourself a final score of ${finalScore}!`<br>`Scores are based on the amount of time you had remaining on the timer.  To see if you can beat your current time refresh this page.`;
}, 4000);

}
function activateBox(color) {
  const box = document.querySelector(`[data-box='${color}']`);
  box.classList.add('activated');
  if (color == 'red') {
    let redPing = new Audio('music/320181__dland__hint.wav');
    redPing.volume = 0.25
    redPing.play();
  }
  if (color == 'yellow') {
    let yellowPing = new Audio('music/520579__divoljud__clickglass.wav');
    yellowPing.volume = 0.4
    yellowPing.play();
  }
  if (color == 'green'){
    let greenPing = new Audio('music/540902__solernix__simple-beep-sound.mp3');
    greenPing.volume = 0.3
    greenPing.play();
  }
  if (color == 'blue'){
    let bluePing = new Audio('music/253168__suntemple__sfx-ui-button-click.wav');
    bluePing.play();
  }
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
  return;
}
  let error = new Audio('music/419023__jacco18__acess-denied-buzz.mp3');
  error.play();
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
  if (playerPrompt[index] !== prompt[index]){
    resetGame();
    return;
  }
  let redPing = new Audio('music/320181__dland__hint.wav');
  if (box == 'red') {
    redPing.volume = 0.25
    redPing.play();
  }
  let yellowPing = new Audio('music/520579__divoljud__clickglass.wav');
  if (box == 'yellow') {
    yellowPing.volume = 0.4
    yellowPing.play();
  }
  let greenPing = new Audio('music/540902__solernix__simple-beep-sound.mp3');
  if (box == 'green'){
    greenPing.volume = 0.3
    greenPing.play();
  }
  let bluePing = new Audio('music/253168__suntemple__sfx-ui-button-click.wav');
  if (box == 'blue'){
    bluePing.play();
  }
  if (playerPrompt.length === prompt.length) {
    playerPrompt = [];
    step += 1;
    
    if (step > highestStreak){
      highestStreak = step
    }
    if (step == 1){
      youWin();
      return;
    } 
    
    info.textContent = 'VALID CODE.. CONTINUE';
    setTimeout(() => {
      
      nextRound();
    }, 1000);
    return;
  }
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
  resetPing = new Audio('music/394155__vacuumfan7072__uiclick1.wav');
  resetPing.volume = 0.50
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
  let openPanel = new Audio('music/394155__vacuumfan7072__uiclick1.wav');
  openPanel.play();
  startTimer();
  nextRound();
  playMusic();
}


let ambiance = new Audio('music/326984__zetauri__zetauri-darkambienceloop-1496110c.wav');

function playMusic() {
  ambiance.volume = 0.15;
  ambiance.loop = true;
  ambiance.play();
  
  };
  
  startBtn.addEventListener("click", startGame)
  wirePanel.addEventListener('click', event => {
    const { box } = event.target.dataset;
    if (box) playerClick(box);
  })

resetBtn.addEventListener('click', restartPrompts)





