console.log("Spotify Clone Loaded");

let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let currentSongName = document.getElementById('currentSongName');

let songs = [
    { name: "Song 1", file: "song1.mp3" },
    { name: "Song 2", file: "song2.mp3" },
    { name: "Song 3", file: "song3.mp3" }
];

let audioElement = new Audio(songs[0].file);
let currentSongIndex = 0;

function playCurrentSong() {
    audioElement.src = songs[currentSongIndex].file;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    currentSongName.textContent = "Now Playing: " + songs[currentSongIndex].name;
}

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playCurrentSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        currentSongName.textContent = "Paused";
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Optional: Add next/prev button functionality
const nextBtn = document.querySelector('.fa-forward-step');
const prevBtn = document.querySelector('.fa-backward-step');

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playCurrentSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playCurrentSong();
});