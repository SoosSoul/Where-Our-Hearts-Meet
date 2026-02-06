const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rows = 10;
const cols = 13;
const tileSize = 40;

canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

const wallImage = new Image();
wallImage.src = "Images/Wall.png";

const walkwayImage = new Image();
walkwayImage.src = "Images/WalkWay.png";

const playerImage = new Image();
playerImage.src = "Images/LoveRose.png";

const whiteHeartImage = new Image();
whiteHeartImage.src = "Images/WhiteHeart.gif";

const blackHeartImage = new Image();
blackHeartImage.src = "Images/BrokenHeart.gif";

wallImage.onerror = () => console.error("Failed to load wall image.");
walkwayImage.onerror = () => console.error("Failed to load walkway image.");
playerImage.onerror = () => console.error("Failed to load player image.");
whiteHeartImage.onerror = () =>
  console.error("Failed to load white heart image.");
blackHeartImage.onerror = () =>
  console.error("Failed to load black heart image.");

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const player = { x: 6, y: 4 };
const whiteHeartPos = { x: 11, y: 8 };
const blackHeartPos = { x: 1, y: 1 };

let gameStarted = false;

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.drawImage(
        maze[y][x] === 1 ? wallImage : walkwayImage,
        x * tileSize,
        y * tileSize,
        tileSize,
        tileSize
      );
    }
  }

  ctx.drawImage(
    whiteHeartImage,
    whiteHeartPos.x * tileSize,
    whiteHeartPos.y * tileSize,
    tileSize,
    tileSize
  );
  ctx.drawImage(
    blackHeartImage,
    blackHeartPos.x * tileSize,
    blackHeartPos.y * tileSize,
    tileSize,
    tileSize
  );
  ctx.drawImage(
    playerImage,
    player.x * tileSize,
    player.y * tileSize,
    tileSize,
    tileSize
  );
}

function movePlayer(dx, dy) {
  if (!gameStarted) return;

  let newX = player.x + dx;
  let newY = player.y + dy;

  if (
    newX >= 0 &&
    newX < cols &&
    newY >= 0 &&
    newY < rows &&
    maze[newY][newX] === 0
  ) {
    player.x = newX;
    player.y = newY;

    if (player.x === whiteHeartPos.x && player.y === whiteHeartPos.y) {
      showWinContent();
    }

    if (player.x === blackHeartPos.x && player.y === blackHeartPos.y) {
      showGameOver();
    }

    drawMaze();
  }
}

function showWinContent() {
  window.location.href = "PerfectValentine.html";
}

function showGameOver() {
  document.getElementById("game-over-screen").style.display = "block";
  gameStarted = false;
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "none";
  gameStarted = true;
  player.x = 6;
  player.y = 4;
  drawMaze();
}

function restartGame() {
  document.getElementById("game-over-screen").style.display = "none";
  startGame();
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

let imagesLoaded = 0;
const imagesToLoad = [
  wallImage,
  walkwayImage,
  playerImage,
  whiteHeartImage,
  blackHeartImage,
];

imagesToLoad.forEach((img) => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === imagesToLoad.length) {
      drawMaze();
    }
  };
});

// ... (keep all your existing code until the end)

// Add these variables at the top with other variables
let touchStartX = 0;
let touchStartY = 0;
const minSwipeDistance = 30; // Minimum distance in pixels to consider it a swipe

// Add these event listeners at the bottom where you have the keydown listener
canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

function handleTouchStart(event) {
  if (!gameStarted) return;
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  event.preventDefault();
}

function handleTouchEnd(event) {
  if (!gameStarted) return;
  const touch = event.changedTouches[0];
  const touchEndX = touch.clientX;
  const touchEndY = touch.clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        movePlayer(1, 0); // Right
      } else {
        movePlayer(-1, 0); // Left
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        movePlayer(0, 1); // Down
      } else {
        movePlayer(0, -1); // Up
      }
    }
  }
  event.preventDefault();
}

// Add this CSS to prevent touch scrolling on the canvas
canvas.style.touchAction = "none";

// ... (rest of your existing code)

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

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});
