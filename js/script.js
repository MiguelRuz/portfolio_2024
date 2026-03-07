document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
      menuWidth: 300, // El ancho del menú
      edge: 'left', // El lado desde donde aparece el menú
      draggable: true // Si es arrastrable en pantallas táctiles
    });
  });

const images = [
  "images/hero1.jpg",
  "images/hero2.jpg",
  "images/hero3.jpg",
  "images/hero4.jpg",
  "images/hero5.jpg"
];

let index = 0;
const hero = document.getElementById("hero-image");

setInterval(() => {
  index = (index + 1) % images.length;
  hero.style.opacity = 0;

  setTimeout(() => {
    hero.src = images[index];
    hero.style.opacity = 1;
  }, 700);

}, 7000);  