/*Desktop Bar*/

//getting live date and time

function updateDateTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString();  // Time format
    const dateString = now.toLocaleDateString();  // Date format
    
    document.getElementById('current-time').textContent = timeString;
    document.getElementById('current-date').textContent = dateString;
}

setInterval(updateDateTime, 1000); //updateing the time
updateDateTime(); //updating date an dtime on page

/*Windows*/

//making the windows dragabble

let isDragging = false; //tracking mouse and windo position
let offsetX, offsetY; 
let activeWindow = null; 

const windows = document.querySelectorAll('.window'); //selecting window

windows.forEach((windowElement) => {
  const windowBar = windowElement.querySelector('.window-bar'); //window bar
  const closeButton = windowElement.querySelector('.window-button-close'); //closing x button

  windowBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeWindow = windowElement; 
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
    
    windows.forEach(win => win.style.zIndex = 1); 
    windowElement.style.zIndex = 1000; //makingg selected window to the top
  });

document.addEventListener('mousemove', (e) => { //move on mouse move
  if (isDragging && activeWindow) {
    activeWindow.style.left = `${e.clientX - offsetX}px`; //udpatimng windoww position
    activeWindow.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => { //stop draggign when released
  isDragging = false;
  activeWindow = null; 
});

//closing the window clicking the x button
closeButton.addEventListener('click', () => {
    windowElement.style.display = 'none';
  });
});

// Window - Links

const linkForm = document.getElementById('link-form');
const linkList = document.getElementById('link-list');

linkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const nickname = document.getElementById('nickname').value.trim(); //getting input value
  const url = document.getElementById('url').value.trim();
  
  if (nickname && url) {
    const listItem = document.createElement('li');
    
    const link = document.createElement('a');
    link.href = url;
    link.textContent = nickname;
    link.target = '_blank'; 
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      listItem.remove();
    });
    
    listItem.appendChild(link); //append link and button to list item, then add to list
    listItem.appendChild(deleteButton);
    linkList.appendChild(listItem);
    
    linkForm.reset(); //reset all submissins
  }
});

// Window - Images

function previewImages(event) { //fucntionf or iamge preview
    const previewContainer = document.getElementById('image-preview-container');
    const files = event.target.files;
    
    previewContainer.innerHTML = '';
    
    for (let i = 0; i < files.length; i++) { //creating preview
      const file = files[i];
      
      if (file && file.type.startsWith('image/')) { //sleecettding images opnly
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.classList.add('preview-image');
          previewContainer.appendChild(imgElement);
        };
        
        reader.readAsDataURL(file);
      }
    }
}
  
//Window - Sketches

const canvas = document.getElementById("sketch-canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth; //settign up canvas size
canvas.height = canvas.offsetHeight;

let isDrawing = false; //settioing up drawing state
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => { //event listener for drawing
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", draw);

function draw(e) { //drawing properties
    if (!isDrawing) return;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function clearCanvas() { //clearing tthe canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
