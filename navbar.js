const navbar = document.querySelector('.navbar');
const navbarLinks = document.querySelectorAll('.navbar__link');
const submenuLinks = document.querySelectorAll('.navbar__link__submenu');
const submenus = document.querySelectorAll('.navbar__submenu');

// get one submenu from  a submenu link
const getSubmenuFromLink = (link) => {
    return Array.from(submenus).find(submenu => submenu.id === link.id + '-submenu');
};

let submenuOpen = false;

navbarLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (link.classList.contains('navbar__link__submenu')) {
            const submenu = getSubmenuFromLink(link);
            if (isSubmenuOpen(submenu)) {
                closeSubmenu(submenu);
                submenuOpen = false;
                return;
            }
            openSubmenu(submenu);
        } else {
            closeAllSubmenu();
        }
    });
});

// open one submenu
const openSubmenu = (submenu) => {
    closeAllSubmenuExceptOne(submenu);
    navbar.classList.add('sticky');
    submenu.style.display = 'flex';
    setTimeout(() => {
        submenu.style.opacity = '1';
    }, 50);
    setTimeout(() => {
        navbar.style.backgroundColor = 'white';
    }, 200);
    navbar.appendChild(submenu);
    submenuOpen = true;
};

// close one submenu
const closeSubmenu = (submenu) => {
    if (submenu.parentElement === navbar) {
        submenu.style.display = 'none';
        navbar.style.backgroundColor = 'transparent';
        submenu.style.opacity = '0';
        navbar.removeChild(submenu);
    }
    submenuOpen = false;
};

// close all submenus
const closeAllSubmenu = () => {
    submenus.forEach(submenu => {
        closeSubmenu(submenu);
    });
    submenuOpen = false;
};

// close all submenus except one
const closeAllSubmenuExceptOne = (submenuToKeep) => {
    submenus.forEach(submenu => {
        if (submenu === submenuToKeep) {
            return;
        }
        closeSubmenu(submenu);
    });
    submenuOpen = false;
};

const isSubmenuOpen = (submenu) => {
    return submenu.style.display === 'flex';
};

// when mouse leave navbar, close all submenus and unsticky navbar if no scrolling
navbar.addEventListener('mouseleave', () => {
    if (submenuOpen) {
        closeAllSubmenu();
    }
    if (!window.scrollY >= 1) {
        navbar.classList.remove('sticky');
    }
});


// sticky navbar
const handleNavbarSticky = () => {
    if (window.scrollY >= 1) {
        navbar.classList.add('sticky');
    } else {
        if (!submenuOpen) {
            navbar.classList.remove('sticky');
        }
    }
};

window.addEventListener('scroll', handleNavbarSticky);