// Inicializar el índice del proyecto actual
var currentProjectIndex = 0;

// Lista de IDs de proyectos
var projects = ['project1', 'project2', 'project3']; // Asegúrate de que estos IDs coincidan con los de tus proyectos

// Función para mostrar el proyecto con fundido
function showProject(projectId) {
    var projectInfo = document.querySelector('.project-info');
    var sidebar = document.getElementById('sidebar');
    projectInfo.classList.remove('show');  // Ocultar con fundido
    setTimeout(function() {
        projectInfo.innerHTML = document.getElementById(projectId).innerHTML;
        projectInfo.classList.add('show');  // Mostrar con fundido
        addNavigationListeners();  // Añadir listeners a los botones de navegación

        // Cerrar el menú en móviles al hacer clic en un proyecto
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    }, 500);  // Esperar 500ms antes de mostrar el siguiente proyecto
}


// Función para mostrar el proyecto basado en el índice
function showProjectByIndex(index) {
    currentProjectIndex = index;
    showProject(projects[currentProjectIndex]);
}

// Mostrar el primer proyecto al cargar la página
window.onload = function() {
    showProjectByIndex(0);  // Muestra el primer proyecto por defecto
    addClickListenerToProjects();  // Añadir listeners a los proyectos
};

// Función para mostrar/ocultar el menú en móviles
function toggleMenu() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');  // Alternar la clase 'active' para mostrar/ocultar
}

// Función para avanzar al siguiente proyecto
function nextProject() {
    if (currentProjectIndex < projects.length - 1) {
        currentProjectIndex++;
    } else {
        currentProjectIndex = 0;  // Volver al primer proyecto si estamos en el último
    }
    showProjectByIndex(currentProjectIndex);
}

// Función para retroceder al proyecto anterior
function prevProject() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
    } else {
        currentProjectIndex = projects.length - 1;  // Ir al último proyecto si estamos en el primero
    }
    showProjectByIndex(currentProjectIndex);
}

// Función para ir a la página de inicio (proyecto 1)
function goToHome() {
    currentProjectIndex = 0;  // Volver al primer proyecto
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
        homeBtn.onclick = goToHome;
    }
}

// Función para cerrar el menú cuando se selecciona un proyecto en la vista móvil
function addClickListenerToProjects() {
    var projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');  // Cerrar el menú móvil al seleccionar un proyecto
            }
        });
    });
}

// Añadir el listener al botón de menú hamburguesa
var mobileMenuButton = document.querySelector('.mobile-menu-button');
mobileMenuButton.addEventListener('click', toggleMenu);
