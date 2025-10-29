var slideIndex = 1;
const slides = document.getElementsByClassName("slideshow");
var slideTimer;

showDivs(slideIndex);
resetTimer();

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => plusDivs(1), 5000);
}

function plusDivs(n) {
    showDivs(slideIndex += n);
    resetTimer();
}

function showDivs(n) {
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Loop through ALL slides first
    for (let i = 0; i < slides.length; i++) {
        // Hide the slide
        slides[i].style.display = "none";

        // Find any video inside this slide
        let video = slides[i].querySelector("video");
        if (video) {
            // Pause the video when it's not active
            video.pause();
        }
    }

    // Now, get the ONE slide we want to show
    let activeSlide = slides[slideIndex - 1];

    // Find the video in THAT active slide
    let activeVideo = activeSlide.querySelector("video");
    if (activeVideo) {
        // Reset its time to the beginning
        activeVideo.currentTime = 0;
        // Play the video (see note below)
        activeVideo.play().catch(error => {
            console.log("Video autoplay was prevented by the browser.");
        });
    }

    // Show the active slide
    activeSlide.style.display = "block";
}

window.onkeydown = (gfg) => {
    if (gfg.keyCode === 37) {
        plusDivs(-1)
    } else if (gfg.keyCode === 39) {
        plusDivs(1);
    }
}

const photoContainer = document.getElementById('photos');

let touchstartX = 0;
let touchendX = 0;
const swipeThreshold = 50;

function handleSwipe() {
    const deltaX = touchendX - touchstartX;

    if (Math.abs(deltaX) < swipeThreshold) {
        return;
    }

    if (deltaX < 0) {
        plusDivs(1);
    } else {
        plusDivs(-1);
    }
}

photoContainer.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
}, { passive: true });

photoContainer.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });