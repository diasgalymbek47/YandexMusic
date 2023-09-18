const getMinute = (seconds) => {
    let durationMinutes = Math.floor(seconds / 60);
    let durationSeconds = Math.floor(seconds % 60);

    let durationTime = [
        durationMinutes.toString().padStart('2', '0'),
        durationSeconds.toString().padStart('2', '0')
    ].join(':');

    return durationTime;
}

const insertText = (item, text) => {
    item.textContent = text;
}

const classAdd = (item, _class) => {
    item.classList.add(_class);
}

const classRemove = (item, _class) => {
    item.classList.remove(_class);
}

const classToggle = (item, _class) => {
    item.classList.toggle(_class);
}