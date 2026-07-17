document.addEventListener('DOMContentLoaded', () => {
AOS.init({
duration: 900,
easing: 'ease-out-cubic',
once: true,
offset: 80
});

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const scrollContainer = document.getElementById('scroll-container');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const newsletterForm = document.querySelector('.newsletter form');

const state = {
direction: -1,
autoPauseUntil: 0,
pointerDown: false,
startX: 0,
startScrollLeft: 0,
lastMoveX: 0,
cardStep: 320
};

function updateCardStep() {
const firstCard = scrollContainer.querySelector('.project-card');
if (!firstCard) return;
const containerStyle = getComputedStyle(scrollContainer);
const gap = parseFloat(containerStyle.gap || containerStyle.columnGap || '16') || 16;
state.cardStep = firstCard.getBoundingClientRect().width + gap;
}

function maxScrollLeft() {
return Math.max(0, scrollContainer.scrollWidth - scrollContainer.clientWidth);
}

function pauseAuto() {
state.autoPauseUntil = performance.now() + 3000;
}

function moveOneCard(direction) {
scrollContainer.scrollBy({
left: -direction * state.cardStep,
behavior: 'smooth'
});
}

function setDirection(direction, nudge) {
state.direction = direction;
pauseAuto();
if (nudge) {
moveOneCard(direction);
}
}

function autoScrollLoop() {
const now = performance.now();

if (!state.pointerDown && now >= state.autoPauseUntil) {
  scrollContainer.scrollLeft -= state.direction * 0.45;

  if (scrollContainer.scrollLeft <= 0) {
    scrollContainer.scrollLeft = 0;
    state.direction = -1;
  }

  if (scrollContainer.scrollLeft >= maxScrollLeft() - 1) {
    scrollContainer.scrollLeft = maxScrollLeft();
    state.direction = 1;
  }
}

requestAnimationFrame(autoScrollLoop);

}

menuBtn.addEventListener('click', () => {
navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => navMenu.classList.remove('open'));
});

scrollTopBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollLeftBtn.addEventListener('click', () => {
const requestedDirection = -1;
const sameDirection = state.direction === requestedDirection;
setDirection(requestedDirection, sameDirection);
});

scrollRightBtn.addEventListener('click', () => {
const requestedDirection = 1;
const sameDirection = state.direction === requestedDirection;
setDirection(requestedDirection, sameDirection);
});

document.addEventListener('click', (e) => {
const isClickInsideNav = e.target.closest('.nav');
if (!isClickInsideNav) navMenu.classList.remove('open');
});

if (newsletterForm) {
newsletterForm.addEventListener('submit', (e) => {
e.preventDefault();
alert('Merci pour ton inscription !');
});
}

scrollContainer.addEventListener('pointerdown', (e) => {
state.pointerDown = true;
state.startX = e.clientX;
state.startScrollLeft = scrollContainer.scrollLeft;
state.lastMoveX = e.clientX;
pauseAuto();
scrollContainer.classList.add('dragging');
if (scrollContainer.setPointerCapture) {
scrollContainer.setPointerCapture(e.pointerId);
}
});

scrollContainer.addEventListener('pointermove', (e) => {
if (!state.pointerDown) return;
const dx = e.clientX - state.startX;
scrollContainer.scrollLeft = state.startScrollLeft - dx;
state.lastMoveX = e.clientX;
});

function endPointerDrag() {
if (!state.pointerDown) return;
const dx = state.lastMoveX - state.startX;

if (Math.abs(dx) > 8) {
  state.direction = dx < 0 ? -1 : 1;
}

state.pointerDown = false;
scrollContainer.classList.remove('dragging');
pauseAuto();

}

scrollContainer.addEventListener('pointerup', endPointerDrag);
scrollContainer.addEventListener('pointercancel', endPointerDrag);
scrollContainer.addEventListener('pointerleave', () => {
if (state.pointerDown) endPointerDrag();
});

window.addEventListener('keydown', (e) => {
if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

if (e.key === 'ArrowLeft') {
  const requestedDirection = -1;
  const sameDirection = state.direction === requestedDirection;
  setDirection(requestedDirection, sameDirection);
}

if (e.key === 'ArrowRight') {
  const requestedDirection = 1;
  const sameDirection = state.direction === requestedDirection;
  setDirection(requestedDirection, sameDirection);
}

if (e.key === 'ArrowUp') {
  const requestedDirection = -1;
  const sameDirection = state.direction === requestedDirection;
  setDirection(requestedDirection, sameDirection);
}

if (e.key === 'ArrowDown') {
  const requestedDirection = 1;
  const sameDirection = state.direction === requestedDirection;
  setDirection(requestedDirection, sameDirection);
}

if (e.key === ' ') {
  pauseAuto();
  e.preventDefault();
}

});

window.addEventListener('resize', updateCardStep);

updateCardStep();
autoScrollLoop();
});
