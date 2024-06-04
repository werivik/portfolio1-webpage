document.addEventListener('DOMContentLoaded', (event) => {

    function initializeSlideshow(containerClass) {
        const container = document.querySelector(containerClass);

        if (container) {
            const mainImage = container.querySelector('.slideshow-main img');
            const mainDesc = container.querySelector('.slideshow-main .desc p');
            const thumbnails = Array.from(container.querySelectorAll('.slideshow-image img'));
            const descs = Array.from(container.querySelectorAll('.slideshow-image .desc p'));
            const leftArrow = container.querySelector('.left');
            const rightArrow = container.querySelector('.right');
            const progress = container.querySelector('.progress');
            const slideshowImages = container.querySelector('.slideshow-images');
            let currentIndex = 0;
            let isZoomed = false;
            let zoomedImageContainer = null;

            function updateMainContent(index) {
                mainImage.src = thumbnails[index].src;
                mainDesc.textContent = descs[index].textContent;
                progress.textContent = `${index + 1} / ${thumbnails.length}`;
            }

            function reorderImages() {

                const orderedThumbnails = thumbnails.slice(currentIndex + 1).concat(thumbnails.slice(0, currentIndex)).slice(0, thumbnails.length - 1);
                const orderedDescs = descs.slice(currentIndex + 1).concat(descs.slice(0, currentIndex)).slice(0, descs.length - 1);
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
                        currentIndex = (index + currentIndex + 1) % thumbnails.length;
                        updateMainContent(currentIndex);
                        reorderImages();
                    });
                });
            }

            function showNextImage() {
                currentIndex = (currentIndex + 1) % thumbnails.length;
                updateMainContent(currentIndex);
                reorderImages();
                
                if (isZoomed) {
                    updateZoomedImage(currentIndex);
                }
            }

            function showPrevImage() {
                currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
                updateMainContent(currentIndex);
                reorderImages();
               
                if (isZoomed) {
                    updateZoomedImage(currentIndex);
                }
            }

            function createZoomedImageContainer() {
                const container = document.createElement('div');
                container.classList.add('zoomed-image-container');
                container.style.position = 'fixed';
                container.style.top = '0';
                container.style.left = '0';
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.alignItems = 'center';
                container.style.backgroundColor = 'rgba(0, 0, 0, 0.600)';
                container.style.backdropFilter = 'blur(5px)';
                container.style.zIndex = '1000';
                container.innerHTML = `
                    <img src="" alt="">
                    <div class="arrows">
                        <div class="left"><i class="fa-solid fa-caret-left"></i></div>
                        <div class="right"><i class="fa-solid fa-caret-right"></i></div>
                    </div>
                `;
                document.body.appendChild(container);
                return container;
            }

            function updateZoomedImage(index) {
                const zoomedImage = zoomedImageContainer.querySelector('img');
                zoomedImage.src = thumbnails[index].src;
            }

            function toggleZoom() {
                if (isZoomed) {
                    zoomedImageContainer.remove();
                } 
                
                else {
                    zoomedImageContainer = createZoomedImageContainer();
                    const zoomedImage = zoomedImageContainer.querySelector('img');
                    zoomedImage.src = mainImage.src;
                    zoomedImage.addEventListener('click', toggleZoom);
                    zoomedImageContainer.querySelector('.left').addEventListener('click', showPrevImage);
                    zoomedImageContainer.querySelector('.right').addEventListener('click', showNextImage);
                }
                isZoomed = !isZoomed;
            }

            rightArrow.addEventListener('click', showNextImage);
            leftArrow.addEventListener('click', showPrevImage);
            mainImage.addEventListener('click', toggleZoom);

            thumbnails.forEach((thumbnail, index) => {

                thumbnail.addEventListener('click', () => {

                    currentIndex = index;
                    updateMainContent(currentIndex);
                    reorderImages();
                });
            });

            updateMainContent(currentIndex);
            reorderImages();
        }
    }

    initializeSlideshow('.web1');
    initializeSlideshow('.web2');
    initializeSlideshow('.web3');
});