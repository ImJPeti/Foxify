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

let playMusic = document.getElementById("play");
let likedButton = document.getElementById("likedSong");
let isplaying = false;
let center = document.getElementById("center")
let player = document.getElementById("player");
let thumb = document.getElementById("thumb");
let author = document.getElementById("author");
let songTitle = document.getElementById("songTitle");

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
    console.log(obj.username);
  });



fetch("/api/playlist/all")
  .then((response) => response.json())
  .then((obj) => {
    obj.data.forEach((element) => {
      let username = document.getElementById("profileImg");
      let songListDiv = document.createElement("div");
      let songsInfoDiv = document.createElement("div");
      let imageNameDiv = document.createElement("div");
      let img = document.createElement("img");
      let nameTitleDiv = document.createElement("div");
      let singerName = document.createElement("p");
      let title = document.createElement("p");
      let playButton = document.createElement("img");

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

      console.log(element.file);
      nameTitleDiv.append(singerName, title);
      imageNameDiv.append(img, nameTitleDiv, playButton);
      songsInfoDiv.append(imageNameDiv);
      songListDiv.append(songsInfoDiv);
      center.append(songListDiv);

      playButton.addEventListener("click", () => {
        player.src = "../songs/" + element.file;
        thumb.src = "../img/" + element.thumbImg;
        author.innerHTML = element.author;
        songTitle.innerHTML = element.title
        })
    });
  });




    

