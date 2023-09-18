const audioObj = document.querySelector('#main-audio'),
    audioPrevBtn = document.querySelector('#audio-prev'),
    audioPlayBtn = document.querySelector('#audio-play'),
    audioNextBtn = document.querySelector('#audio-next'),
    audioProggresArea = document.querySelector('.player__progress-area'),
    audioProggresBar = document.querySelector('.player__progress-bar'),
    audioCurrent = document.querySelector('.player__current'),
    audioDuration = document.querySelector('.player__duration'),
    audioRepeatBtn = document.querySelector('#audio-repeat'),
    audioIcon = document.querySelector('#audio-icon'),
    audioName = document.querySelector('#audio-name'),
    audioArtist = document.querySelector('#audio-artist');

const audio = new Audio();
audio.src = audioObj.src;

let allMusic = [];
let currentAudio = 0;
let audioProgressValue = 0;
let playlist = true;
audio.volume = 0.01;

getMusics();

audio.addEventListener('loadedmetadata', () => {
    audioDuration.textContent = getMinute(audio.duration);
    audioIcon.setAttribute('src', allMusic[currentAudio].img);
    audioIcon.setAttribute('title', `Из альбома ${allMusic[currentAudio].artist}`);
    insertText(audioName, allMusic[currentAudio].name);
    insertText(audioArtist, allMusic[currentAudio].artist);
})

audioPlayBtn.addEventListener('click', () => {
    const condition = audioPlayBtn.classList.contains('play') ? true : false;

    if (condition) {
        pauseAudio();
        return
    }

    playAudio();
});

audioPrevBtn.addEventListener('click', () => {
    currentAudio--;

    if (currentAudio < 0) {
        currentAudio = allMusic.length - 1;
    }

    replaceSrcAudio();
    playAudio();
})

audioNextBtn.addEventListener('click', () => {
    currentAudio++;

    if (currentAudio > allMusic.length - 1) {
        currentAudio = 0;
    }

    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;

    playAudio();
})

audio.addEventListener('timeupdate', () => {
    audioCurrent.textContent = getMinute(audio.currentTime);

    audioProgressValue = audio.currentTime / audio.duration * 100;

    audioProggresBar.style.width = `${audioProgressValue}%`;

    if (audio.currentTime == audio.duration) {
        audio.currentTime = 0;

        if (playlist) {
            currentAudio++;
            replaceSrcAudio();
        }

        playAudio();
    }
})

audioProggresArea.addEventListener('click', (e) => {
    const rect = audioProggresArea.getBoundingClientRect();
    let X = e.clientX - rect.x;

    audio.currentTime = (audio.duration / 100) * (X / audioProggresArea.scrollWidth * 100);

    audioPlayBtn.classList.contains('play') && audio.play();
})

audioRepeatBtn.addEventListener('click', () => {
    classToggle(audioRepeatBtn, 'track');
    const condition = audioRepeatBtn.classList.contains('track');

    if (condition) {
        insertText(audioRepeatBtn, 'repeat_one');
        audioRepeatBtn.setAttribute('title', 'Повторять трэк');
        playlist = false;
    } else {
        insertText(audioRepeatBtn, 'repeat');
        audioRepeatBtn.setAttribute('title', 'Повторять плейлист');
        playlist = true;
    }
})

function playAudio() {
    audio.play();
    classRemove(audioPlayBtn, 'pause');
    classAdd(audioPlayBtn, 'play');
    insertText(audioPlayBtn, 'pause');
    audioPlayBtn.setAttribute('title', 'Пауза');
}

function pauseAudio() {
    audio.pause();
    classRemove(audioPlayBtn, 'play');
    classAdd(audioPlayBtn, 'pause');
    insertText(audioPlayBtn, 'play_arrow');
    audioPlayBtn.setAttribute('title', 'Играть');
}

function replaceSrcAudio() {
    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;
}

async function getMusics() {
    const req = await fetch('https://diasgalymbek47.github.io/music/data.json');

    const data = await req.json();

    allMusic = await data;

    console.log(allMusic);
}