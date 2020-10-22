"use strict";

//=====================================VARIABLES==================================
const navigationLink = document.querySelectorAll(".navigation li");
const burgerMenu = document.querySelector(".burger");
const portfolioTabs = document.querySelectorAll(".portfolio-tablist__tab");

navigationLink.forEach((item) => item.addEventListener("click", jumpToArchor));
burgerMenu.addEventListener("click", selectBurgerMenu);
portfolioTabs.forEach((item) =>
  item.addEventListener("click", selectClickedTab)
);
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
function jumpToArchor() {
  const currentElement = this;
  setSelectedLinkToActive(currentElement);
  const id = this.firstElementChild.getAttribute("href");

  try {
    if (document.querySelector(".area-padding")) {
      document.querySelector(".area-padding").classList.remove("area-padding");
    }

    const block = document.querySelector(`${id}`);
    if (block !== document.querySelector(".header")) {
      block.scrollIntoView({ block: "start", behavior: "smooth" });
      block.classList.add("area-padding");
    } else {
      block.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  } catch (e) {
  } finally {
    burgerMenu.click();
  }
}

function setSelectedLinkToActive(elem) {
  const active = document.querySelector(".active");
  event.preventDefault();
  active.classList.toggle("active");
  elem.classList.toggle("active");
}

//================================================BURGER-MENU=======================================

function selectBurgerMenu() {
  const navigationMenu = document.querySelector(".menu");
  const headerLogo = document.querySelector(".header .logo");

  const elementStyleList = getComputedStyle(this);
  if (elementStyleList.display !== "none") {
    toggleBurgerMenu(this, navigationMenu, headerLogo);
  }
}

function toggleBurgerMenu(burger, menu, logo) {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("menu-show");
  logo.classList.toggle("hide-logo");

  if (!burger.classList.contains("burger-active")) {
    menu.classList.add("menu-hidde");
  } else {
    menu.classList.remove("menu-hidde");
  }
}
//===========================================TABS=================================================
function selectClickedTab() {
  const nameTab = this.getAttribute("data-name");
  const selectedTab = document.querySelector(".tab-selected");
  selectedTab.classList.remove("tab-selected");
  this.classList.add("tab-selected");

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

    const imageName = image.getAttribute("data-name");
    if (imageName === nameTab) {
      image.classList.add("image-priority");

      image.classList.remove("image-no-priority");
    }
  });
}
//===========================================SCROLL=============================================

setActiveArchorToScroll();

function setActiveArchorToScroll() {
  const header = document.querySelector(".header");
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
          `a[href="#${elem.id}"]`
        );

        activeElement.forEach((item) => item.classList.toggle("active"));
        currentElement.forEach((item) => item.classList.toggle("active"));
      }
    });
  });
}
