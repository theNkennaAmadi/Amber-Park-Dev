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
