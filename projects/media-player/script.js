const container = document.querySelector(".container"),
    musicImg = container.querySelector(".img-area img"),
    musicName = container.querySelector(".song-details .name"),
    musicArtist = container.querySelector(".song-details .artist"),
    mainAudio = container.querySelector("#main-audio"),
    playPauseBtn = container.querySelector(".play-pause"),
    prevBtn = container.querySelector("#prev"),
    nextBtn = container.querySelector("#next"),
    progressArea = container.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = container.querySelector(".music-list"),
    showMoreBtn = container.querySelector("#more-music"),
    hideMusicBtn = musicList.querySelector("#close"),
    ulTag = container.querySelector("ul"),
    body = document.body;

let allMusic = [
    {
        name: "Alan Walker - Faded",
        artist: "Alan Walker",
        img: "https://fadzrinmadu.github.io/hosted-assets/awesome-custom-music-player-in-javascript/fade-cover.jpg",
        src: "https://fadzrinmadu.github.io/hosted-assets/awesome-custom-music-player-in-javascript/fade-song.mp3"
    },
    {
        name: "Cartoon - On & On (feat. Daniel Levi)",
        artist: "Cartoon",
        img: "https://fadzrinmadu.github.io/hosted-assets/awesome-custom-music-player-in-javascript/on-and-on-cover.jpg",
        src: "https://fadzrinmadu.github.io/hosted-assets/awesome-custom-music-player-in-javascript/on-and-on-song.mp3"
    },
    {
        name: "Janji - Heroes Tonight (feat. Johnning)",
        artist: "Janji",
        img: "https://fadzrinmadu.github.io/hosted-assets/awesome-custom-music-player-in-javascript/heroes-tonight-cover.jpg",
        src: "https://fadzrinmadu.github.io/hosted-assets/awesome-custom-music-player-in-javascript/heroes-tonight-song.mp3"
    },
    // Add more music tracks here
];

function loadMusicList() {
    allMusic.forEach((music, index) => {
        let liTag = `<li li-index="${index + 1}">
                        <div class="row">
                            <span>${music.name}</span>
                            <p>${music.artist}</p>
                        </div>
                        <audio class="${music.src}" src="${music.src}"></audio>
                        <span id="${music.src}" class="audio-duration">3:40</span>
                    </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ulTag.querySelector(`#${music.src}`);
        let liAudioTag = ulTag.querySelector(`.${music.src}`);

        liAudioTag.addEventListener("loadeddata", () => {
            let audioDuration = liAudioTag.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if (totalSec < 10) { totalSec = `0${totalSec}`; }
            liAudioDuration.innerText = `${totalMin}:${totalSec}`;
            liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        });
    });
}

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
    loadMusicList();
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = allMusic[indexNumb - 1].img;
    mainAudio.src = allMusic[indexNumb - 1].src;
    body.style.backgroundImage = `url(${allMusic[indexNumb - 1].img})`;
}

function playMusic() {
    container.classList.add("paused");
    playPauseBtn.querySelector("i").classList.remove("fa-play");
    playPauseBtn.querySelector("i").classList.add("fa-pause");
    mainAudio.play();
}

function pauseMusic() {
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").classList.remove("fa-pause");
    playPauseBtn.querySelector("i").classList.add("fa-play");
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--;
    if (musicIndex < 1) {
        musicIndex = allMusic.length;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function nextMusic() {
    musicIndex++;
    if (musicIndex > allMusic.length) {
        musicIndex = 1;
    }
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = container.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = container.querySelector(".current-time"),
        musicDuration = container.querySelector(".maximum-time");

    if (!mainAudio.duration) {
        mainAudio.addEventListener("loadeddata", () => {
            let mainAdDuration = mainAudio.duration;
            let totalMin = Math.floor(mainAdDuration / 60);
            let totalSec = Math.floor(mainAdDuration % 60);
            if (totalSec < 10) { totalSec = `0${totalSec}`; }
            musicDuration.innerText = `${totalMin}:${totalSec}`;
        });
    }

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { currentSec = `0${currentSec}`; }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

const repeatBtn = container.querySelector("#repeat-music");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.title;

    switch (getText) {
        case "Playlist looped":
            repeatBtn.classList.remove("fa-repeat");
            repeatBtn.classList.add("fa-repeat-1");
            repeatBtn.title = "Song looped";
            break;
        case "Song looped":
            repeatBtn.classList.remove("fa-repeat-1");
            repeatBtn.classList.add("fa-shuffle");
            repeatBtn.title = "Playback shuffled";
            break;
        case "Playback shuffled":
            repeatBtn.classList.remove("fa-shuffle");
            repeatBtn.classList.add("fa-repeat");
            repeatBtn.title = "Playlist looped";
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.title;

    switch (getText) {
        case "Playlist looped":
            nextMusic();
            break;
        case "Song looped":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "Playback shuffled":
            let randIndex;
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingSong();
            break;
    }
});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    musicList.classList.remove("show");
});

function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }

        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
