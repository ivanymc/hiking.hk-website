/*
    Pause and Play Video
*/
const VIDEO_PAUSE_BUTTON = document.querySelector(".video-pause-button");
const VIDEO_PAUSE_ICON = `video-pause-button bi bi-pause-circle`;
const VIDEO_PLAY_ICON = `video-pause-button bi bi-play-circle`;

VIDEO_PAUSE_BUTTON.addEventListener('click', e => {
    let video = e.target.previousElementSibling;

    if (video.paused) {
        video.play();
        VIDEO_PAUSE_BUTTON.classList = VIDEO_PAUSE_ICON;
    } else {        
        video.pause();
        VIDEO_PAUSE_BUTTON.classList = VIDEO_PLAY_ICON;
    }
})



