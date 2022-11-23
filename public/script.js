let player = document.getElementById("player");
let playMusic = document.getElementById("play");
let likedButton = document.getElementById("likedSong");
let isplaying = false;


  playMusic.addEventListener("click", () => {
  if (isplaying) {
    player.pause();
    isplaying = false;
    playMusic.src ="/img/play.svg"
  } else {
    player.play();
    isplaying = true;
    playMusic.src = "/img/pause.svg";
  }
})

$("#player").on("timeupdate", function () {
  $("#seekbar").attr("value", this.currentTime / this.duration);
});

let currentMusic = 0;
const seekBar = document.querySelector(".seek-bar");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const setMusic = (i) => {
  seekBar.value = 0; // set range slide value to 0;
  currentMusic = i;
  player.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    seekBar.max = player.duration;
    musicDuration.innerHTML = formatTime(player.duration);
  }, 300);
};

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

setInterval(() => {
  seekBar.value = player.currentTime;
  currentTime.innerHTML = formatTime(player.currentTime);
}, 500);
seekBar.addEventListener("change", () => {
  player.currentTime = seekBar.value;
});
let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function (e) {
  player.volume = e.currentTarget.value / 100;
});


likedButton.addEventListener("click", () => {
  location.href = "/playlist/all";
})

 