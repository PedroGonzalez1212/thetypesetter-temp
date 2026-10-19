/* =========================================================
   The Typesetter — temporary page (English only)
   1) Plays the rebranding video full-screen (muted autoplay)
   2) When it ends, shows the coming-soon screen
   ========================================================= */

/* ---------- CONFIG ---------- */
const CONFIG = {
  linkedinUrl: "https://www.linkedin.com/company/the-typesetter/",
  contactEmail: "",          // e.g. "clientsuccessteam@thetypesetter.com.ar" (empty = hidden)
  mobileBreakpoint: 900,
};

/* ---------- DOM ---------- */
const body       = document.body;
const intro      = document.getElementById("intro");
const soon       = document.getElementById("soon");
const video      = document.getElementById("introVideo");
const soundBtn   = document.getElementById("soundBtn");
const soundLabel = document.getElementById("soundLabel");
const replayBtn  = document.getElementById("replayBtn");
const progress   = document.getElementById("progressBar");
const title      = soon.querySelector(".soon__title");

/* ---------- video source ---------- */
function pickSource() {
  const isMobile = window.matchMedia(`(max-width: ${CONFIG.mobileBreakpoint}px)`).matches;
  if (isMobile) return video.dataset.srcMobile;
  const webmOk = video.canPlayType('video/webm; codecs="vp9, opus"');
  return webmOk ? video.dataset.srcWebm : video.dataset.srcDesktop;
}

/* ---------- sound ---------- */
function updateSoundLabel() {
  soundLabel.textContent = video.muted ? "Sound on" : "Mute";
  soundBtn.setAttribute("aria-pressed", String(!video.muted));
}

soundBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  if (video.paused) video.play().catch(() => {});
  updateSoundLabel();
});

/* ---------- states ---------- */
function showSoon() {
  video.pause();
  body.classList.remove("is-intro");
  body.classList.add("is-soon");
  intro.setAttribute("aria-hidden", "true");
  soon.removeAttribute("aria-hidden");
  title.setAttribute("tabindex", "-1");
  title.focus({ preventScroll: true });
}

function playIntro() {
  body.classList.remove("is-soon");
  body.classList.add("is-intro");
  soon.setAttribute("aria-hidden", "true");
  intro.removeAttribute("aria-hidden");
  video.currentTime = 0;
  progress.style.width = "0%";
  video.play().catch(showSoon);   // autoplay blocked -> go straight to the page
  soundBtn.focus({ preventScroll: true });
}

video.addEventListener("ended", showSoon);
video.addEventListener("error", showSoon);
replayBtn.addEventListener("click", playIntro);

/* progress: update every frame (timeupdate only fires ~4x/s and looks jumpy) */
let rafId = 0;
function tickProgress() {
  if (video.duration) {
    progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
  }
  if (!video.paused && !video.ended) rafId = requestAnimationFrame(tickProgress);
}
video.addEventListener("play", () => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tickProgress);
});
video.addEventListener("pause", tickProgress);
video.addEventListener("ended", tickProgress);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && body.classList.contains("is-intro")) showSoon();
});

/* ---------- links ---------- */
document.getElementById("linkedinBtn").href = CONFIG.linkedinUrl;
if (CONFIG.contactEmail) {
  const mail = document.getElementById("mailBtn");
  mail.href = `mailto:${CONFIG.contactEmail}`;
  mail.hidden = false;
}

/* ---------- init ---------- */
updateSoundLabel();
video.src = pickSource();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  showSoon();                      // respect the user's setting; video stays one click away
} else {
  playIntro();
}
