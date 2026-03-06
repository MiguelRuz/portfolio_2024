let projects = [];
let currentProjectIndex = 0;

fetch('data/projects.json')
.then(response => response.json())
.then(data => {

    projects = data.projects;

    createMenu();
    showProjectByIndex(0);

});

function createMenu(){

    const menu = document.getElementById("project-menu");

    projects.forEach((project,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
        <a href="#" onclick="showProjectByIndex(${index})">
        ${project.title}
        </a>
        `;

        menu.appendChild(li);

    });

}

function showProjectByIndex(index){

    currentProjectIndex = index;

    const project = projects[index];

    const container = document.getElementById("project-container");

    let creditsHTML = "";

    project.credits.forEach(c => {

        creditsHTML += `
        <p><strong>${c.label}:</strong> ${c.value}</p>
        `;

    });

    let imagesHTML = "";

    project.images.forEach(img => {

        imagesHTML += `
        <img src="${img}">
        `;

    });

    container.innerHTML = `

        <h1>${project.title}</h1>

        <div class="project-content">
        <h2>${project.venue}</h2>
        ${creditsHTML}
        </div>

        <div class="image-grid">
        ${imagesHTML}
        </div>

        <div class="navigation-buttons">

        <button onclick="prevProject()">◄</button>

        <button onclick="window.location.href='index.html'">
        Inicio
        </button>

        <button onclick="nextProject()">►</button>

        </div>

    `;

    window.scrollTo({top:0,behavior:"smooth"});

}

function nextProject(){

currentProjectIndex =
(currentProjectIndex < projects.length-1)
? currentProjectIndex+1
: 0;

showProjectByIndex(currentProjectIndex);

}

function prevProject(){

currentProjectIndex =
(currentProjectIndex > 0)
? currentProjectIndex-1
: projects.length-1;

showProjectByIndex(currentProjectIndex);

}