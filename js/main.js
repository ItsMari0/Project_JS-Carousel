/*<ul id="slides" class="slides">
<li class="slide active">Slide 1</li>
<li class="slide">Slide 2</li>
<li class="slide">Slide 3</li>
<li class="slide">Slide 4</li>
<li class="slide">Slide 5</li>
</ul> */

const slides = document.querySelectorAll(".slide");
const pauseBtn = document.querySelector("#pause-btn");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

const SLIDES_COUNT = slides.length;
const PAUSE = 'Pause';
const PLAY = 'Play';
let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function goToNth(n) {
    slides[currentSlide].className = "slide";
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].className = "slide active";
}

function goToPrev() {
    goToNth(currentSlide - 1);
}

function goToNext() {
    goToNth(currentSlide + 1);
}

function pause() {
    isPlaying = false;
    pauseBtn.innerHTML = PLAY;
    clearInterval(timerID);
}

function play() {
    isPlaying = true;
    pauseBtn.innerHTML = PAUSE;
    timerID = setInterval(goToNext, interval);
}

function pausePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function prev() {
    pause();
    goToPrev();
}

function next() {
    pause();
    goToNext();
}

pauseBtn.addEventListener("click", pausePlay);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

timerID = setInterval(goToNext, interval);