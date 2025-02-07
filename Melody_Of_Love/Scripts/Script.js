document.addEventListener("DOMContentLoaded", () => {
  fetch("Images/Disc.svg")
    .then((response) => response.text())
    .then((svg) => {
      const playerContainer = document.getElementById("player-container");
      playerContainer.innerHTML = svg;

      const vinyl = document.querySelector("svg");
      const playButton = document.getElementById("play-button");
      const audio = document.getElementById("love-song");
      let isPlaying = false;

      playButton.addEventListener("click", () => {
        if (!isPlaying) {
          vinyl.style.animation = "spin 2s linear infinite";

          audio.play();

          playButton.textContent = "Let’s Pause the Moment";
          isPlaying = true;
        } else {
          vinyl.style.animation = "";

          audio.pause();

          playButton.textContent = "Play";
          isPlaying = false;
        }
      });
    })
    .catch((err) => console.error("Error loading SVG:", err));
});

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(0.9)";
});

document.addEventListener("mouseup", () => {
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
});
