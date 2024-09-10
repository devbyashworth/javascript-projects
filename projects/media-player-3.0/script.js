// JavaScript to fetch and handle media data

// Select container elements
let container = document.getElementById("container");
let player = document.getElementById("media-player");
let playlist = document.getElementById("playlist");

// Variable to store response data
let responseData;

// Create a new XMLHttpRequest object
let xhttp = new XMLHttpRequest();

// Configure it: GET-request for the URL
xhttp.open("GET", "https://5dd1894f15bbc2001448d28e.mockapi.io/playlist", true);

// Function to be called when the request is completed
xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    // 4: request finished and response is ready
    responseData = JSON.parse(this.responseText); // Parse the JSON response

    // Create playlist items
    for (let i = 0; i < responseData.length; i++) {
      playlist.appendChild(createPlaylist(responseData[i], i));
    }
    // Create player for the first item
    player.appendChild(createPlayer(responseData[0], 0));
  }
};
xhttp.send(); // Send the request

// Function to create the player
function createPlayer(data, i) {
  // Create the music card
  let musicCard = document.createElement("div");
  musicCard.className = "media-card";
  player.appendChild(musicCard);

  // Create the audio element
  let audioTrack = document.createElement("audio");
  audioTrack.id = "play-audio";
  audioTrack.src = data.file;
  musicCard.appendChild(audioTrack);

  // Create the image element
  let playerImage = document.createElement("img");
  playerImage.className = "thumbnail";
  playerImage.src = data.albumCover;
  musicCard.appendChild(playerImage);

  // Create the progress container
  let progressContainer = document.createElement("div");
  progressContainer.id = "progress-container";
  progressContainer.addEventListener(
    "mousedown",
    (evt) => {
      let clickPosition = evt.clientX - evt.target.offsetLeft;
      audioTrack.currentTime =
        (clickPosition / evt.target.offsetWidth) * audioTrack.duration - 60;
    },
    false
  );

  // Create the progress bar
  let progress = document.createElement("div");
  progress.id = "progress";
  progressContainer.appendChild(progress);
  musicCard.appendChild(progressContainer);

  // Create the play button container
  let musicIcons = document.createElement("div");
  musicIcons.className = "play-btn";
  musicCard.appendChild(musicIcons);

  // Create the random play button
  let randomPlayBtn = document.createElement("i");
  randomPlayBtn.className = "fa-solid fa-shuffle";
  randomPlayBtn.classList.add("player-icon");
  randomPlayBtn.onclick = function () {
    let randomSong = Math.floor(Math.random() * responseData.length + 1);
    if (i == 0 || i < responseData.length) {
      i = randomSong;
      handleForwardBackwardList([i]);
    }
  };
  musicIcons.appendChild(randomPlayBtn);

  // Create the backward play button
  let backwardPlayBtn = document.createElement("div");
  backwardPlayBtn.className = "fa-solid fa-backward-step";
  backwardPlayBtn.classList.add("player-icon");
  backwardPlayBtn.onclick = function () {
    if (i > 0 && i < responseData.length - 1) {
      i--;
      handleForwardBackwardList([i]);
    } else {
      i = responseData.length - 1;
      handleForwardBackwardList([i]);
    }
  };
  musicIcons.appendChild(backwardPlayBtn);

  // Create the play button
  let playBtn = document.createElement("i");
  playBtn.className = "fa-solid fa-play";
  playBtn.classList.add("player-icon");
  playBtn.classList.add("play-icon-btn");
  playBtn.id = "play-btn-id";
  playBtn.onclick = function () {
    pauseBtn.style.display = "inline-block";
    playBtn.style.display = "none";
    audioTrack.play();
    audioTrack.ontimeupdate = function () {
      let progressPercentage =
        (audioTrack.currentTime / audioTrack.duration) * 100;
      progress.style.width = `${progressPercentage}%`;
    };
  };
  let pauseBtn = document.createElement("div");
  pauseBtn.className = "fa-solid fa-pause";
  pauseBtn.classList.add("player-icon");
  pauseBtn.classList.add("play-icon-btn");
  pauseBtn.style.display = "none";
  pauseBtn.id = "pause-btn-id";
  musicIcons.appendChild(playBtn);
  pauseBtn.onclick = function () {
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
    audioTrack.pause();
  };
  musicIcons.appendChild(pauseBtn);

  // Create the forward play button
  let forwardPlayBtn = document.createElement("i");
  forwardPlayBtn.className = "fa-solid fa-forward-step";
  forwardPlayBtn.classList.add("player-icon");
  forwardPlayBtn.onclick = function () {
    if (i < responseData.length - 1) {
      i++;
      handleForwardBackwardList([i]);
    } else {
      i = 0;
      handleForwardBackwardList([i]);
    }
  };
  musicIcons.appendChild(forwardPlayBtn);

  // Create the restart music button
  let restartMusicBtn = document.createElement("i");
  restartMusicBtn.className = "fa-solid fa-history";
  restartMusicBtn.classList.add("player-icon");
  restartMusicBtn.onclick = function () {
    audioTrack.currentTime = 0;
  };
  musicIcons.appendChild(restartMusicBtn);

  // Create the music details container
  let musicDetails = document.createElement("div");
  musicCard.appendChild(musicDetails);

  // Create the song name element
  let musicName = document.createElement("h3");
  musicName.className = "song-name";
  musicName.innerHTML = data.track;
  musicDetails.appendChild(musicName);

  // Create the artist element
  let artist = document.createElement("h4");
  artist.className = "song-artist";
  artist.innerHTML = data.artist;
  musicDetails.appendChild(artist);

  // Function to handle forward and backward button clicks
  function handleForwardBackwardList() {
    audioTrack.src = "";
    audioTrack.src = responseData[i].file;
    audioTrack.currentTime = 0;
    playerImage.src = "";
    playerImage.src = responseData[i].albumCover;
    musicName.innerHTML = "";
    musicName.innerHTML = responseData[i].track;
    artist.innerHTML = "";
    artist.innerHTML = responseData[i].artist;
    pauseBtn.style.display = "inline-block";
    playBtn.style.display = "none";
    audioTrack.play();
    audioTrack.ontimeupdate = function () {
      let progressPercentage =
        (audioTrack.currentTime / audioTrack.duration) * 100;
      progress.style.width = `${progressPercentage}%`;
    };
  }

  return musicCard;
}

