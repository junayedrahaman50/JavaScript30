const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d", { willReadFrequently: true }); // canvas context
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  // this returns a promise
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      //   video.src = window.URL.createObjectURL(localMediaStream); // convert video stream into url that's understandable to video player
      //   live video feed
      video.srcObject = localMediaStream;
      video.play();
    }) // handle webcam access not allowed
    .catch((err) => {
      console.error(`OH No 🤯! ${err}`);
      alert("You Denied the access to the webcam 😠");
    });
}

// paint video to canvas
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  // size of video coming in from webcam
  console.log(width, height);
  // make canvas same size as webcam video feed
  canvas.width = width;
  canvas.height = height;
  // every 16ms take image from webcam and put into canvas
  // return setInterval to have access to it in case we wanna stop it
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); // pass in video or image in drawImage it will paint right to it
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // apply filters / mess with the pixels
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;
    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();
  // Flip the canvas horizontally
  ctx.scale(-1, 1);
  ctx.drawImage(canvas, -canvas.width, 0);
  // take the data out of canvas
  const data = canvas.toDataURL("image/jpeg");
  // Reset the transformation
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // Create a link to download the image
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  // loop over every single pixel
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

// run on page load
getVideo();

// run paintToCanvas when video is playing
video.addEventListener("canplay", paintToCanvas);
