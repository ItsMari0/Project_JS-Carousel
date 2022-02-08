/*<ul id="slides" class="slides">
<li class="slide active">Slide 1</li>
<li class="slide">Slide 2</li>
<li class="slide">Slide 3</li>
<li class="slide">Slide 4</li>
<li class="slide">Slide 5</li>
</ul> */

const slides = document.querySelectorAll(".slide");
const pauseButton = document.querySelector("#pause");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

const SLIDES_COUNT = slides.length;
let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function goToSlide(n) {
  slides[currentSlide].className = "slide";
  currentSlide = n % SLIDES_COUNT;
  slides[currentSlide].className = "slide active";
}
function prevSlide() {
  goToSlide(currentSlide - 1);
}
function nextSlide() {
  goToSlide(currentSlide + 1);
}
function pauseHandler() {
  isPlaying = false;
  pauseButton.innerHTML = "Play";
  clearInterval(timerID);
}

function playHandler() {
  isPlaying = true;
  pauseButton.innerHTML = "Pause";
  timerID = setInterval(nextSlide, interval);
}

function pause() {
  if (isPlaying) {
    pauseHandler();
  } else {
    playHandler();
  }
}

function prevHandler() {
  pauseHandler();
  prevSlide();
}

function nextHandler() {
  pauseHandler();
  nextSlide();
}

pauseButton.addEventListener("click", pause);
previousButton.addEventListener("click", prevHandler);
nextSlide.addEventListener("click", nextSlide);

timerID = setInterval(nextSlide, interval);