// Function to create playlist items
function createPlaylist(data, i) {
  // Create the playlist item container
  let musicPlaylist = document.createElement("div");
  musicPlaylist.className = "playlist";

  // Onclick event to play the selected item
  musicPlaylist.onclick = function () {
    player.innerHTML = "";
    player.appendChild(createPlayer(responseData[i], i));
    let playAudio = document.getElementById("play-audio");
    playAudio.play();

    let musicPauseBtn = document.getElementById("pause-btn-id");
    musicPauseBtn.style.display = "inline-block";

    let musicPlayBtn = document.getElementById("play-btn-id");
    musicPlayBtn.style.display = "none";

    let progressBar = document.getElementById("progress");
    playAudio.ontimeupdate = function () {
      let progressPercentage =
        (playAudio.currentTime / playAudio.duration) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    };
  };

  // Create the thumbnail image
  let thumbnails = document.createElement("img");
  thumbnails.src = data.albumCover;
  thumbnails.className = "thumbnails";
  musicPlaylist.appendChild(thumbnails);

  // Create the music details container
  let musicDetails = document.createElement("div");
  musicDetails.className = "details";
  musicPlaylist.appendChild(musicDetails);

  // Create the title element
  let title = document.createElement("h5");
  title.className = "title";
  title.innerHTML = data.track;
  musicDetails.appendChild(title);

  // Create the artist element
  let artist = document.createElement("p");
  artist.className = "artist";
  artist.innerHTML = data.artist;
  musicDetails.appendChild(artist);

  return musicPlaylist;
}
