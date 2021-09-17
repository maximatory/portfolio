let video = document.querySelector('.video');
let play = document.querySelector('#play-button');
let progressVideo = document.querySelector('.progress-video');
let volumeStop = document.querySelector('#volume-stop');
let progressVolume = document.querySelector('.progress-volume');
let vindowOpen = document.querySelector('.window-open');
let speedVideo = document.querySelector('.speed-video');
let left = document.querySelector('.left');
let right = document.querySelector('.right');

// play кнопка
function playVideo() {
   const playState = video.paused ? 'play' : 'pause';
   video[playState]();
   const playOff = video.paused ? play.classList.add('pause') : play.classList.remove('pause');
};
play.addEventListener('click', playVideo);

document.addEventListener('keypress', function(event){
   if (event.charCode == 32) {
      playVideo()
   } 
});

// Клик по экрану
video.addEventListener('click', playVideo);

// включение/отключение звука
volumeStop.addEventListener('click', funcVolume);
function funcVolume() {
      video.muted = !video.muted;
      const sound = video.muted ? volumeStop.classList.add('volume-off') : volumeStop.classList.remove('volume-off');
};

document.addEventListener('keypress', function (event) {
   if (event.code == 'KeyM') {
      funcVolume();
   }
});

// полный экран
vindowOpen.addEventListener('click', function () {
   video.requestFullscreen();
});

document.addEventListener('keypress', function (event) {
   if (event.code == 'KeyF') {
      if (document.fullscreenElement === null) {
         video.requestFullscreen();
      } else {
         document.exitFullscreen();
      }
   }
});

// громкость
progressVolume.addEventListener('mousemove', function (i) {
   video.volume = i.target.value;
});




// продолжительность и перемотка видео
video.ontimeupdate = func;

progressVideo.addEventListener('click', func);

function func() {
      let d = video.duration;
      let c = video.currentTime;
      progressVideo.value = (100 * c) / d;
};

progressVideo.onclick = videoRewind;

function videoRewind() {
   let w = this.offsetWidth;
   let o = event.offsetX;
   this.value = 100 * o / w;
   video.pause();
   video.currentTime = video.duration * (o / w);
   video.play();
}

// Скорость видео
speedVideo.addEventListener('click', function () {
   video.playbackRate = speedVideo.value;
});

document.addEventListener('keypress', function (event) {
   speedVideo.value = video.playbackRate;
   if (event.code == 'Comma') {
      video.playbackRate -= 0.1;
   } else if (event.code == 'Period') {
      video.playbackRate += 0.1;
   }
});

// левая кнопка перемотки
left.addEventListener('click', leftGo);

function leftGo () {
   const playState = video.paused ? 'play' : 'pause';
   video[playState]();
   video.currentTime -= 10;
   video.play();
};

document.addEventListener('keypress', function (event) {
   if (event.code == 'KeyJ') {
      leftGo();
   }
});

// правая кнопка перемотки

right.addEventListener('click', rightGo);

function rightGo () {
   const playState = video.paused ? 'play' : 'pause';
   video[playState]();
   video.currentTime += 10;
   video.play();
};

document.addEventListener('keypress', function (event) {
   if (event.code == 'KeyL') {
      rightGo();
   }
});

console.log('L — перемотка на 10 секунд вперёд')
console.log('J — перемотка на 10 секунд назад')
console.log('Space - пауза / продолжить воспроизведение')
console.log('M  — отключение / включение звука')
console.log('F  — включение / выключение полноэкранного режим')

