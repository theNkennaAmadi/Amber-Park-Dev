const categories = [...document.querySelectorAll("[data-name]")];
console.log(categories);
categories.forEach((category) => {
  console.log(category.getAttribute("data-name"));
  if (category.getAttribute("data-name").toLowerCase() === "creative") {
    document.querySelector("[data-view]").href = "/creative";
  } else if (category.getAttribute("data-name").toLowerCase() === "film") {
    document.querySelector("[data-view]").href = "/film-video";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy-video"));

  if ("IntersectionObserver" in window) {
    let lazyVideoObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.parentElement.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy-video");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyVideos.forEach(function (lazyVideo) {
      for (var source in lazyVideo.children) {
        var videoSource = lazyVideo.children[source];
        if (
          typeof videoSource.tagName === "string" &&
          videoSource.tagName === "SOURCE"
        ) {
          videoSource.src = videoSource.parentElement.dataset.src;
        }
      }
      lazyVideo.load();
    });
  }

  /**
   * Play and pause videos in view
   */
  const videos = document.querySelectorAll("video");

  // Options for the Intersection Observer
  const observerOptions = {
    root: null, // relative to the viewport
    threshold: 0.3, // 50% of the video must be visible
  };

  // Callback function for the Intersection Observer
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      // If the video is in view, play it
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        // If the video is not in view, pause it
        entry.target.pause();
      }
    });
  };

  // Create a new Intersection Observer instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each video
  videos.forEach((video) => {
    // Ensure videos have autoplay and loop attributes
    observer.observe(video);
  });
});
