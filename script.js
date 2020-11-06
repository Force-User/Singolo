"use strict";
//=====================================VARIABLES==================================
const header = document.querySelector(".header");
const navigationMenu = header.querySelector(".menu");
const headerLogo = header.querySelector(".logo");
const burgerMenu = header.querySelector(".burger");
const services = document.querySelector(".services");
const portfolio = document.querySelector(".portfolio");
const portfolioContent = portfolio.querySelector(".portfolio-content");
const allImages = portfolioContent.querySelectorAll(".portfolio-gallery__image");

header.addEventListener("click", (e) => {
  const selectedElement = e.target;
  if (selectedElement.classList.contains("navigation__link")) {
    jumpToAnchor(e);
    return;
  }
  if (selectedElement.closest("div") === burgerMenu) {
    selectBurgerMenu();
  }
});

portfolioContent.addEventListener("click", (e) => {
  const selectedElement = e.target.closest("li");
  if (selectedElement.classList.contains("portfolio-tablist__tab")) {
    selectClickedTab(selectedElement);
  }
});
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
//=======================================ACTIVE-ANCHOR========================================
function jumpToAnchor(event) {
  setSelectedLinkToActive(event);

  const selectedElement = event.target;
  const selectedElementName = selectedElement.dataset.name;
  const block = document.querySelector(`#${selectedElementName}`);
  const currentSectionPadding = document.querySelector(".wrapper__area-padding");
  
  try {
    if (currentSectionPadding) {
      currentSectionPadding.classList.remove("wrapper__area-padding");
    }
    
    if (block !== header) {
      block.classList.add("wrapper__area-padding");
    }
    block.scrollIntoView({ block: "start", behavior: "smooth" });

  } catch {
  } finally {
    if (burgerMenu.classList.contains("burger--active")) {
      burgerMenu.click();
    }
  }
}

function setSelectedLinkToActive(event) {
  event.preventDefault();
  if(event.target.dataset.name) {
    const selectedElement = event.target;
    const currentActiveElement = header.querySelector(".navigation__link--active");
    currentActiveElement.classList.toggle("navigation__link--active");
    selectedElement.classList.toggle("navigation__link--active");
  }
  return;
  
}
//================================================BURGER-MENU=======================================

function selectBurgerMenu() {
  const burgerStyleList = getComputedStyle(burgerMenu);
  if (burgerStyleList.display !== "none") {
    toggleBurgerMenu();
  }
}

function toggleBurgerMenu() {
  burgerMenu.classList.toggle("burger--active");
  navigationMenu.classList.toggle("menu--show");
  headerLogo.classList.toggle("logo--hidden");

  if (!burgerMenu.classList.contains("burger--active")) {
    navigationMenu.classList.add("menu--hidden");
  } else {
    navigationMenu.classList.remove("menu--hidden");
  }
}
//===========================================TABS=================================================
function selectClickedTab(selectedElement) {
  const nameTab = selectedElement.dataset.name;
  const selectedTab = portfolioContent.querySelector(".portfolio-tablist__tab--selected");
  selectedTab.classList.remove("portfolio-tablist__tab--selected");
  selectedElement.classList.add("portfolio-tablist__tab--selected");

  if (nameTab === "all") {
    showAllTabs();
  } else {
    filterImageBySelectedTab(nameTab);
  }
}

function showAllTabs() {
  allImages.forEach((image) => {
    image.classList.remove("portfolio-gallery__image--no-priority", "portfolio-galley__image--priority");
  });
}

function filterImageBySelectedTab(nameTab) {
  allImages.forEach((image) => {
    image.classList.add("portfolio-gallery__image--no-priority");
    image.classList.remove("portfolio-gallery__image--priorirty");

    const imageName = image.dataset.name;

    if (imageName === nameTab) {
      image.classList.add("portfolio-gallery__image--priority");
      image.classList.remove("portfolio-gallery__image--no-priority");
    }
  });
}
//===========================================SCROLL=============================================
const elements = [header, services, portfolio];

window.addEventListener("scroll", () => {
  elements.forEach((elem) => {
    const offsetTop = elem.offsetTop - 10;
    const offsetBottom = elem.offsetTop + parseInt(getComputedStyle(elem).height);
    const offsetY = window.pageYOffset;
    if (offsetY >= offsetTop && offsetY <= offsetBottom) {
      const currentActiveElement = header.querySelectorAll(".navigation__link--active");
      const currentElement = document.querySelectorAll(`a[data-name="${elem.id}"]`);
      currentActiveElement.forEach((item) => item.classList.toggle("navigation__link--active"));
      currentElement.forEach((item) => item.classList.toggle("navigation__link--active"));
    }
  });
});


window.addEventListener("orientationchange", () => {
  if(burgerMenu.classList.contains("burger--active")) {
    toggleBurgerMenu();
  }
})


