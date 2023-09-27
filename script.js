const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;
  
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this; 
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

 
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 750);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// 起始時間(計時器的啟動時間)。
const startTime = new Date().getTime();

// 目標時間(要倒數幾秒)。
const targetSeconds = 30;

// 初始化。
init(targetSeconds);

// timer.
var timer = function (startTime) {
  // 當前時間。
  var currentTime = new Date().getTime();
  
  // 當前時間 - 起始時間 = 經過時間。(因為不需要毫秒，所以將結果除以1000。)
  var diffSec = Math.round((currentTime - startTime) / 1000);
  
  // 目標時間 - 經過時間 = 剩餘時間。
  var remainingTime = targetSeconds - diffSec;
  
  // update progess.  
  update(remainingTime);   
  
  if (remainingTime == 0) {
    // stop the timer.
    clearInterval(timerId);
    
    // do anything you want to.
    $(".msg").text("可憐");
  } 
}

// start the timer.
var timerId = setInterval( function () { timer(startTime); }, 1000);

// 初始化。此處借用update函式來初次設定進度條。
function init(seconds) {
  update(seconds);
}

// update progess with the timer.
function update (seconds) {
  barRenderer(seconds);
  textRenderer(seconds);
}

// refresh the bar.
function barRenderer (seconds) {
  var percent = (seconds / targetSeconds) * 100;
  $(".bar").css("width", percent + "%");
}

// refresh the text of the bar.
function textRenderer (seconds) {
  var sec = seconds % 60;  
  var min = Math.floor(seconds / 60); 

  /* 兩種作法都可以 */
  //min = min > 9 ? min : "0" + min;
  //sec = sec > 9 ? sec : "0" + sec;  
  min = min.toString().padStart(2, '0');
  sec = sec.toString().padStart(2, '0');
  
  $(".text").text(min + ":" + sec);		
}
