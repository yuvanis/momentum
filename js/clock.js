const time = document.querySelector('.time');
const day = document.querySelector('.date');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = `${currentTime}`;
  showGreeting();
  showDate();
  setTimeout(showTime, 1000);
}

showTime();

function showDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString('en-US', options);
  day.textContent = `${currentDate}`;
}