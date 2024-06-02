document.addEventListener('DOMContentLoaded', (event) => {

    const mainImage = document.querySelector('.slideshow-main img');
    const thumbnails = document.querySelectorAll('.slideshow-image img');
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');
    const progress = document.querySelector('.progress');

    let currentIndex = 0;

    function updateMainImage(index) {
        mainImage.src = thumbnails[index].src;
        progress.textContent = `${index + 1} / ${thumbnails.length + 1}`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(currentIndex);
    }

    function showPrevImage() {
        currentINdex = (currentINdex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(currentIndex);
    }

    rightArrow.addEventListener('click', () => {
        showNextImage();
    });

    leftArrow.addEventListener('click', () => {
        showPrevImage();
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage(currentIndex)
        });
    });

    updateMainImage(currentIndex);
});