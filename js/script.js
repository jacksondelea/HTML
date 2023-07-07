fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    // Group projects by format
    let groupedProjects = {};
    for (let project of projects) {
      if (!groupedProjects[project.format]) {
        groupedProjects[project.format] = [];
      }
      groupedProjects[project.format].push(project);
    }
    
    // Populate HTML structure
    let projectsDiv = document.getElementById('projects');
    for (let category in groupedProjects) {
      let categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      categoryDiv.textContent = '[+] ' + category;
      
      let projectItemsDiv = document.createElement('div');
      projectItemsDiv.style.display = 'none';  // Initially hidden
      
      for (let project of groupedProjects[category]) {
        let projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
    
        let projectContentDiv = document.createElement('div');
        projectContentDiv.className = 'project-content';
    
        let projectTextDiv = document.createElement('div');
        projectTextDiv.className = 'project-text';
    
        let titleSpan = document.createElement('span');
        titleSpan.className = 'title';
        titleSpan.textContent = '- ' + project.title;
    
        let dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.textContent = project.date;
    
        projectTextDiv.appendChild(titleSpan);
        projectTextDiv.appendChild(dateSpan);
    
        let projectInfoDiv = document.createElement('div');
        projectInfoDiv.className = 'project-info';
        projectInfoDiv.style.display = 'none';  // Initially hidden
    
        let info1P = document.createElement('p');
        info1P.textContent = project.info1;
    
        let imagesDiv = document.createElement('div');
        imagesDiv.className = 'images';
    
        let img = document.createElement('img');
        img.src = project.image;
        imagesDiv.appendChild(img);
    
        let info2P = document.createElement('p');
        info2P.textContent = project.info2;
    
        let linkA = document.createElement('a');
        linkA.className = 'link';
        linkA.href = project.link.url;
        linkA.textContent = project.link.text;
    
        projectInfoDiv.appendChild(info1P);
        projectInfoDiv.appendChild(imagesDiv);
        projectInfoDiv.appendChild(info2P);
        projectInfoDiv.appendChild(linkA);
    
        projectContentDiv.appendChild(projectTextDiv);
        projectContentDiv.appendChild(projectInfoDiv);
    
        projectDiv.appendChild(projectContentDiv);
    
        projectTextDiv.addEventListener('click', () => {
          if (projectInfoDiv.style.display === 'none') {
              projectInfoDiv.style.display = '';
              titleSpan.classList.add('selected');
              dateSpan.classList.add('selected');
          } else {
              projectInfoDiv.style.display = 'none';
              titleSpan.classList.remove('selected');
              dateSpan.classList.remove('selected');
          }
      });      
    
        projectItemsDiv.appendChild(projectDiv);
      }
      
      categoryDiv.addEventListener('click', () => {
        if (projectItemsDiv.style.display === 'none') {
          projectItemsDiv.style.display = '';
          categoryDiv.textContent = '[-] ' + category;
        } else {
          projectItemsDiv.style.display = 'none';
          categoryDiv.textContent = '[+] ' + category;
        }
      });
      
      projectsDiv.appendChild(categoryDiv);
      projectsDiv.appendChild(projectItemsDiv);
    }
  });
