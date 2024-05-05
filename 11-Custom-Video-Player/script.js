/* Get our elements */
const player = document.querySelector(".player");
/* player is the parent of rest elements */
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build our functions */

/* this fn will play/pause the video */
function togglePlay() {
  // using ternary operator and bracket notation
  video[video.paused ? "play" : "pause"]();
}

function updateButton() {
  // (this = video), in one line :
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

// Determine how much to skip using data attributes of buttons
function skip() {
  // skip video forwards/backwards
  video.currentTime += parseFloat(this.dataset.skip);
}
// let isMouseDown = false;
function handleRangeUpdate() {
  // the name attributes are same as video properties
  video[this.name] = this.value; // video.playbackRate/video.volume
  console.log(this.value);
}

function handleProgress() {
  // get percentage of video being played
  const percent = (video.currentTime / video.duration) * 100;
  // flexBasis indicates the progress of progressBar
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // e.g. 300 / 600 = 0.5 * 60 = 30
  video.currentTime = scrubTime;
}

/* Attach the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
// the timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
video.addEventListener("timeupdate", handleProgress); // there is also similar progress event on video
// play button
toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});
// volume and playback rate ranges
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
// flag to check mousedown
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  mousedown && scrub(e); // short circuit and
});
progress.addEventListener("mousedown", () => {
  mousedown = true;
});
progress.addEventListener("mouseup", () => {
  mousedown = false; // on mouseup set it back to false
});

// Challenge implement fullscreen button
