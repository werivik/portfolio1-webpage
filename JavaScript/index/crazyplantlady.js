document.addEventListener('DOMContentLoaded', (event) => {
    
    const mainImage = document.querySelector('.slideshow-main img');
    const mainDesc = document.querySelector('.slideshow-main .desc p');
    const thumbnails = document.querySelectorAll('.slideshow-image img');
    const descs = document.querySelectorAll('.slideshow-image .desc p');
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');
    const progress = document.querySelector('.progress');
    let currentIndex = 0;

    function updateMainContent(index) {
        mainImage.src = thumbnails[index].src;
        mainDesc.textContent = descs[index].textContent;
        progress.textContent = `${index + 1} / ${thumbnails.length}`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        updateMainContent(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainContent(currentIndex);
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
            updateMainContent(currentIndex);
        });
    });

    updateMainContent(currentIndex);
});