document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const audio = document.getElementById("background-music");

  // Custom Cursor
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // Hamburger Menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // VERY IMPORTANT
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Audio (one-time unlock)
  document.body.addEventListener(
    "click",
    () => {
      if (audio && audio.muted) {
        audio.muted = false;
        audio.play().catch(() => {});
      }
    },
    { once: true },
  );
});
