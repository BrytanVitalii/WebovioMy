const body = document.body;
const burger = document.querySelector('.burger-wrapper');
const burgerImg = burger.querySelector('img');
const menu = document.querySelector('.burger-menu');

let menuOpen = false;

// Disable fullscreen burger menu on landscape and min-width:1024px
if (window.matchMedia('(orientation: landscape) and (min-width: 1024px)').matches) {
    const desktopLinks = document.querySelector('.burger-dektop__links');
    burgerImg.addEventListener('click', () => {
        console.log('clicked');
        if (menuOpen) {
            menuOpen = false;
            burgerImg.src = 'assets/burger.svg';

            desktopLinks.classList.remove('burger-dektop__links--visible');
            desktopLinks.classList.add('burger-dektop__links--hidden');

            // Only hide after transition ends
            desktopLinks.addEventListener('transitionend', function handler() {
                if (!menuOpen) {
                    desktopLinks.style.display = 'none';
                }
                desktopLinks.removeEventListener('transitionend', handler);
            });
        }
        else {
            menuOpen = true;
            burgerImg.src = 'assets/close.svg';
            desktopLinks.style.display = 'flex';

            // Force reflow to ensure transition (didn't knew this trick)
            void desktopLinks.offsetWidth;
            desktopLinks.classList.remove('burger-dektop__links--hidden');
            desktopLinks.classList.add('burger-dektop__links--visible');
        }
    });
}
else {
    burger.addEventListener('click', () => {
        console.log('clicked');
        if (menuOpen) {
            menuOpen = false;
            body.classList.remove('disable-scroll');
            menu.classList.remove('burger-menu__slidein');
            menu.classList.add('burger-menu__slideout');

            burgerImg.src = 'assets/burger.svg';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 500);
        }
        else {
            menuOpen = true;
            window.scrollTo({ top: 0, behavior: 'auto' });
            menu.style.display = 'flex';

            body.classList.add('disable-scroll');
            menu.classList.remove('burger-menu__slideout');
            menu.classList.add('burger-menu__slidein');

            burgerImg.src = 'assets/close.svg';
        }
    });
}