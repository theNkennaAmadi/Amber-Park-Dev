const swiper = new Swiper(".swiper", {
  speed: document.querySelectorAll(".swiper-slide").length * 500,
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
  spaceBetween: "0%",
  rewind: false,
  mousewheel: {
    forceToAxis: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});
