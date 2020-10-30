"use strict";
//=====================================VARIABLES==================================
const header = document.querySelector('.header');
const burgerMenu = document.querySelector(".burger");
const portfolio = document.querySelector(".portfolio-content");
header.addEventListener('click', (e) => {
  const currentElement = e.target;
  if(currentElement.classList.contains('navigation__link')) {
    jumpToArchor(e);
  }
  if(currentElement === burgerMenu) {
    selectBurgerMenu();
  }
})
portfolio.addEventListener('click', (e) => {
  const currentElement = e.target;
  if(currentElement.classList.contains("portfolio-tablist__tab")){
    selectClickedTab(currentElement);
  }
})
//====================================Slide==========================================
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
//=======================================ACTIVE-ARCHOR========================================
function jumpToArchor(event) {
  setSelectedLinkToActive(event);

const currentElement = event.target;

  const elementName = currentElement.dataset.name;
  const sectionPadding = document.querySelector(".area-padding");
 
  try {
    if (sectionPadding) {
      sectionPadding.classList.remove("area-padding");
    }
    const block = document.querySelector(`#${elementName}`);
    
    if (block !== header) {
      block.classList.add("area-padding");
    } 
      block.scrollIntoView({ block: "start", behavior: "smooth" });
    
  } catch {
  } finally {
    burgerMenu.click();
  }
}

function setSelectedLinkToActive(event) {
  const currentElement = event.target;
  
  const active = document.querySelector(".active");
  event.preventDefault();
 
  active.classList.toggle("active");
  currentElement.classList.toggle("active");
  
  
}

//================================================BURGER-MENU=======================================

function selectBurgerMenu() {
  const navigationMenu = document.querySelector(".menu");
  const headerLogo = document.querySelector(".header .logo");

  const elementStyleList = getComputedStyle(burgerMenu);
  if (elementStyleList.display !== "none") {
    toggleBurgerMenu(burgerMenu, navigationMenu, headerLogo);
  }
}

function toggleBurgerMenu(burger, menu, logo) {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("menu-show");
  logo.classList.toggle("logo-hidde");

  if (!burger.classList.contains("burger-active")) {
    menu.classList.add("menu-hidde");
  } else {
    menu.classList.remove("menu-hidde");
  }
}
//===========================================TABS=================================================
function selectClickedTab(currentElement) {
  const nameTab = currentElement.dataset.name;
  const selectedTab = document.querySelector(".portfolio-tablist__tab--selected");
  selectedTab.classList.remove("portfolio-tablist__tab--selected");
  currentElement.classList.add("portfolio-tablist__tab--selected");

  if (nameTab === "all") {
    showAllTabs();
  } else {
    filterImageBySelectedTab(nameTab);
  }
}

function showAllTabs() {
  const allImages = document.querySelectorAll(".portfolio-gallery__image");
  allImages.forEach((image) => {
    image.classList.remove("image-no-priority", "image-priority");
  });
}

function filterImageBySelectedTab(nameTab) {
  const allImages = document.querySelectorAll(".portfolio-gallery__image");
  allImages.forEach((image) => {
    image.classList.add("image-no-priority");
    image.classList.remove("image-priorirty");

    const imageName = image.dataset.name;
    if (imageName === nameTab) {
      image.classList.add("image-priority");

      image.classList.remove("image-no-priority");
    }
  });
}
//===========================================SCROLL=============================================

setActiveArchorToScroll();

function setActiveArchorToScroll() {
  const services = document.querySelector(".services");
  const portfolio = document.querySelector(".portfolio");
  const elements = [header, services, portfolio];

  window.addEventListener("scroll", () => {
    elements.forEach((elem) => {
      const offsetTop = elem.offsetTop - 10;
      const offsetBottom = elem.offsetTop + parseInt(getComputedStyle(elem).height);
      const offsetY = window.pageYOffset;

      if (offsetY >= offsetTop && offsetY <= offsetBottom) {
        const activeElement = document.querySelectorAll(".active");
        const currentElement = document.querySelectorAll(
          `a[data-name="${elem.id}"]`
        );

        activeElement.forEach((item) => item.classList.toggle("active"));
        currentElement.forEach((item) => item.classList.toggle("active"));
      }
    });
  });
}
