/*<ul id="slides" class="slides">
<li class="slide active">Slide 1</li>
<li class="slide">Slide 2</li>
<li class="slide">Slide 3</li>
<li class="slide">Slide 4</li>
<li class="slide">Slide 5</li>
</ul> */
//swipe
const container = document.querySelector('#carousel');
const slides = container.querySelectorAll(".slide");
const indicatorsContainer = container.querySelector('#indicators-container')
const indicators = indicatorsContainer.querySelectorAll('.indicator')
const pauseBtn = container.querySelector("#pause-btn");
const prevBtn = container.querySelector("#prev-btn");
const nextBtn = container.querySelector("#next-btn");



const SLIDES_COUNT = slides.length;
const PAUSE = 'Pause';
const PLAY = 'Play';
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';
const CODE_SPACE = 'Space';

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;
let swipeStartX = null;
let swipeEndX = null;

function goToNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
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

function indicate(e) {
    const target = e.target;
    if (target.classList.contains('indicator')) {
        pause();
    }
    // console.log(target.getAttribute('data-slide-to')); // выведет строку, т.к значение атрибута это строка;
    // we can change this construction:
    // goToNth(Number(target.getAttribute('data-slide-to')));
    // on this construction:
    goToNth(Number(target.dataset.slideTo));
    /* data- ==> dataset;
        slide-to ==>slideTo;*/

}

function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
}

function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -100) prev();
    if (swipeStartX - swipeEndX > 100) next();
}

function initListener() {
    pauseBtn.addEventListener("click", pausePlay);
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
    indicatorsContainer.addEventListener('click', indicate);

    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
}

function init() {
    initListener();
    timerID = setInterval(goToNext, interval);
}
init();