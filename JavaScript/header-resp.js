document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header');
    const toggleIcon = document.createElement('div');

    toggleIcon.classList.add('toggle-icon');
    toggleIcon.innerHTML = '<i class="fa fa-chevron-right"></i>';

    document.body.appendChild(toggleIcon);

    const mainContent = document.querySelector('main');
    const footerContent = document.querySelector('footer');

    function toggleHeader() {

        if (header.classList.contains('hidden')) {
            header.classList.remove('hidden');
            toggleIcon.innerHTML = '<i class="fa fa-chevron-left"></i>';
            toggleIcon.style.left = `${header.offsetWidth}px`;
        } 
        
        else {
            header.classList.add('hidden');
            toggleIcon.innerHTML = '<i class="fa fa-chevron-right"></i>';
            toggleIcon.style.left = '0';
        }

        mainContent.classList.toggle('blur');

        footerContent.classList.toggle('blur');
    }

    toggleIcon.addEventListener('click', toggleHeader);

    function initializeHeader() {

        header.classList.add('hidden');
        toggleIcon.style.left = '0';
        toggleIcon.classList.add('show');
    }

    header.addEventListener('click', () => {
        mainContent.classList.toggle('blur');
        footerContent.classList.toggle('blur');
    });

    initializeHeader();

});