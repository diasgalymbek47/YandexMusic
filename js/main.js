window.onscroll = () => {
    if (document.documentElement.scrollTop > 30) {
        document.querySelector('.right-plist__list').style.height = 'calc(100vh - (72px + 30px + 131px + 50px))';
    } else {
        document.querySelector('.right-plist__list').style.height = 'calc(100vh - (72px + 30px + 131px + 100px))';
    }
}