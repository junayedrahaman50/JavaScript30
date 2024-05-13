const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d"); // canvas context
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

// run on page load
getVideo();

// run paintToCanvas when video is playing
video.addEventListener("canplay", paintToCanvas);
