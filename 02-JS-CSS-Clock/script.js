// select the hands
const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
function setDate() {
  // grab current date
  const now = new Date();
  // grab current seconds
  // that gives us seconds of current minute
  // rotate secondHand
  const seconds = now.getSeconds();
  // turn seconds into base 100 and add offset of 90deg
  const secondDegrees = (seconds / 60) * 360 + 90;
  // glitch fix: removing transition when it's 90deg
  if (secondDegrees === 90) {
    secondHand.style.transition = "none";
  } else {
    // set transition and timing function back on
    secondHand.style.transition = "all 0.05s";
    secondHand.style.transitionTimingFunction =
      "cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  // add degrees to rotate
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
  // rotate minHand
  const mins = now.getMinutes();
  const minsDegrees = (mins / 60) * 360 + 90;
  // glitch fix
  if (minsDegrees === 90) {
    minHand.style.transition = "none";
  } else {
    minHand.style.transition = "all 0.05s";
    minHand.style.transitionTimingFunction = "cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  minHand.style.transform = `rotate(${minsDegrees}deg)`;
  // rotate hourHand
  const hours = now.getHours();
  const hourDegrees = (hours / 12) * 360 + 90;
  // glitch fix
  if (hourDegrees === 90) {
    hourHand.style.transition = "none";
  } else {
    hourHand.style.transition = "all 0.05s";
    hourHand.style.transitionTimingFunction = "cubic-bezier(0.1, 2.7, 0.58, 1)";
  }
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
// run setDate function every second
setInterval(setDate, 1000);
// call it on load
setDate();
