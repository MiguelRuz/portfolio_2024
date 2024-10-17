document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
      menuWidth: 300, // El ancho del menú
      edge: 'left', // El lado desde donde aparece el menú
      draggable: true // Si es arrastrable en pantallas táctiles
    });
  });
  