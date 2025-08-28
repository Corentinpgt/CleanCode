// Responsive Header optimisé
(function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const navbarLinks = Array.from(document.querySelectorAll('.navbar__link__submenu'));
    const linkIdToSubmenu = new Map(
        navbarLinks.map(link => [link.id, document.getElementById(link.id + '-submenu')])
    );

    // Scroll handler: passive + rAF + toggle conditionnel
    let lastSticky = navbar.classList.contains('sticky');
    let scrollScheduled = false;

    const handleScroll = () => {
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(() => {
            const shouldBeSticky = window.scrollY >= 1;
            if (shouldBeSticky !== lastSticky) {
                navbar.classList.toggle('sticky', shouldBeSticky);
                lastSticky = shouldBeSticky;
            }
            scrollScheduled = false;
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Helpers sous-menus
    let currentOpenLinkId = null;

    const showSubmenu = (link) => {
        const submenu = linkIdToSubmenu.get(link.id);
        if (!submenu) return;
        submenu.style.display = 'flex';
        setTimeout(() => {
            submenu.style.opacity = '1';
        }, 50);
        if (submenu.parentElement !== navbar) {
            navbar.appendChild(submenu);
        }
        currentOpenLinkId = link.id;
    };

    const hideSubmenu = (link) => {
        const submenu = linkIdToSubmenu.get(link.id);
        if (!submenu) return;
        submenu.style.opacity = '0';
        submenu.style.display = 'none';
    };

    const hideAllSubmenus = () => {
        for (const link of navbarLinks) hideSubmenu(link);
        currentOpenLinkId = null;
    };

    // Écouteurs: un seul mouseleave sur la navbar, un mouseenter par lien (fermer si même lien)
    for (const link of navbarLinks) {
        link.addEventListener('mouseenter', () => {
            if (currentOpenLinkId === link.id) {
                // Re-survol du même lien: fermer le sous-menu actuel uniquement
                hideSubmenu(link);
                currentOpenLinkId = null;
                return;
            }
            hideAllSubmenus();
            navbar.classList.add('sticky');
            lastSticky = true;
            showSubmenu(link);
        });
    }

    // Liens sans sous-menu: fermer tout sous-menu au survol
    const allNavItems = Array.from(navbar.querySelectorAll('.navbar__upper ul li'));
    for (const item of allNavItems) {
        if (!item.classList.contains('navbar__link__submenu')) {
            item.addEventListener('mouseenter', () => {
                hideAllSubmenus();
            });
        }
    }

    navbar.addEventListener('mouseleave', () => {
        hideAllSubmenus();
        if (window.scrollY > 0) {
            return;
        }
        navbar.classList.remove('sticky');
        lastSticky = false;
    });
})();