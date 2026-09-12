// Hero Slider Auto-play
let currentSlide = 1;
const totalSlides = 3;

function showSlide(slide) {
  document.getElementById("slide" + slide).checked = true;
}

setInterval(() => {
  currentSlide++;
  if (currentSlide > totalSlides) currentSlide = 1;
  showSlide(currentSlide);
}, 5000); // change every 5 seconds

// Confetti Animation (simple burst)
function launchConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = ["#ff8a24", "#f7c95c", "#ff4f8c"][Math.floor(Math.random() * 3)];
    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Attach confetti to buttons
document.querySelectorAll(".primary-button, .secondary-button").forEach(btn => {
  btn.addEventListener("click", launchConfetti);
});


// Diwali date (example: Nov 1, 2026)
const diwaliDate = new Date("Nov 1, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = diwaliDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
