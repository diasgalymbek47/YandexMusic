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
    audioArtist = document.querySelector('#audio-artist'),
    playlistBtn = document.querySelector('#playlist-btn');

const audio = new Audio();
audio.src = audioObj.src;

let allMusic = [];
let currentAudio = 0;
let audioProgressValue = 0;
let playlist = true;
audio.volume = 0.05;

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

playlistBtn.addEventListener('click', () => {
    classToggle(document.querySelector('.right__ad'), 'hidden');
    classToggle(document.querySelector('#playlist'), 'hidden');

    renderPlaylist();
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

function replaceSrcAudio(id) {
    if (id) {
        const index = allMusic.indexOf(allMusic.find(music => music.id == id));
        currentAudio = index;
    }

    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;
}

function renderPlaylist() {
    const playlistList = document.querySelector('.right-plist__list');
    const list = document.createElement('ul');

    classAdd(list, 'right-plist__list');
    classAdd(list, 'list');

    let count = 0;

    allMusic.forEach(music => {
        console.log(music.duration);
        const HTML = `
            <li class="list__line">
                <div class="list__line-left">
                    <div class="list__id">
                        <i class="material-icons" onclick="replaceSrcAudio(${music.id}), playAudio()">play_arrow</i>
                        <span class="list__id-num">${++count}</span>
                    </div>
                    <div class="list__track">
                        <a href="#" class="list__track-name">${music.name}</a>
                        —
                        <a href="#" class="list__track-avtor">${music.artist}</a>
                    </div>
                </div>
                <div class="list__right">
                    <div class="list__description">1:54</div>
                    <div class="list__icons">
                        <i class="material-icons">delete</i>
                        <i class="material-icons">favorite_border</i>
                        <i class="material-icons">add</i>
                        <i class="material-icons">more_horiz</i>
                    </div>
                </div>
            </li>
        `

        list.insertAdjacentHTML('beforeend', HTML);
    })

    playlistList.parentNode.replaceChild(list, playlistList);
}

async function getMusics() {
    const res = await fetch('https://diasgalymbek47.github.io/music/data.json');

    const data = await res.json();

    allMusic = await data;
    console.log(data);
}