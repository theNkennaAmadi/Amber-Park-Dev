document.addEventListener("DOMContentLoaded", function () {
  // Select the content wrapper and all content blocks
  const contentWrapper = document.querySelector(".content-wrapper");
  const contentBlocks = document.querySelectorAll(".content-block");

  const convertPixels = (rem) => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  // Calculate the total width of the content blocks
  const totalWidth = contentBlocks.length * contentBlocks[0].offsetWidth;

  // Create a GSAP timeline
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: contentWrapper,
      start: "top top",
      end: `+=${totalWidth}`,
      scrub: true, // This enables smooth scrolling animation
      pin: true, // This pins the content wrapper while scrolling
    },
  });

  // Loop through the content blocks (starting from the second block)
  for (let i = 1; i < contentBlocks.length; i++) {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      timeline.to(contentBlocks[i], { x: convertPixels(2) * i });
    });
    mm.add("(max-width: 991px)", () => {
      timeline.to(contentBlocks[i], { x: convertPixels(2) });
    });
  }

  let video = null;

  const videoWrappers = [...document.querySelectorAll(".video-wrapper")];

  if (videoWrappers.length > 0) {
    videoWrappers.forEach((videoWrap) => {
      videoWrap.addEventListener("mouseenter", () => {
        shuffleLetters(videoWrap.querySelector(".watch-text"));
      });

      videoWrap.addEventListener("click", () => {
        video = videoWrap.querySelector("video");

        if (!video) {
          console.error("No video element found!");
          return;
        }

        // Play the video
        video.play();
        video.muted = false;

        // Check if the document is currently in fullscreen mode
        const isFullscreen =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;

        if (isFullscreen) {
          // Exit fullscreen mode
          video.muted = true;
          video.pause();
          video.currentTime = 0;
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          // Enter fullscreen mode
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        }
      });
    });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    function handleFullscreenChange() {
      const isFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      // If not in fullscreen (indicating the user has just exited fullscreen)
      if (!isFullscreen) {
        // Mute all video elements
        video.muted = true;
        video.pause();
        video.currentTime = 0;
      }
    }
  }
});
