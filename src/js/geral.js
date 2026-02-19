document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links'); 
    const navLinks = document.querySelectorAll('.nav-links ul li a'); 

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active'); 
            menuToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', () => {
                    navLinksContainer.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            }
        });
    }
});