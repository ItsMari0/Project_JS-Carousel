class Carousel {
    constructor(params) {
        const settings = this.initConfig(params)
        this.container = document.querySelector(settings.containerID);
        this.slides = this.container.querySelectorAll(settings.slideID);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;
        this.direction = settings.direction;
    }
    initConfig(objectParams) {
        console.log(objectParams);
        const defaultSettings = {
            containerID: '#carousel',
            slideID: '.slide',
            interval: 2000,
            isPlaying: true,
            direction: 'forward',
        }
        console.log(defaultSettings);
        /* if (typeof objectParams !== 'undefined') {
             defaultSettings.containerID = objectParams.containerID || defaultSettings.containerID;
             defaultSettings.slideID = objectParams.slideID || defaultSettings.slideID;
             defaultSettings.interval = objectParams.interval || defaultSettings.interval;
             defaultSettings.isPlaying = objectParams.isPlaying || defaultSettings.isPlaying;
             defaultSettings.direction = objectParams.direction || defaultSettings.direction;
         } */

        return defaultSettings;
    }

    initProps() {
        this.currentSlide = 0;
        this.SLIDES_COUNT = this.slides.length;
        this.PAUSE = 'Pause';
        this.PLAY = 'Play';
        this.CODE_LEFT_ARROW = 'ArrowLeft';
        this.CODE_RIGHT_ARROW = 'ArrowRight';
        this.CODE_SPACE = 'Space';
    }
    initIndicators() {
        const indicators = document.createElement('div');
        indicators.setAttribute('class', 'indicators');
        for (let i = 0; i < this.SLIDES_COUNT; i++) {
            const indicator = document.createElement('div');
            indicator.setAttribute('class', 'indicator');
            indicator.setAttribute('data-slide-to', i);
            i === 0 && indicator.classList.add('active');
            indicators.append(indicator);
        }
        this.container.append(indicators);
        this.indicatorsContainer = this.container.querySelector('.indicators')
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator')
    }
    initControls() {
        const controls = document.createElement('div');
        const PAUSE = '<span id="pause-btn" class="control control-pause">Pause</span>';
        const PREV = '<span id="prev-btn" class="control control-prev">Previous</span>';
        const NEXT = '<span id="next-btn" class="control control-next">Next</span>';
        controls.setAttribute('class', 'controls');
        controls.innerHTML = PREV + PAUSE + NEXT;
        this.container.append(controls);

        this.pauseBtn = this.container.querySelector("#pause-btn");
        this.prevBtn = this.container.querySelector("#prev-btn");
        this.nextBtn = this.container.querySelector("#next-btn");
    }
    initListeners() {
        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this.indicate.bind(this));
        document.addEventListener('keydown', this.pressKey.bind(this));
    }
    goToNth(n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    }

    goToPrev() {
        this.goToNth(this.currentSlide - 1);
    }

    goToNext() {
        this.goToNth(this.currentSlide + 1);
    }

    pause() {
        this.isPlaying = false;
        this.pauseBtn.innerHTML = this.PLAY;
        clearInterval(this.timerID);
    }

    play() {
        this.isPlaying = true;
        this.pauseBtn.innerHTML = this.PAUSE;
        this.tick();
    }
    indicate(e) {
        const target = e.target;
        if (target.classList.contains('indicator')) {
            this.pause();

            // console.log(target.getAttribute('data-slide-to')); // ?????????????? ????????????, ??.?? ???????????????? ???????????????? ?????? ????????????;
            // we can change this construction:
            // goToNth(Number(target.getAttribute('data-slide-to')));
            // on this construction:
            this.goToNth(Number(target.dataset.slideTo));
        }
        /* data- ==> dataset;
            slide-to ==>slideTo;*/

    }
    pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    }
    tick() {
        this.timerID = setInterval(() => this.goToNext(), this.interval);
    }
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    }

    prev() {
        this.pause();
        this.goToPrev();
    }

    next() {
        this.pause();
        this.goToNext();
    }

    init() {
        this.initProps();
        this.initControls();
        this.initIndicators();
        this.initListeners();
        this.tick();
    }
}