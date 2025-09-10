document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
  if (logo) {
    logo.style.display = 'flex';
    logo.style.alignItems = 'center';
  }
  const toggle = document.querySelector('.menu-toggle');
  const dropdownLinks = document.querySelectorAll('.dropdown > a');

  if (toggle) {
    toggle.addEventListener('click', () => {
      header.classList.toggle('open');
    });
  }

  dropdownLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  if (window.AOS) {
    AOS.init();
  }
});