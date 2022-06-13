const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = hours / 6;
  if (timeOfDay < 2 && timeOfDay >= 1) return 'morning';
  if (timeOfDay < 3 && timeOfDay >= 2) return 'afternoon';
  if (timeOfDay < 4 && timeOfDay >= 3) return 'evening';
  if (timeOfDay < 1 && timeOfDay >= 0) return 'night';
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay},`;
}

function setLocalStorage() {
  localStorage.setItem('name', userName.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    userName.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage)