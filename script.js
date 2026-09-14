
/* =========================================
   HERO SLIDER AUTO-PLAY
   ========================================= */

let currentSlide = 1;
const totalSlides = 3;

function showSlide(slide) {
  const slideButton = document.getElementById("slide" + slide);

  // Prevent error if radio buttons are not present
  if (slideButton) {
    slideButton.checked = true;
  }
}

setInterval(() => {
  currentSlide++;

  if (currentSlide > totalSlides) {
    currentSlide = 1;
  }

  showSlide(currentSlide);

}, 5000);

/* =========================================
   MOBILE HAMBURGER MENU
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {
      icon.classList.remove("bi-list");
      icon.classList.add("bi-x-lg");
    } else {
      icon.classList.remove("bi-x-lg");
      icon.classList.add("bi-list");
    }

  });


  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");

      const icon = menuToggle.querySelector("i");

      icon.classList.remove("bi-x-lg");
      icon.classList.add("bi-list");

    });

  });

}

/* =========================================
   CONFETTI ANIMATION
   ========================================= */

function launchConfetti() {

  const confettiContainer =
    document.createElement("div");

  confettiContainer.classList.add(
    "confetti-container"
  );

  document.body.appendChild(
    confettiContainer
  );


  for (let i = 0; i < 50; i++) {

    const confetti =
      document.createElement("div");

    confetti.classList.add(
      "confetti"
    );

    confetti.style.left =
      Math.random() *
      window.innerWidth +
      "px";

    confetti.style.backgroundColor =
      [
        "#ff8a24",
        "#f7c95c",
        "#ff4f8c"
      ][
        Math.floor(
          Math.random() * 3
        )
      ];

    confettiContainer.appendChild(
      confetti
    );


    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }


  setTimeout(() => {
    confettiContainer.remove();
  }, 3000);
}


/* Attach Confetti to Buttons */

document
  .querySelectorAll(
    ".primary-button, .secondary-button"
  )
  .forEach(btn => {

    btn.addEventListener(
      "click",
      launchConfetti
    );

  });


/* =========================================
   DIWALI COUNTDOWN
   ========================================= */

