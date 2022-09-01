let hamburger = document.querySelector("i");
let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilTool = document.querySelector(".pencil-tool");
let eraserTool = document.querySelector(".eraser-tool");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky=document.querySelector(".sticky");
let upload = document.querySelector(".upload");

optionsCont.addEventListener("click", (e) => {
  if (hamburger.classList.contains("fa-bars")) {
    hamburger.classList.remove("fa-bars");
    hamburger.classList.add("fa-xmark");
    toolsCont.style.display = "none";
    pencilTool.style.display = "none";
    pencilFlag=false;
    eraserTool.style.display = "none";
    eraserFlag=false;

    
  } else {
    hamburger.classList.add("fa-bars");
    hamburger.classList.remove("fa-xmark");
    toolsCont.style.display = "flex";
  }
});

let pencilFlag = false;
let eraserFlag = false;

pencil.addEventListener("click", (e) => {
    
    if (!pencilFlag) {
    pencilTool.style.display = "block";
    pencilFlag = true;
  } else {
    pencilTool.style.display = "none";
    pencilFlag=false;
  }
});

eraser.addEventListener("click", (e) => {
  if (!eraserFlag) {
    eraserTool.style.display = "block";
    eraserFlag = true;
  } else {
    eraserTool.style.display = "none";
    eraserFlag=false;
  }
});

upload.addEventListener("click", (e) => {
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"><i class="fa-solid fa-minus"></i></div>
            <div class="remove"><i class="fa-solid fa-xmark"></i></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;
        createSticky(stickyTemplateHTML);
    })
})

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"><i class="fa-solid fa-minus"></i></div>
        <div class="remove"><i class="fa-solid fa-xmark"></i></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}