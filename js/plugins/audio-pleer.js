const audioObj = document.querySelector('#main-audio'),
    audioPrevBtn = document.querySelector('#audio-prev'),
    audioPlayBtn = document.querySelector('#audio-play'),
    audioNextBtn = document.querySelector('#audio-next'),
    audioProggresArea = document.querySelector('.player__progress-area'),
    audioProggresItem = document.querySelector('.player__progress-bar'),
    audioCurrent = document.querySelector('.player__current'),
    audioDuration = document.querySelector('.player__duration');

const audio = new Audio();
audio.src = audioObj.src;

let currentAudio = 0;
let audioProggresBar = 0;

audio.addEventListener('loadedmetadata', () => {
    audioDuration.textContent = getMinute(audio.duration);
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
    currentAudio > 0
        ? currentAudio--
        : currentAudio = 0;

    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;

    audio.play();
    audioPlayBtn.classList.remove('pause');
    audioPlayBtn.classList.add('play');
    audioPlayBtn.querySelector('.material-icons').textContent = 'pause';
    audioPlayBtn.setAttribute('title', 'Пауза');
})

audioNextBtn.addEventListener('click', () => {
    currentAudio < allMusic.length - 1
        ? currentAudio++
        : currentAudio = allMusic.length - 1

    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;

    audio.play();
    audioPlayBtn.classList.remove('pause');
    audioPlayBtn.classList.add('play');
    audioPlayBtn.querySelector('.material-icons').textContent = 'pause';
    audioPlayBtn.setAttribute('title', 'Пауза');
})

audio.addEventListener('timeupdate', () => {
    audioCurrent.textContent = getMinute(audio.currentTime);

    audioProggresBar = audio.currentTime / audio.duration * 100;

    audioProggresItem.style.width = `${audioProggresBar}%`;

    if (audio.currentTime == audio.duration) {
        audio.currentTime = 0;
        audio.pause();
        audioPlayBtn.classList.remove('play');
        audioPlayBtn.classList.add('pause');
        audioPlayBtn.querySelector('.material-icons').textContent = 'play_arrow';
        audioPlayBtn.setAttribute('title', 'Играть');
    }
})

audioProggresArea.addEventListener('click', (e) => {
    const rect = audioProggresArea.getBoundingClientRect();
    let X = e.clientX - rect.x;

    audio.currentTime = (audio.duration / 100) * (X / audioProggresArea.scrollWidth * 100);

    audioPlayBtn.classList.contains('play') && audio.play();
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