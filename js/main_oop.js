//swipe
//const { pause } = require("browser-sync");


const сarousel = new SwipeCarousel({
    containerID: '#slider',
    //   slideID: 'item',
    interval: 1000,
    //   isPlaying: false,
    direction: 'backward'
});


сarousel.init();