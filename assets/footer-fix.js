// Force footer links to scroll to top
document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('footer a[href*="accessibility"], footer a[href*="privacy"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.scrollTo(0, 0);
        });
    });
});
