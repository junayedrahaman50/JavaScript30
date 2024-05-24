let countdown; // declare countodown in global scope, outside fn
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
// select all buttons with data-time attribute
const buttons = document.querySelectorAll("[data-time]");

// seconds = number of seconds we want timer to run
function timer(seconds) {
  // Clear any existing intervals
  clearInterval(countdown);
  const now = Date.now(); // static method to get timestamp in milliseconds
  const then = now + seconds * 1000;

  // get initial second
  displayTimeLeft(seconds);
  displayEndTime(then); // pass the timer end time timestamp

  // update countdown
  countdown = setInterval(() => {
    // how much time is left on the clocks
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// fn to display seconds, minute
function displayTimeLeft(seconds) {
  // calculate minutes left
  const minutes = Math.floor(seconds / 60); // we don't want decimal point we need whole minute so we'll grab the lower bound using math.floor
  // the amount of seonds left excluding the minute like the 14 second in 2:14
  const remainderSeconds = seconds % 60;

  //  display time in MM:SS format
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  // set it in the dom
  timerDisplay.textContent = display;
  document.title = display; // show the countdown also in page title
}

// for 5min timer starting from 2:30pm end time will be 2:35pm
function displayEndTime(timestamp) {
  const end = new Date(timestamp); // create new date object from timestamp
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${
    hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  }:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
  // console.log(this.dataset); // e.g. for data-time="20" this.dataset will be {time:20}
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop it from making request
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});

/* Note: Date.now() gives us the timestamp that's the number of miliseconds elapsed from january 1st 1970, now if we pass this timestamp as argument in new Date() we will get the date as string */
