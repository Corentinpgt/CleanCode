const responsiveModal = document.querySelector('.responsive');
let hideTimer;

window.addEventListener('resize', () => {
  responsiveModal.classList.add('show');

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    responsiveModal.classList.remove('show');
  }, 200); 
});
