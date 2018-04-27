import anime from 'animejs'
 

anime({
    targets: '.animateMe',
    translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 }
    ],
    rotate: '1turn',
    backgroundColor: '#FFF',
    duration: 2000,
    loop: true
});