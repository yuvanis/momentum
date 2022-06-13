//Greeting

const greeting = document.querySelector('.greeting');

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

//Clock

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

// Input name

const userName = document.querySelector('.name');

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

//Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
city.value = 'Minsk';

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=31751ec93505f194aac4d9ccca3b1fff&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  if (!data.weather) {
    weatherIcon.textContent = 'Incorrect city';
    weatherIcon.classList.add('city-error');
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    weatherIcon.textContent = '';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  }
}

getWeather();

city.addEventListener('change', getWeather);

function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}

window.addEventListener('beforeunload', setLocalStorageCity)

function getLocalStorageCity() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}

window.addEventListener('load', getLocalStorageCity)

//Quotes

const quotes = [
  {
    "text": "In the End, we will remember not the words of our enemies, but the silence of our friends.",
    "author": "Martin Luther King"
  },
  {
    "text": "When you do something noble and beautiful and nobody noticed, do not be sad. For the sun every morning is a beautiful spectacle and yet most of the audience still sleeps.",
    "author": "John Lennon"
  },
  {
    "text": "The weak can never forgive. Forgiveness is the attribute of the strong.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "Wise men speak because they have something to say; fools because they have to say something.",
    "author": "Platon"
  },
  {
    "text": "Chop your own wood and it will warm you twice.",
    "author": "Henry Ford"
  },
  {
    "text": "I don’t care what you think about me. I don’t think about you at al.",
    "author": "Coco Chanel"
  },
  {
    "text": "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
    "author": "Bernard Show"
  },
  {
    "text": "Success is the ability to go from failure to failure without losing your enthusiasm.",
    "author": "Winston Churchill"
  },
  {
    "text": "There is no such thing as an accident. What we call by that name is the effect of some cause which we do not see.",
    "author": "Voltaire"
  },
  {
    "text": "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
    "author": "Mark Zuckerberg"
  },
];

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  quote.innerText = `“${random.text}”`;
  author.innerText = random.author;
}

getQuotes();

changeQuote.addEventListener('click', getQuotes);

//Background image

const body = document.querySelector('.body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const timeOfDay = getTimeOfDay();
let bgNum = getRandomNum();

function getRandomNum() {
  return (Math.floor(Math.random() * 20) + 1).toString().padStart(2, '0');
}

getRandomNum();

function setBg() {
  bgNum = bgNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
  };
}

setBg();

function getSlidePrev() {
  if (bgNum > 1) {
    bgNum--;
  } else {
    bgNum = 20;
  }
  setBg();
}

function getSlideNext() {
  if (bgNum < 20) {
    bgNum++;
  } else {
    bgNum = 1;
  }
  setBg();
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

//Audio player

const play = document.querySelector('.play');
const playItem = document.querySelectorAll('.play-item');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const audio = document.getElementById('audio');
const progress = document.querySelector('.player-progress');
const durationUpdate = document.querySelector('.duration-update');
const duration = document.querySelector('.duration');
const title = document.querySelector('.title');
const mute = document.querySelector('.volume-btn');
const volume = document.querySelector('.volume-scroll');
const songs = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];
let playNum = 0;
let value = volume.value;
let isPlay = false;
let mousedown = false;

playItem.forEach(elem => {
  elem.addEventListener('click', () => {
    playNum = songs.indexOf(elem.innerHTML);
    chosenAudio(songs[playNum]);
    playAudio();
    play.classList.add('pause');
    elem.classList.toggle('clicked')
  })
})



function chosenAudio(song) {
  audio.src = `./assets/sounds/${song}.mp3`;
  title.innerHTML = song;
}

chosenAudio(songs[playNum]);

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = songs.length - 1;
  }
  chosenAudio(songs[playNum]);
  playAudio();
  play.classList.add('pause');
}

function playNext() {
  playNum++;
  if (playNum > songs.length - 1) {
    playNum = 0;
  }
  chosenAudio(songs[playNum]);
  playAudio();
  play.classList.add('pause');
}

function startPlayer() {
  if (!isPlay) {
    playAudio();
    isPlay = true;
    play.classList.toggle('pause');
  } else {
    pauseAudio();
    isPlay = false;
    play.classList.toggle('pause');
  }
}

function changeProgress() {
  let position = (audio.currentTime / audio.duration) * 100;
  progress.value = `${position}`;
  if (progress.value == 100) {
    playNext();
  }
}

function changePosition(e) {
  audio.currentTime = (e.offsetX / progress.offsetWidth) * audio.duration;
}

function showTimeProgress() {
  let sec = parseInt(audio.duration % 60);
  let min = parseInt((audio.duration / 60) % 60);
  duration.textContent = min + ':' + sec;
  let secUp = parseInt(audio.currentTime % 60).toString().padStart(2, '0');
  let minUp = parseInt((audio.currentTime / 60) % 60);
  durationUpdate.textContent = minUp + ':' + secUp;
}

function changeMute() {
  if (audio.volume > 0) {
    volume.value = 0;
    audio.volume = 0;
    mute.classList.add('volume-btn--active');
  } else {
    volume.value = value;
    mute.classList.remove('volume-btn--active');
    changeVolume();
  }
}

function changeVolume() {
  audio.volume = volume.value;
  value = volume.value;
}

play.addEventListener('click', startPlayer);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);
audio.addEventListener('timeupdate', changeProgress);
audio.addEventListener('timeupdate', showTimeProgress);
progress.addEventListener('mousedown', changePosition);
progress.addEventListener('mousemove', (e) => mousedown && changePosition(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
mute.addEventListener('click', changeMute);
volume.addEventListener('click', changeVolume);
volume.addEventListener('mousemove', (e) => mousedown && changeVolume(e));
volume.addEventListener('mousedown', () => mousedown = true);
volume.addEventListener('mouseup', () => mousedown = false);