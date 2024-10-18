// Inicializar el índice del proyecto actual
var currentProjectIndex = 0;

// Lista dinámica de IDs de proyectos
var projects = [];
document.addEventListener("DOMContentLoaded", function() {
    projects = Array.from(document.querySelectorAll('.project-item')).map(item => item.id);
    showProjectByIndex(currentProjectIndex);  // Muestra el primer proyecto por defecto
    addClickListenerToProjects();  // Añadir listeners a los proyectos
});

// Función para mostrar el proyecto con fundido
function showProject(projectId) {
    var projectInfo = document.querySelector('.project-info');
    var sidebar = document.getElementById('sidebar');
    
    projectInfo.classList.remove('show'); // Ocultar con fundido
    setTimeout(function() {
        if (document.getElementById(projectId)) {
            projectInfo.innerHTML = document.getElementById(projectId).innerHTML; // Asegúrate de que el ID existe
            projectInfo.classList.add('show'); // Mostrar con fundido
            addNavigationListeners(); // Añadir listeners a los botones de navegación
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Hacer scroll hacia arriba

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

// Función para avanzar al siguiente proyecto
function nextProject() {
    currentProjectIndex = (currentProjectIndex < projects.length - 1) ? currentProjectIndex + 1 : 0; // Avanzar al siguiente proyecto o volver al primero
    showProjectByIndex(currentProjectIndex);
}

// Función para retroceder al proyecto anterior
function prevProject() {
    currentProjectIndex = (currentProjectIndex > 0) ? currentProjectIndex - 1 : projects.length - 1; // Retroceder al proyecto anterior o volver al último
    showProjectByIndex(currentProjectIndex);
}

// Función para añadir listeners a los botones de navegación
function addNavigationListeners() {
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    var homeBtn = document.getElementById('home-btn');

    if (prevBtn && nextBtn && homeBtn) {
        prevBtn.onclick = prevProject;
        nextBtn.onclick = nextProject;
        homeBtn.onclick = function() {
            window.location.href = 'index.html';  // Navegar a index.html
        };
    }
}

// Función para añadir listeners a los proyectos en la vista móvil
function addClickListenerToProjects() {
    var projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            currentProjectIndex = index; // Actualizar el índice del proyecto actual
            showProjectByIndex(currentProjectIndex);
            var sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active'); // Cerrar el menú móvil al seleccionar un proyecto
            }
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Hacer scroll hacia arriba al seleccionar un proyecto
        });
    });
}
