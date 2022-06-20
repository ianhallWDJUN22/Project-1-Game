
let startBtn = document.getElementById('btnStart');
startBtn.addEventListener("click", startGame)

function startGame() {
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


// function computeTwoDigitNumber(value) {
//   if (value > 9) { 
// return value.toString()
//  } else return '0' + value
// };