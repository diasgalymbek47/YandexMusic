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
    playlistBtn = document.querySelector('#playlist-btn'),
    playlistClose = document.querySelector('#close-playlist'),
    playPlaylist = document.querySelector('#play-playlist'),
    shuffleBtn = document.querySelector('#shuffle');

const audio = new Audio();
audio.src = audioObj.src;

let allMusic = [];
let currentAudio = 0;
let audioProgressValue = 0;
let playlist = true;
let shuffle = false;
let oldAudio = 0;
audio.volume = 0.05;

getMusics();

setTimeout(() => {
    renderPlaylist();
    
}, 500);

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

    addAudioClass();
    playAudio();
});

audioPrevBtn.addEventListener('click', () => {
    if (shuffle) {
        currentAudio = oldAudio;
    } else {
        currentAudio--;
    }

    if (currentAudio < 0) {
        currentAudio = allMusic.length - 1;
    }

    replaceSrcAudio();
    removeAudioClass();
    playAudio();
})

audioNextBtn.addEventListener('click', () => {
    if (shuffle) {
        oldAudio = currentAudio;
        currentAudio = Math.floor(Math.random() * allMusic.length - 1);
    } else {
        currentAudio++;
    }

    if (currentAudio > allMusic.length - 1) {
        currentAudio = 0;
    }

    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;

    removeAudioClass();
    playAudio();
})

audio.addEventListener('timeupdate', () => {
    audioCurrent.textContent = getMinute(audio.currentTime);

    audioProgressValue = audio.currentTime / audio.duration * 100;

    audioProggresBar.style.width = `${audioProgressValue}%`;

    if (audio.currentTime == audio.duration) {
        audio.currentTime = 0;

        if (shuffle) {
            currentAudio = Math.floor(Math.random() * allMusic.length - 1);
        }

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

playlistClose.addEventListener('click', () => {
    classAdd(document.querySelector('#playlist'), 'hidden');
    classRemove(document.querySelector('.right__ad'), 'hidden');
})

playPlaylist.addEventListener('click', () => {
    const condition = document.querySelector('#play-playlist').classList.contains('play') ? true : false;

    if (condition) {
        pauseAudio();
        return
    }

    playAudio();
})

shuffleBtn.addEventListener('click', () => {
    if (shuffleBtn.classList.contains('shuffle')) {
        shuffle = false;
        classRemove(shuffleBtn, 'shuffle');
        insertText(shuffleBtn, 'trending_flat');
    } else {
        shuffle = true;
        classAdd(shuffleBtn, 'shuffle');
        insertText(shuffleBtn, 'shuffle');
    }
})

function playAudio() {
    audio.play();
    classRemove(audioPlayBtn, 'pause');
    classAdd(audioPlayBtn, 'play');
    classRemove(document.querySelector('#play-playlist'), 'pause');
    classAdd(document.querySelector('#play-playlist'), 'play');
    insertText(audioPlayBtn, 'pause');
    insertText(document.querySelector('#play-playlist'), 'pause');
    document.querySelector('#play-playlist').setAttribute('title', 'Пауза');
    audioPlayBtn.setAttribute('title', 'Пауза');

    addAudioClass();
}

function pauseAudio() {
    audio.pause();
    classRemove(audioPlayBtn, 'play');
    classAdd(audioPlayBtn, 'pause');
    classRemove(document.querySelector('#play-playlist'), 'play');
    classAdd(document.querySelector('#play-playlist'), 'pause');
    insertText(audioPlayBtn, 'play_arrow');
    insertText(document.querySelector('#play-playlist'), 'play_arrow');
    document.querySelector('#play-playlist').setAttribute('title', 'Играть');
    audioPlayBtn.setAttribute('title', 'Играть');

    removeAudioClass();
    addAudioClass();
}

function replaceSrcAudio(id) {
    if (id) {
        const index = allMusic.indexOf(allMusic.find(music => music.id == id));
        currentAudio = index;
    }

    audioObj.setAttribute('src', allMusic[currentAudio].src);
    audio.src = audioObj.src;

    renderPlaylist();
    addAudioClass();
}

function renderPlaylist() {
    const playlistList = document.querySelector('.right-plist__list');
    const list = document.createElement('ul');

    classAdd(list, 'right-plist__list');
    classAdd(list, 'list');

    let count = 0;

    allMusic.forEach(music => {
        const HTML = `
            <li class="list__line">
                <div class="list__line-left">
                    <div class="list__id">
                        <i id="playMusic" class="material-icons" onclick="replaceSrcAudio(${music.id}), playAudio()">play_arrow</i>
                        <span class="list__id-num">${++count}</span>
                    </div>
                    <div class="list__track">
                        <a href="#" class="list__track-name">${music.name} —</a>
                        
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
    removeAudioClass();
    addAudioClass();
}

function addAudioClass() {
    const playlistMusics = document.querySelectorAll('.list__line');

    if (audioPlayBtn.classList.contains('play')) {
        classAdd(playlistMusics[currentAudio], 'active-play');
        classRemove(playlistMusics[currentAudio], 'active-pause');
    } else {
        classRemove(playlistMusics[currentAudio], 'active-play');
        classAdd(playlistMusics[currentAudio], 'active-pause');
    }
}

function removeAudioClass() {
    const playlistMusics = document.querySelectorAll('.list__line');

    playlistMusics.forEach(music => {
        classRemove(music, 'active-play');
        classRemove(music, 'active-pause');
    })
}

async function getMusics() {
    const res = await fetch('https://diasgalymbek47.github.io/music/data.json');

    const data = await res.json();

    allMusic = await data;
}