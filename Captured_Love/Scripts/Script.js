document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const cursor = document.querySelector(".custom-cursor");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  let currentIndex = 0;

  // Slider Logic
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Show the target slide
    slides[index].classList.add("active");

    // Update index
    currentIndex = index;
  }

  nextBtn.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  });

  prevBtn.addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  });

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  // Falling Hearts
  function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = "-50px";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    heart.style.color = "#ff6b6b";
    heart.style.zIndex = "1";
    heart.style.pointerEvents = "none";
    heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  setInterval(createHeart, 400);

  // Custom Cursor
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
  }

  // Hamburger Menu
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // Audio
  document.body.addEventListener(
    "click",
    () => {
      const audio = document.getElementById("background-music");
      if (audio && audio.muted) {
        audio.muted = false;
        audio.play().catch((err) => console.log("Audio play failed:", err));
      }
    },
    { once: true },
  );

  // Initialize first slide
  showSlide(0);
});
