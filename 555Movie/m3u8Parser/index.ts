import Hls from "hls.js";

// const videoElem = document.getElementById("video");
// const videoSrc = ".m3u8";

// const url = '';  //包含m3ub链接的url
// const m3u8Url = decodeURIComponent(url);  //解析url得到m3u8链接

export function playM3u8(videoSrc: string, videoElem) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(videoElem);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      videoElem.play();
    });
    document.title = videoSrc;
  } else if (videoElem.canPlayType("application/vnd.apple.mpegurl")) {
    videoElem.src = videoSrc;
    videoElem.addEventListener("canplay", function () {
      videoElem.play();
    });
    videoElem.volume = 0.3;
    document.title = "医馆笑传";
  }
}

export function playPause(videoElem) {
  videoElem.paused ? videoElem.play() : videoElem.pause();
}

export function volumeUp(videoElem) {
  if (videoElem.volume <= 0.9) videoElem.volume += 0.1;
}

export function volumeDown(videoElem) {
  if (videoElem.volume >= 0.1) videoElem.volume -= 0.1;
}

export function seekRight(videoElem) {
  videoElem.currentTime += 5;
}

export function seekLeft(videoElem) {
  videoElem.currentTime -= 5;
}

// 全屏
export function vidFullscreen(videoElem) {
  if (videoElem.requestFullscreen) {
    videoElem.requestFullscreen();
  } else if (videoElem.mozRequestFullScreen) {
    videoElem.mozRequestFullScreen();
  } else if (videoElem.webkitRequestFullscreen) {
    videoElem.webkitRequestFullscreen();
  }
}
