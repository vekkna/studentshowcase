var slideIndex = 1;
const slides = document.getElementsByClassName("slideshow");
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

window.onkeydown = (gfg) => {
    if (gfg.keyCode === 37) {
        plusDivs(-1)
    }
    else if (gfg.keyCode === 39) {
        plusDivs(1);
    }
}

setInterval(() => plusDivs(1), 5000);