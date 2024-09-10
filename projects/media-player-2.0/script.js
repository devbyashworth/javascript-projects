const musicList = [
    {
        title: "Amon The Sign",
        artist: "Eric Skiff",
        src: "https://ericskiff.com/music/eric_skiff_-_03_-_amon_the_sign.mp3",
        thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
        duration: "4:05"
    },
    {
      title: "Walk Away From The Dark",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/walk-away-from-the-dark.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "4:01",
    },
    {
      title: "Under The Shadows",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/under-the-shadows.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:10",
    },
    {
      title: "I Believe In You",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/i-believe-in-you.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "4:22",
    },
    {
      title: "Waiting Into Darkness",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/waiting-into-darkness.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "4:43",
    },
    {
      title: "In The Room",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/in-the-room.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:04",
    },
    {
      title: "Spilled Blood",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/spilled-blood.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:33",
    },
    {
      title: "The Hunger",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/the-hunger.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:16",
    },
    {
      title: "Heartbeat",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/heartbeat.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:02",
    },
    {
      title: "They Won't Destroy Me",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/they-wont-destroy-me.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:19",
    },
    {
      title: "Without Words, Without Tears",
      artist: "Amon The Sign",
      src:
      "https://hugo-salazar.com/wp-content/themes/hugosalazar/assets/music/AmonTheSign/without-words-without-tears.mp3",
      thumbnail: "https://res.cloudinary.com/didpxejiq/image/upload/v1721729710/speaker.jpg",
      duration: "5:08",
    },
];

let currentIndex = 0;

const audio = document.getElementById('audio');
const playlist = document.querySelector('.playlist');
const nowPlayingElement = document.getElementById('js-playing-now');
const durationElement = document.getElementById('js-duration-song');
const playButton = document.querySelector('.toggle-play');
const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-previous');
const repeatButton = document.querySelector('.btn-repeat');
const shuffleButton = document.querySelector('.btn-random');
const progressBar = document.querySelector('.progress-bar');
const progressStartTime = document.querySelector('.progress-start-time');
let isPlaying = false;
let isShuffling = false;
let isRepeating = false;

function loadSong(song) {
    audio.src = song.src;
    nowPlayingElement.querySelector('h2').textContent = song.title;
    nowPlayingElement.querySelector('h3').textContent = song.artist;
    durationElement.textContent = song.duration;
    document.querySelector('.thumbnail').style.background = `url('${song.thumbnail}')`;
}

function playSong() {
    audio.play();
    isPlaying = true;
    document.querySelector('.container').classList.add('playing');
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    document.querySelector('.container').classList.remove('playing');
}

function nextSong() {
    if (isShuffling) {
        currentIndex = Math.floor(Math.random() * musicList.length);
    } else {
        currentIndex = (currentIndex + 1) % musicList.length;
    }
    loadSong(musicList[currentIndex]);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    loadSong(musicList[currentIndex]);
    playSong();
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatButton.classList.toggle('active', isRepeating);
}

function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle('active', isShuffling);
}

function updateProgressBar() {
    const { duration, currentTime } = audio;
    const percent = (currentTime / duration) * 100;
    progressBar.value = percent;
    progressBar.style.background = `linear-gradient(to right, #8440e5 ${percent}%, #ccc ${percent}%)`;
    progressStartTime.textContent = formatTime(currentTime);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', () => {
    if (isRepeating) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
repeatButton.addEventListener('click', toggleRepeat);
shuffleButton.addEventListener('click', toggleShuffle);
progressBar.addEventListener('click', setProgress);

function renderPlaylist() {
    playlist.innerHTML = musicList.map((song, index) => `
        <div class="song-list" data-index="${index}">
            <div class="song-number">${index + 1}</div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
        </div>
    `).join('');

    document.querySelectorAll('.song-list').forEach(songElement => {
        songElement.addEventListener('click', () => {
            currentIndex = songElement.getAttribute('data-index');
            loadSong(musicList[currentIndex]);
            playSong();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSong(musicList[currentIndex]);
    renderPlaylist();
});
