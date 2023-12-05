window.addEventListener("DOMContentLoaded", () => {
  gsap.from(".page-wrapper", { autoAlpha: 0, duration: 0.1, ease: "linear" });

  const shuffleItems = document.querySelectorAll("[letter-shuffle]");
  Array.prototype.forEach.call(shuffleItems, (element, index) => {
    let frames = null;
    if (element.getAttribute("shuffle-duration")) {
      frames = element.textContent.length;
    } else {
      frames = element.textContent.length * 3;
    }
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      markers: false,
      onEnter: () => {
        shuffleLetters(element, { fps: frames });
      },
      once: true,
    });
  });

  /**
   * Mobile Menu
   */
  const menuMob = document.querySelector(".nav-mobile-menu");
  const menuLinks = document.querySelectorAll("[nav-link-text]");

  let mm = gsap.matchMedia();

  // add a media query. When it matches, the associated function will run
  let tlMenuMob = gsap.timeline({ paused: true });
  mm.add("(max-width: 767px)", () => {
    tlMenuMob.to(menuMob, { rotate: -45, ease: "expo.inOut" });
    tlMenuMob.fromTo(
      ".nav-content-grid",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "expo.inOut",
      },
      "<"
    );
  });

  menuMob.addEventListener("click", () => {
    if (!menuMob.classList.contains("open")) {
      tlMenuMob.timeScale(1);
      tlMenuMob.play();
      Array.prototype.forEach.call(menuLinks, (element, index) => {
        let frames = element.textContent.length * 3;
        shuffleLetters(element, { fps: frames });
      });
    } else {
      tlMenuMob.timeScale(1.5);
      tlMenuMob.reverse();
    }
    menuMob.classList.toggle("open");
  });

  /**
   * Tags Hover Effect
   */
  const tagItems = [...document.querySelectorAll(".tags-item")];

  tagItems.forEach((item) => {
    let tl = gsap.timeline({ paused: true });
    tl.to(item, { backgroundColor: "black", color: "white" });
    item.addEventListener("mouseenter", () => {
      tl.timeScale(1);
      tl.play();
    });
    item.addEventListener("mouseleave", () => {
      tl.timeScale(1.5);
      tl.reverse();
    });
  });

  /**
   * Tags Dropdown Reveal
   */

  const tagsHeader = document.querySelector(".tags-header");
  let tlTags = gsap.timeline({ paused: true });
  tlTags.fromTo(
    ".tags-list-wrapper",
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    }
  );
  tagsHeader.addEventListener("click", () => {
    if (!tagsHeader.classList.contains("open")) {
      tlTags.timeScale(1);
      tlTags.play();
    } else {
      tlTags.timeScale(1.5);
      tlTags.reverse();
    }
    tagsHeader.classList.toggle("open");
  });

  document.querySelector(".tags-wrapper").addEventListener("mouseleave", () => {
    tlTags.timeScale(1.5);
    tlTags.reverse();
    tagsHeader.classList.remove("open");
  });

  /**
   * Search Dropdown reveal
   */
  const searchBlock = document.querySelector(".search-form-block");
  let tlSearch = gsap.timeline({ paused: true });
  tlSearch.fromTo(
    ".search-results-block",
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    }
  );
  searchBlock.addEventListener("mouseenter", () => {
    tlSearch.timeScale(1);
    tlSearch.play();
  });

  searchBlock.addEventListener("mouseleave", () => {
    tlSearch.timeScale(1.5);
    tlSearch.reverse();
  });

  /**
   * Search functionality
   */

  var form = document.querySelector(".w-form");

  // When the form is submitted prevent refresh...
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  const searchResults = [...document.querySelectorAll(".search-results-item")];

  document
    .querySelector(".text-field.search")
    .addEventListener("input", (e) => {
      e.preventDefault();
      let searchTerm = e.currentTarget.value.toLowerCase();
      if (searchTerm.length) {
        let results = searchResults.filter((item) => {
          return item
            .querySelector("[search-name]")
            .textContent.toLowerCase()
            .includes(searchTerm);
        });
        let nonMatchingResults = searchResults.filter((item) => {
          return !item
            .querySelector("[search-name]")
            .textContent.toLowerCase()
            .includes(searchTerm);
        });
        console.log(nonMatchingResults);
        gsap.to(results, { display: "block" });
        gsap.to(nonMatchingResults, { display: "none" });
      } else {
        gsap.to(searchResults, { display: "none" });
      }
    });

  searchResults.forEach((item) => {
    let tl = gsap.timeline({ paused: true });
    tl.to(item, { backgroundColor: "black", color: "white" });
    item.addEventListener("mouseenter", () => {
      tl.timeScale(1);
      tl.play();
    });
    item.addEventListener("mouseleave", () => {
      tl.timeScale(1.5);
      tl.reverse();
    });
  });

  /**
   * Info bar
   */
  const swiper = new Swiper(".swiper-info", {
    speed: 7000,
    loop: true,
    autoHeight: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    centeredSlides: false,
    followFinger: false,
    mousewheelControl: false,
    freeMode: true,
    slideToClickedSlide: false,
    slidesPerView: "auto",
    spaceBetween: "3%",
    rewind: false,
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: false,
      onlyInViewport: true,
    },
  });

  const swiperC = new Swiper(".swiper-c", {
    speed: 7000,
    loop: true,
    autoHeight: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    centeredSlides: false,
    followFinger: true,
    mousewheelControl: true,
    freeMode: true,
    slideToClickedSlide: false,
    slidesPerView: "auto",
    spaceBetween: "3%",
    rewind: false,
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
});
