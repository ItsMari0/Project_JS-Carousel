/*<ul id="slides" class="slides">
<li class="slide active">Slide 1</li>
<li class="slide">Slide 2</li>
<li class="slide">Slide 3</li>
<li class="slide">Slide 4</li>
<li class="slide">Slide 5</li>
</ul> */
//swipe

//const { pause } = require("browser-sync");

function Carousel() {
    this.container = document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll(".slide");
    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator')
    this.pauseBtn = this.container.querySelector("#pause-btn");
    this.prevBtn = this.container.querySelector("#prev-btn");
    this.nextBtn = this.container.querySelector("#next-btn");

    this.SLIDES_COUNT = this.slides.length;
    this.PAUSE = 'Pause';
    this.PLAY = 'Play';
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.currentSlide = 0;
    this.isPlaying = true;
    this.timerID = null;
    this.interval = 2000;
    this.swipeStartX = null;
    this.swipeEndX = null;
}

Carousel.prototype = {
    goToNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    },

    goToPrev() {
        this.goToNth(this.currentSlide - 1);
    },

    goToNext() {
        this.goToNth(this.currentSlide + 1);
    },

    pause() {
        this.isPlaying = false;
        this.pauseBtn.innerHTML = this.PLAY;
        clearInterval(this.timerID);
    },

    play() {
        this.isPlaying = true;
        this.pauseBtn.innerHTML = this.PAUSE;
        this.timerID = setInterval(this.goToNext, this.interval);
    },

    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    },


    prev() {
        this.pause();
        this.goToPrev();
    },

    next() {
        this.pause();
        this.goToNext();
    },

    indicate(e) {
        const target = e.target;
        if (target.classList.contains('indicator')) {
            this.pause();

            // console.log(target.getAttribute('data-slide-to')); // выведет строку, т.к значение атрибута это строка;
            // we can change this construction:
            // goToNth(Number(target.getAttribute('data-slide-to')));
            // on this construction:
            this.goToNth(Number(target.dataset.slideTo));
        }
        /* data- ==> dataset;
            slide-to ==>slideTo;*/

    },

    pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },

    swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    },

    swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX < -100) this.prev();
        if (this.swipeStartX - this.swipeEndX > 100) this.next();
    },

    initListener() {
        this.pauseBtn.addEventListener("click", this.pausePlay);
        this.prevBtn.addEventListener("click", this.prev);
        this.nextBtn.addEventListener("click", this.next);
        this.indicatorsContainer.addEventListener('click', this.indicate);

        document.addEventListener('keydown', this.pressKey);
        this.container.addEventListener('touchstart', this.swipeStart);
        this.container.addEventListener('touchend', this.swipeEnd);
    },

    init() {
        this.initListener();
        this.timerID = setInterval(this.goToNext.bind(this), this.interval);
    }
}
Carousel.prototype.construct = Carousel;
const carousel = new Carousel();


carousel.init();