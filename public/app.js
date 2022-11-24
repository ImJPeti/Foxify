/*
let username = document.getElementById("profileImg");
let songListDiv = document.createElement("div");
let songsInfoDiv = document.createElement("div");
let imageNameDiv = document.createElement("div");
let img = document.createElement("img");
let nameTitleDiv = document.createElement("div");
let singerName = document.createElement("p");
let title = document.createElement("title");
*/
let center = document.getElementById("center")
let thumb = document.getElementById("thumb");
let author = document.getElementById("author");
let songTitle = document.getElementById("songTitle");
let playButton; 
let username = document.getElementById("profileImg");
let musicPlayer = document.getElementById("musicPlayer");
let closePlayer = document.getElementById("closePlayer");
let player = document.getElementById("player");
let playMusic = document.getElementById("play");
let RecentlyAdded = document.getElementById("RecentlyAdded");
let isplaying = false;
let home = document.getElementById("home");  


fetch("/home")
  .then((response) => response.json())
  .then((obj) => {
    if (obj.username) {
      username.innerHTML = obj.username;
    } else {
      username.innerHTML = "Log in";
      username.addEventListener("click", () => {
        location.href = "login";
      });
    }
  });



fetch("/api/playlist/all")
  .then((response) => response.json())
  .then((obj) => {
    obj.data.forEach((element) => {
      let songListDiv = document.createElement("div");
      let songsInfoDiv = document.createElement("div");
      let imageNameDiv = document.createElement("div");
      let img = document.createElement("img");
      let nameTitleDiv = document.createElement("div");
      let singerName = document.createElement("p");
      let title = document.createElement("p");
      playButton = document.createElement("img");
      let playListName = document.getElementById("playlistName");


      playButton.setAttribute("id", "list-play");
      songListDiv.setAttribute("class", "songs-list");
      songsInfoDiv.setAttribute("id", "song-info");
      imageNameDiv.setAttribute("class", "image-name");
      nameTitleDiv.setAttribute("class", "name-title");
      singerName.setAttribute('id', "singer-name");
      title.setAttribute("id", "title");
      img.setAttribute("id", "cover")
      img.src = "../img/" + element.thumbImg;
      playButton.src = "../img/play.svg";
      singerName.innerHTML = element.author;
      title.innerHTML = element.title;
       
      nameTitleDiv.append(singerName, title);
      imageNameDiv.append(img, nameTitleDiv, playButton);
      songsInfoDiv.append(imageNameDiv);
      songListDiv.append(songsInfoDiv);
      center.append(songListDiv);
      playListName.innerText = "Recently Added";
      
        playButton.addEventListener("click", () => {
        player.src = "../songs/" + element.file;
        thumb.src = "../img/" + element.thumbImg;
        author.innerHTML = element.author;
        songTitle.innerHTML = element.title
        musicController();
        })
      });
    });


    
function musicController() {
    if (isplaying) {
      player.pause();
      isplaying = false;
      playMusic.src = "../img/play.svg";

    } else {
      player.play();
      isplaying = true;
      playMusic.src = "../img/pause.svg";

    }

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
    }, 400);
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
}

playMusic.addEventListener("click", () => {
  musicController()
});

RecentlyAdded.addEventListener("click", () => {
  location.href = "/playlist/all";
});

home.addEventListener("click", () => {
  location.href = "/";
});

closePlayer.addEventListener("click", () => {
  musicPlayer.style.display = "none";
});