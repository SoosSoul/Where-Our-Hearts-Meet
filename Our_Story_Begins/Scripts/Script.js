document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const audio = document.getElementById("background-music");

  // --- CUSTOM CURSOR ---
  document.addEventListener("mousemove", (e) => {
    if (cursor) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }
  });

  // --- NAVBAR LOGIC ---
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });

    // Close when clicking outside
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
  }

  // --- 100 REASONS CONTENT ---
  const reasons = [
    "1 I love you because your smile heals me",
    "2 You make my heart feel safe",
    "3 You understand me without words",
    "4 You make every moment special",
    "5 You calm my chaos",
    "6 You choose me every day",
    "7 You make me want to be better",
    "8 You see the good in me",
    "9 Your voice feels like home",
    "10 You make me laugh genuinely",
    "11 Your presence feels warm",
    "12 You are gentle with my heart",
    "13 You remember the small things",
    "14 You are my safe place",
    "15 You make me feel wanted",
    "16 You support my dreams",
    "17 You are real with me",
    "18 You understand my silence",
    "19 Your heart is beautiful",
    "20 You inspire me",
    "21 You feel like destiny",
    "22 You never pretend with me",
    "23 You make me feel seen",
    "24 You know when i am not okay",
    "25 You dont judge me",
    "26 You believe in me",
    "27 You are patient with me",
    "28 You stay even when its hard",
    "29 You make life brighter",
    "30 Your eyes speak love",
    "31 You hold my heart softly",
    "32 You are my peace",
    "33 I can be myself with you",
    "34 You respect me",
    "35 You never let me feel alone",
    "36 You are my comfort",
    "37 You make me smile without trying",
    "38 You care in silent ways",
    "39 Your love is pure",
    "40 You understand my feelings",
    "41 You make me feel enough",
    "42 You listen to me",
    "43 You are softhearted",
    "44 You are loyal",
    "45 You choose kindness",
    "46 Your heart is rare",
    "47 You are my best friend",
    "48 You heal me",
    "49 You make me feel lucky",
    "50 You bring out the best in me",
    "51 You value me",
    "52 You keep my secrets",
    "53 You love me at my worst",
    "54 We grow together",
    "55 You never make me feel unwanted",
    "56 You love me truly",
    "57 You are soft but strong",
    "58 You are my person",
    "59 You match my vibe",
    "60 You dont give up on me",
    "61 You care about my feelings",
    "62 You choose me even on bad days",
    "63 You are my calm",
    "64 You are genuine",
    "65 You make everything better",
    "66 You love me in small ways",
    "67 You appreciate me",
    "68 Your hugs are therapy",
    "69 You make me feel special",
    "70 You make me feel safe",
    "71 You are consistent",
    "72 You bring peace to my mind",
    "73 Your love is steady",
    "74 You make life beautiful",
    "75 You complete missing parts of me",
    "76 You look at me with love",
    "77 You protect my heart",
    "78 You stay by my side",
    "79 You never make me feel less",
    "80 You celebrate my wins",
    "81 You calm my overthinking",
    "82 You are my favorite thought",
    "83 You make my world colorful",
    "84 You feel like a blessing",
    "85 You accept all of me",
    "86 You bring peace to my soul",
    "87 You understand my emotions",
    "88 You are loyal in a world full of temporary people",
    "89 You make life feel warm",
    "90 Your love feels safe",
    "91 You choose me over and over",
    "92 You trust me",
    "93 You make my heart smile",
    "94 You feel like home",
    "95 You are my comfort person",
    "96 You make me feel alive",
    "97 You are the peace I searched for",
    "98 You make my heart soft",
    "99 You are my forever person",
    "100 I love you simply because you are you",
    "#1 The way you make me feel happy all the time without even trying just by being yourself and existing in my world",
    "#2 The way you care for me in the smallest details and notice things about me that no one else ever pays attention to",
    "#3 The way you love my smile and look at me like it is the most beautiful thing you have ever seen",
    "#4 The way you gently touch my face and make my heart slow down in the softest safest way",
    "#5 The way you hold my hand like you never want to let go and make me feel protected and chosen",
    "#6 The way you say my name so softly and turn it into something that sounds like love",
    "#7 The way you look into my eyes and make me feel understood without saying a single word",
    "#8 The way you hug me and make all my worries disappear like nothing else matters in that moment",
    "#9 The way you get excited about my happiness and celebrate even the smallest things with me",
    "#10 The way you love me so naturally so deeply and so purely that it feels like fate like home like something written for us long before we ever met and that is why I will always choose you over and over again",
  ];

  // --- GENERATE PAGES ---
  const pagesContainer = document.getElementById("bookPagesContainer");
  if (pagesContainer) {
    for (let i = 0; i < 11; i++) {
      // Adjusted to 11 to cover 101 items
      const pageDiv = document.createElement("div");
      pageDiv.className = `book-page ${i === 0 ? "active" : ""}`;
      pageDiv.setAttribute("data-page", i + 1);

      const gridDiv = document.createElement("div");
      gridDiv.className = "reasons-grid";

      const leftCol = document.createElement("div");
      leftCol.className = "reasons-column";
      const rightCol = document.createElement("div");
      rightCol.className = "reasons-column";

      let hasContent = false;
      for (let j = 0; j < 10; j++) {
        const reasonIndex = i * 10 + j;
        if (reasonIndex < reasons.length) {
          hasContent = true;
          const reasonItem = document.createElement("div");
          reasonItem.className = "reason-item";
          reasonItem.innerHTML = `<span class="bullet-point">♥</span><p class="reason-text">${reasons[reasonIndex]}</p>`;

          if (j < 5) leftCol.appendChild(reasonItem);
          else rightCol.appendChild(reasonItem);
        }
      }

      if (hasContent) {
        gridDiv.appendChild(leftCol);
        gridDiv.appendChild(rightCol);
        pageDiv.appendChild(gridDiv);
        pagesContainer.appendChild(pageDiv);
      }
    }
  }

  // --- BOOK MODAL LOGIC ---
  const bookModal = document.getElementById("bookModal");
  const openBookBtn = document.getElementById("openBookBtn");
  const closeBookBtn = document.getElementById("closeBookBtn");
  const nextBookBtn = document.getElementById("nextBookBtn");
  const prevBookBtn = document.getElementById("prevBookBtn");
  const bookPages = document.querySelectorAll(".book-page");
  let currentBookPage = 0;

  if (openBookBtn && bookModal) {
    openBookBtn.onclick = () => {
      bookModal.style.display = "flex";
      currentBookPage = 0;
      updateBookPages();
    };

    closeBookBtn.onclick = () => {
      bookModal.style.display = "none";
    };

    window.addEventListener("click", (event) => {
      if (event.target == bookModal) {
        bookModal.style.display = "none";
      }
    });

    nextBookBtn.onclick = () => {
      if (currentBookPage < bookPages.length - 1) {
        currentBookPage++;
        updateBookPages();
      } else {
        bookModal.style.display = "none";
      }
    };

    prevBookBtn.onclick = () => {
      if (currentBookPage > 0) {
        currentBookPage--;
        updateBookPages();
      }
    };
  }

  function updateBookPages() {
    const pages = document.querySelectorAll(".book-page");
    pages.forEach((page, index) => {
      page.classList.remove("active");
      if (index === currentBookPage) {
        page.classList.add("active");
      }
    });

    if (prevBookBtn) prevBookBtn.disabled = currentBookPage === 0;
    if (nextBookBtn) {
      nextBookBtn.innerText =
        currentBookPage === pages.length - 1 ? "Close" : "Next";
    }
  }

  // --- AUDIO UNLOCK (FIX) ---
  // This listener is attached to the whole window/body to catch any click
  const unlockAudio = () => {
    if (audio) {
      audio.muted = false;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started playing successfully.");
            // Remove listeners once audio is playing
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
          })
          .catch((error) => {
            console.log(
              "Audio play failed, waiting for next interaction:",
              error,
            );
          });
      }
    }
  };

  window.addEventListener("click", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);
});
