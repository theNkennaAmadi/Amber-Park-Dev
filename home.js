const workItems = [...document.querySelectorAll(".work-item")];
const previewItems = [
  ...document.querySelectorAll(".work-visuals-preview-item"),
];

workItems.forEach((item, index) => {
  let tl = gsap.timeline({ paused: true });
  tl.to(item, { backgroundColor: "black", color: "white" });
  tl.to(previewItems[index], { opacity: 1 }, "<");
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
 * Brands hover animation
 */

const linkBlock = document.querySelectorAll(".link-block");
linkBlock.forEach((block) => {
  const tl = gsap.timeline({ paused: true });
  tl.to(block.querySelector(".link-line"), { x: "110%", opacity: 0 });
  tl.to(block.querySelector(".link-line"), { x: "-110%", duration: 0 });
  tl.to(block.querySelector(".link-line"), {
    x: "0%",
    width: "100%",
    opacity: 1,
    ease: "expo.inOut",
  });

  block.addEventListener("mouseenter", () => {
    tl.restart();
  });
  block.addEventListener("mouseleave", () => {
    // tl.reverse();
  });
});

const orgItems = document.querySelectorAll(".org-cc-item");
orgItems.forEach((item) => {
  const tl = gsap.timeline({ paused: true });
  tl.to(item.querySelector("[data-visual]"), {
    scale: 1.2,
    duration: 1,
    ease: "expo.inOut",
  });
  item.addEventListener("mouseenter", () => {
    tl.timeScale(1);
    tl.restart();
  });
  item.addEventListener("mouseleave", () => {
    tl.timeScale(1.5);
    tl.reverse();
  });
});
