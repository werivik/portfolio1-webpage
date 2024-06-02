document.addEventListener('DOMContentLoaded', (event) => {

    function initializeSlideshow(containerClass) {
        const container = document.querySelector(containerClass);

        if (container) {
            const mainImage = container.querySelector('.slideshow-main img');
            const mainDesc = container.querySelector('.slideshow-main .desc p');
            const thumbnails = container.querySelectorAll('.slideshow-image img');
            const descs = container.querySelectorAll('.slideshow-image .desc p');
            const leftArrow = container.querySelector('.left');
            const rightArrow = container.querySelector('.right');
            const progress = container.querySelector('.progress');
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
        }
    }

    initializeSlideshow('.web1');
    initializeSlideshow('.web2');
    initializeSlideshow('.web3');

});