const diwaliDate =
  new Date(
    "Nov 8, 2026 00:00:00"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();

  const distance =
    diwaliDate - now;


  if (distance <= 0) {

    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";

    return;
  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );

  const hours =
    Math.floor(
      (distance %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

  const minutes =
    Math.floor(
      (distance %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );

  const seconds =
    Math.floor(
      (distance %
        (1000 * 60)) /
        1000
    );


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  if (daysElement)
    daysElement.innerText =
      String(days).padStart(2, "0");

  if (hoursElement)
    hoursElement.innerText =
      String(hours).padStart(2, "0");

  if (minutesElement)
    minutesElement.innerText =
      String(minutes).padStart(2, "0");

  if (secondsElement)
    secondsElement.innerText =
      String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================
   🎆 FIREWORKS ANIMATION
   ========================================= */

const canvas =
  document.getElementById(
    "fireworks-canvas"
  );

const ctx =
  canvas.getContext("2d");


/* Canvas Size */

function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;
}

resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);


/* =========================================
   FIREWORK COLORS
   ========================================= */

const fireworkColors = [
  "#ff4f8c",
  "#f7c95c",
  "#ff8a24",
  "#ffffff",
  "#5ee7ff",
  "#a855f7",
  "#7cff6b"
];


function randomColor() {

  return fireworkColors[
    Math.floor(
      Math.random() *
      fireworkColors.length
    )
  ];
}


/* =========================================
   ROCKET
   ========================================= */

class Firework {

  constructor(
    startX,
    targetX,
    targetY
  ) {

    this.x = startX;

    this.y =
      canvas.height + 10;

    this.targetX =
      targetX;

    this.targetY =
      targetY;


    this.speed =
      6 + Math.random() * 2;


    const angle =
      Math.atan2(
        targetY - this.y,
        targetX - this.x
      );


    this.vx =
      Math.cos(angle) *
      this.speed;

    this.vy =
      Math.sin(angle) *
      this.speed;


    this.color =
      randomColor();


    this.trail = [];
  }


  update() {

    /* Rocket trail */

    this.trail.push({
      x: this.x,
      y: this.y
    });


    if (this.trail.length > 10) {
      this.trail.shift();
    }


    /* Move rocket */

    this.x += this.vx;
    this.y += this.vy;


    /* Distance from target */

    const distance =
      Math.hypot(
        this.targetX - this.x,
        this.targetY - this.y
      );


    /* Explosion */

    if (distance < 15) {

      createExplosion(
        this.x,
        this.y,
        this.color
      );

      return true;
    }


    return false;
  }


  draw() {

    /* Rocket trail */

    ctx.save();

    ctx.beginPath();

    for (
      let i = 0;
      i < this.trail.length;
      i++
    ) {

      const point =
        this.trail[i];


      if (i === 0) {

        ctx.moveTo(
          point.x,
          point.y
        );

      } else {

        ctx.lineTo(
          point.x,
          point.y
        );
      }
    }


    ctx.strokeStyle =
      this.color;

    ctx.lineWidth = 2;

    ctx.shadowBlur = 10;

    ctx.shadowColor =
      this.color;

    ctx.stroke();


    /* Rocket head */

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      2.5,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "#ffffff";

    ctx.shadowBlur = 15;

    ctx.shadowColor =
      this.color;

    ctx.fill();

    ctx.restore();
  }
}


/* =========================================
   EXPLOSION PARTICLE
   ========================================= */

class Particle {

  constructor(
    x,
    y,
    color
  ) {

    this.x = x;
    this.y = y;


    const angle =
      Math.random() *
      Math.PI * 2;


    const speed =
      Math.random() * 7 + 2;


    this.vx =
      Math.cos(angle) *
      speed;

    this.vy =
      Math.sin(angle) *
      speed;


    this.gravity =
      0.06;


    this.friction =
      0.985;


    this.life = 1;


    this.decay =
      Math.random() *
      0.018 +
      0.012;


    this.size =
      Math.random() * 2 +
      1;


    this.color =
      color;
  }


  update() {

    this.vx *=
      this.friction;

    this.vy *=
      this.friction;


    this.vy +=
      this.gravity;


    this.x +=
      this.vx;

    this.y +=
      this.vy;


    this.life -=
      this.decay;


    return this.life <= 0;
  }


  draw() {

    ctx.save();


    ctx.globalAlpha =
      this.life;


    ctx.beginPath();


    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      this.color;


    ctx.shadowBlur =
      15;

    ctx.shadowColor =
      this.color;


    ctx.fill();


    ctx.restore();
  }
}


/* =========================================
   CREATE EXPLOSION
   ========================================= */

function createExplosion(
  x,
  y,
  color
) {

  const particleCount =
    50 +
    Math.floor(
      Math.random() * 25
    );


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    particles.push(
      new Particle(
        x,
        y,
        color
      )
    );
  }
}


/* =========================================
   FIREWORK ARRAYS
   ========================================= */

let fireworks = [];

let particles = [];


/* =========================================
   RANDOM AUTOMATIC FIREWORK
   ========================================= */

function createRandomFirework() {

  const targetX =
    Math.random() *
    canvas.width;


  const targetY =
    Math.random() *
    (canvas.height * 0.55) +
    80;


  const startX =
    Math.random() *
    canvas.width;


  fireworks.push(
    new Firework(
      startX,
      targetX,
      targetY
    )
  );
}


/* =========================================
   USER CLICK / TOUCH FIREWORK
   ========================================= */

function createUserFirework(
  x,
  y
) {

  /* Don't launch too close to bottom */

  const targetY =
    Math.min(
      y,
      canvas.height - 80
    );


  const startX =
    Math.random() *
    canvas.width;


  fireworks.push(
    new Firework(
      startX,
      x,
      targetY
    )
  );
}


/* =========================================
   MOUSE + TOUCH
   ========================================= */

window.addEventListener(
  "pointerdown",
  function (event) {

    createUserFirework(
      event.clientX,
      event.clientY
    );

  }
);


/* =========================================
   MAIN FIREWORK ANIMATION LOOP
   ========================================= */

function animateFireworks() {

  requestAnimationFrame(
    animateFireworks
  );


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  /* Rockets */

  for (
    let i = fireworks.length - 1;
    i >= 0;
    i--
  ) {

    const finished =
      fireworks[i].update();


    fireworks[i].draw();


    if (finished) {

      fireworks.splice(
        i,
        1
      );
    }
  }


  /* Explosion particles */

  for (
    let i = particles.length - 1;
    i >= 0;
    i--
  ) {

    const dead =
      particles[i].update();


    particles[i].draw();


    if (dead) {

      particles.splice(
        i,
        1
      );
    }
  }
}


animateFireworks();


/* =========================================
   RANDOM FIREWORK LOOP
   ========================================= */

function randomFireworkLoop() {

  createRandomFirework();


  const nextTime =
    5000 +
    Math.random() *5000;


  setTimeout(
    randomFireworkLoop,
    nextTime
  );
}


/* Start automatic fireworks */

setTimeout(
  randomFireworkLoop,
  1500
);