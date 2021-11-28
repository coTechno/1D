// Initialize the Variables
const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');

const songs = [
    { name: "1", title: "Best Song Ever", artist: "One Direction", },
    { name: "2", title: "Little Things", artist: "One Direction", },
    { name: "3", title: "No Control", artist: "One Direction", },
    { name: "4", title: "Right Now", artist: "One Direction", },
    { name: "5", title: "Story of My Life", artist: "One Direction", },
    { name: "6", title: "W M Y B", artist: "One Direction", },
    { name: "7", title: "You & I", artist: "One Direction", },
    { name: "8", title: "18", artist: "One Direction", },
    { name: "9", title: "I Would", artist: "One Direction", },
    { name: "10", title: "Drag Me Down", artist: "One Direction", },
    { name: "11", title: "Infinity", artist: "One Direction", },
    { name: "12", title: "Kiss You", artist: "One Direction", },
    { name: "13", title: "Night Changes", artist: "One Direction", },
    { name: "14", title: "Liv While W're Yng", artist: "One Direction", },
    { name: "15", title: "One Thing", artist: "One Direction", },
    { name: "16", title: "Perfect", artist: "One Direction", },
    { name: "17", title: "Steal My Girl", artist: "One Direction", },
    { name: "18", title: "Rock Me", artist: "One Direction", },
];
let isPlaying = false;
music.load();
// for pause functionality
function pauseMusic() {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime');
};
// for play functionality
function playMusic() {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime');
};
play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});

// changing the music data
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    // music.src = "music/" + songs.name + ".m4a";
    music.src = `music/${songs.name}.m4a`;
    img.src = "images/" + songs.name + ".jpg";
};

let songIndex = 0;
// loadSong(songs[2]);
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// progress js work

music.addEventListener('timeupdate', (event) => {
    // console.log(event);
    const { currentTime, duration } = event.srcElement;

    let progress_time = parseInt((currentTime / duration) * 100);
    progress.style.width = `${progress_time}%`;

    // music duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    // current duration update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
})

// progress onclick fnctionality
progress_div.addEventListener('click', (event) => {
    const { duration } = music;
    let move_progress =
        parseInt((event.offsetX / event.srcElement.clientWidth) * duration);
    music.currentTime = move_progress;
})


// if music end call nextSong function
music.addEventListener('ended', nextSong);


next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);