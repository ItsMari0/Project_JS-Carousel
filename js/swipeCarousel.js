class SwipeCarousel extends Carousel {
    initListeners() {
        super.initListeners();
        this.container.addEventListener('touchstart', this.swipeStart.bind(this));
        this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    }

    swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].pageX;
    }
    swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX < -100) this.prev();
        if (this.swipeStartX - this.swipeEndX > 100) this.next();
    }
}