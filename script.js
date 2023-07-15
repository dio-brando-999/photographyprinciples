//compositionJS code

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var threshold = 900; // Scroll position threshold; adjust as needed
  var startColor = "#c095ff"; // Initial background color (purple)
  var endColor = "#000000"; // Target background color (black)
  var transitionDuration = 0.7; // Transition duration in seconds

  var progress = Math.min(scrollPosition / threshold, 1);
  progress = Math.pow(progress, 2); // Adjust the rate of change by applying a power to progress

  var color = interpolateColors(startColor, endColor, progress);
  document.body.style.backgroundColor = color;
  document.body.style.transitionDuration = transitionDuration + "s";

  var lightbulb = document.getElementById("lightbulb");

  var room = document.querySelector(".Room");

  var roomOffset = room.offsetTop;

  if (window.pageYOffset > roomOffset - threshold) {
    room.classList.add("entered");
    lightbulb.style.display = "block";
    room.style.opacity = 1; // Set opacity to 1 when entered
  } else {
    room.classList.remove("entered");
    lightbulb.style.display = "none";
    room.style.opacity = ""; // Reset opacity to default when not entered
  }
});

// Rest of the code remains the same

function interpolateColors(startColor, endColor, progress) {
  var startRGB = hexToRGB(startColor);
  var endRGB = hexToRGB(endColor);

  var interpolatedRGB = interpolateRGB(startRGB, endRGB, progress);
  return RGBToHex(interpolatedRGB);
}

function hexToRGB(hexColor) {
  var hex = hexColor.slice(1); // Remove the '#' character
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);
  return { r: r, g: g, b: b };
}

function interpolateRGB(startRGB, endRGB, progress) {
  var r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * progress);
  var g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * progress);
  var b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * progress);
  return { r: r, g: g, b: b };
}

function RGBToHex(rgbColor) {
  var rHex = rgbColor.r.toString(16).padStart(2, "0");
  var gHex = rgbColor.g.toString(16).padStart(2, "0");
  var bHex = rgbColor.b.toString(16).padStart(2, "0");
  return "#" + rHex + gHex + bHex;
}
var audioText = document.querySelector(".audio-text");
var audioElement = new Audio("compositionAudioPrompt1.mp3");

audioText.addEventListener("mouseenter", function () {
  audioElement.play();
});

audioText.addEventListener("mouseleave", function () {
  audioElement.pause();
});

var navbarToggle = document.querySelector(".navbar-toggle");
var navbarMenu = document.querySelector(".navbar-menu");

navbarToggle.addEventListener("click", function () {
  navbarMenu.classList.toggle("active");
});
