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