/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const hideNav = document.querySelector(".page__header");
const button = document.getElementById("myBtn");
const shows = document.getElementsByClassName("push");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// checks which element is active
const getEl = () => {
  x = sections[0];
  y = window.innerHeight;
  //window.innerHeight shows the total height of the page
  sections.forEach(section => {
    let rect = section.getBoundingClientRect();
    //console.log(rect.top);
    //helps see where each section begins
    if (rect.top >= -350 && rect.top < y) {
      x = section;
      y = rect.top;
    }
  });
  return x;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function addNav() {
  sections.forEach(section => {
    let x = document.createElement("li");
    //set the classname
    x.setAttribute("class", "menu__link");
    //sets innerHTML
    x.setAttribute("data-nav", section.id);
    x.textContent = section.dataset.nav;
    navList.appendChild(x);
  });
}

// Add class 'active' to section when near top of viewport
function addActive() {
  window.addEventListener("scroll", e => {
    let x = getEl();
    //set active header sections
    const active = document.querySelector(`li[data-nav=${x.id}]`);
    if (active) {
      active.classList.add("menu-active");
    } else {
      active.classList.remove("menu-active");
    }
    console.log(active);
    // remove unactive headers otherwise all sections will be highlighted in header as you scroll down
    const headers = document.querySelectorAll(".menu__link");
    for (let header of headers) {
      if (header.dataset.nav !== active.dataset.nav) {
        header.classList.remove("menu-active");
      }
    }
  });
}

// Scroll to anchor ID
function scrollOnClick() {
  navList.addEventListener("click", e => {
    let scrolled = document
      .querySelector("#" + e.target.dataset.nav)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

//Gets the button once scroll happens
const btn = () => {
  let y = window.pageYOffset;
  if (y > 0) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

//When clicked it will bring you back to the top of the page
button.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});

// when scrolling down the navbar will hide and when scrolled up it will unhide
let past = 0;
window.addEventListener("scroll", () => {
  let current = window.pageYOffset;
  //console.log(scrollTop);
  if (current > past) {
    hideNav.style.top = "-60px";
  } else {
    hideNav.style.top = "0";
  }
  past = current;
});

//when read more is clicked it will show the landing page paragraph contents

for (let show of shows) {
  show.addEventListener("click", function() {
    this.classList.toggle("active");
    let para = this.nextElementSibling;
    if (para.style.display !== "block") {
      para.style.display = "block";
    } else {
      para.style.display = "none";
    }
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

//Run
addNav();
scrollOnClick();
addActive();
window.addEventListener("scroll", btn);
