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

            function reorderImages() {

                const orderedThumbnails = thumbnails.slice(currentIndex).concat(thumbnails.slice(0, currentIndex));
                const orderedDescs = desc.slice(currentIndex).concat(desc.slice(0, currentindex));

                slideshowImages.innerHTML = '';
                orderedThumbnails.forEach((thumbnail, index) => {

                    const imageWrapper = document.createElement('div');
                    imageWrapper.classList.add('slideshow-image');
                    const img = document.createElement('img');
                    img.src = thumbnail.src;
                    img.alt = thumbnail.alt;
                    const desc = document.createElement('div');
                    desc.classList.add('desc');
                    const descP = document.createElement('p');
                    descP.textContent = orderedDescs[index].textContent;
                    desc.appendChild(descP);
                    imageWrapper.appendChild(img);
                    imageWrapper.appendChild(desc);
                    slideshowImages.appendChild(imageWrapper);

                    img.addEventListener('click', () => {

                        currentIndex = (index + currentIndex) % thumbnails.length;
                        updateMainContent(currentIndex);
                        reorderImages();

                    });
                });
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