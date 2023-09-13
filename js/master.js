// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}
// Toggel Spain on Icon
    document.querySelector(".contanier-icon .icon").onclick = function () {
//toggle Class Fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");
//toggel Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};
//Cange Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    //Set Color On Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);
        handelActive(e);
    });
});
let BackgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
    document.querySelectorAll(".random-backgrounds span").forEach(e => {
        e.classList.remove("active");
    });
    if (backgroundLocalItem === "true") {
        BackgroundOption = true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        BackgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}
const randombgEl = document.querySelectorAll(".random-backgrounds span");
randombgEl.forEach(span => {
    span.addEventListener("click", (e) => {
    //Remove Active Class From All Childs
        handelActive(e);
        if (e.target.dataset.background === 'yes') {
            BackgroundOption = true;
            randizeImgs();
            localStorage.setItem("background-option", true)
        } else {
            BackgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false)
        }
        
    });
});
//Selecting landing Page Element
let landingPage = document.querySelector(".landing-page");
// console.log(landingPage);
//Changing Background Image Url
let imagsArray = ["bg_11.webp", "bg_02.jpg", "bg_03.jpg", "bg_04.jpg", "bg_05.jpg", "bg_08.webp", "bg_10.webp", "bg_09.jpg"];

function randizeImgs() {
    if (BackgroundOption === true) {
        //Get random Number
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imagsArray.length);
            //chang Background Url
            landingPage.style.backgroundImage = 'url("../images/' + imagsArray[randomNumber] +'")';
        }, 5000);
        
    }
}
randizeImgs();


//Select Skills Selector
let ourSkills = document.querySelector(".skills");
// console.log(ourSkills);

window.onscroll = function () {
    
    //skill Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;
    
    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    //window Height
    let windowHeight = this.innerHeight;

    //window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }

};

//Create Poouo With Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    
    img.addEventListener('click', (ele) => {
        //Create OverLay Element
        let overlay = document.createElement("div");

        //Add class To Overlay
        overlay.className = "popup-overlay";

        //Append Overlay To The Body
        document.body.appendChild(overlay);

        //create The Popup Box
        let popupBox = document.createElement("div");

        //Add Class To The Popup Box
        popupBox.className = "popup-box";

        //create The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;

        //Add Image To Popup Box
        popupBox.appendChild(popupImage);
        
        // Append The Popup Box To Body
        document.body.appendChild(popupBox);

        //Create The Close Span
        let closeButton = document.createElement("span");

        //Create Close Buttom Text
        let closeButtonText = document.createTextNode('x');

        //Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        //Add Class To Close Button
        closeButton.className = 'close-button';

        //Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    });

});

// Close Popup
document.addEventListener('click', (ele) => {
    if (ele.target.className === 'close-button') {
        
        // Remove The Current Popup
        document.querySelector(".popup-box").remove();
        
        // Remove The Popup Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
scroll(allBullets);

//Select All Links
let allLinks = document.querySelectorAll(".links a");
scroll(allLinks);

//Scroling Function
function scroll(element) {

    element.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });
        });
    });
}

//Handel Active 
function handelActive(ele) {
    
    //Remove Active Class From All Childs
        ele.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });

        ele.target.classList.add("active");

}

//select bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
// console.log(bulletsSpan);
let bulletsContainer = document.querySelector(".nav-bullets");
// console.log(bulletsContainer);

let bulletLocalItem = localStorage.getItem("bullets-option")
if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });
    
    if (bulletLocalItem === "block") {
    
        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");
    
    } else {
            
        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");

    }
}
bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        
        if (span.dataset.display == "Show") {
            
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block" )
            
        } else {
            
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none" )
            
        }
        handelActive(e);
    });
});

//Reset Button 
document.querySelector(".reset-option").onclick = function () {

    localStorage.removeItem("color-option");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("background-option");
//  localStorage.clear();
    window.location.reload();
};

//Toggel Menu
let toggelBtn = document.querySelector("button.toggle-menu");
let toggleLinks = document.querySelector(".links");

toggelBtn.onclick = function (e) {
    //Stop Propagation
    e.stopPropagation();

    //Toggel Class On Button
    this.classList.toggle("menu-active");

    //Toggel Class On Links
    toggleLinks.classList.toggle("open");
};
// Click Any Where To Close
document.addEventListener('click', (e) => {
    
    if (e.target !== toggelBtn && e.target !== toggleLinks) {
        
        //Check If Menu Is Open
        if (toggleLinks.classList.contains("open")) {
            
            //Toggel Class On Button
            toggelBtn.classList.toggle("menu-active");
            
            //Toggel Class On Links
            toggleLinks.classList.toggle("open");
        }
    }
});

//Stop Propagation On Menu
toggleLinks.onclick = function (e) {
    e.stopPropagation();
};
// The effect of hydration 
let header = document.querySelector("header");
let headerRoom = new Headroom(header, { tolerance: 20 }, {offset: 50});
headerRoom.init(); 