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

function clearItems() {
  playItem.forEach(elem => {
    elem.classList.remove('clicked')
  })
}

playItem.forEach(elem => {
  elem.addEventListener('click', () => {
    playNum = songs.indexOf(elem.innerHTML);
    chosenAudio(songs[playNum]);
    
    if (!isPlay) {
      playAudio();
      isPlay = true;
      play.classList.add('pause');
      elem.classList.toggle('clicked')
    } else {
      pauseAudio();
      isPlay = false;
      play.classList.remove('pause');
      elem.classList.toggle('clicked')
    }
  })
})

console.log(playItem[1])

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
  showTimeProgress();
  playNum--;
  clearItems();
  if (playNum < 0) {
    playNum = songs.length - 1;
  }
  chosenAudio(songs[playNum]);
  playAudio();
  play.classList.add('pause');
  playItem[playNum].classList.add('clicked');
}

function playNext() {
  showTimeProgress();
  playNum++;
  clearItems();
  if (playNum > songs.length - 1) {
    playNum = 0;
  }
  chosenAudio(songs[playNum]);
  playAudio();
  play.classList.add('pause');
  playItem[playNum].classList.add('clicked');
}

function startPlayer() {
  showTimeProgress();
  if (!isPlay) {
    playAudio();
    isPlay = true;
    play.classList.toggle('pause');
    playItem[playNum].classList.add('clicked');
  } else {
    pauseAudio();
    isPlay = false;
    play.classList.toggle('pause');
    playItem[playNum].classList.remove('clicked');
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
window.onload = showTimeProgress;
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