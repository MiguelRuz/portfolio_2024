// Inicializar el índice del proyecto actual
var currentProjectIndex = 0;

// Obtener automáticamente todos los proyectos con la clase 'project-item' y generar el array de IDs
var projects = Array.from(document.querySelectorAll('.project-item'))
    .map(item => item.id)
    .sort((a, b) => {
        // Ordenar por número extraído del ID (asumiendo que los IDs son del tipo "projectX")
        return parseInt(b.replace('project', '')) - parseInt(a.replace('project', ''));
    });

console.log(projects); // Para verificar que los proyectos se están ordenando correctamente

// Modificar la función showProject para que se desplace hacia arriba al cambiar de proyecto
function showProject(projectId) {
    var projectInfo = document.querySelector('.project-info');
    var sidebar = document.getElementById('sidebar');
    
    projectInfo.classList.remove('show'); // Ocultar con fundido
    setTimeout(function() {
        if (document.getElementById(projectId)) {
            projectInfo.innerHTML = document.getElementById(projectId).innerHTML; // Asegúrate de que el ID existe
            projectInfo.classList.add('show'); // Mostrar con fundido
            addNavigationListeners(); // Añadir listeners a los botones de navegación
            
            // Desplazarse hacia arriba
            scrollToTop();

            // Cerrar el menú en móviles al hacer clic en un proyecto
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    }, 500); // Esperar 500ms antes de mostrar el siguiente proyecto
}

// Función para mostrar el proyecto basado en el índice
function showProjectByIndex(index) {
    currentProjectIndex = index;
    showProject(projects[currentProjectIndex]);
}

// Función para cargar el primer proyecto cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    showProjectByIndex(0);  // Muestra el proyecto más reciente por defecto
    addClickListenerToProjects();  // Añadir listeners a los proyectos
});

// Función para mostrar/ocultar el menú en móviles
function toggleMenu() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active'); // Alternar la clase 'active' para mostrar/ocultar
}

// Función para añadir listeners a los botones de navegación
function addNavigationListeners() {
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    var homeBtn = document.getElementById('home-btn');

    if (prevBtn && nextBtn && homeBtn) {
        prevBtn.onclick = prevProject;
        nextBtn.onclick = nextProject;
        homeBtn.onclick = goToHome;
    }
}

// Función para avanzar al siguiente proyecto
function nextProject() {
    currentProjectIndex = (currentProjectIndex < projects.length - 1) ? currentProjectIndex + 1 : 0; // Volver al primer proyecto si estamos en el último
    showProjectByIndex(currentProjectIndex);
}

// Función para retroceder al proyecto anterior
function prevProject() {
    currentProjectIndex = (currentProjectIndex > 0) ? currentProjectIndex - 1 : projects.length - 1; // Ir al último proyecto si estamos en el primero
    showProjectByIndex(currentProjectIndex);
}

// Función para ir a la página de inicio (proyecto 1)
function goToHome() {
    window.location.href = 'index.html'; // Redirigir a index.html
    
}

// Función para desplazarse al inicio de la página al mostrar un nuevo proyecto
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Hacer que el desplazamiento sea suave
    });
}

// Función para cerrar el menú cuando se selecciona un proyecto en la vista móvil
function addClickListenerToProjects() {
    var projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active'); // Cerrar el menú móvil al seleccionar un proyecto
            }
        });
    });
}

// Añadir el listener al botón de menú hamburguesa
var mobileMenuButton = document.querySelector('.mobile-menu-button');
