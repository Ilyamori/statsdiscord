// 3D Scroll
let zSpacing = -1000,
    lastPos = zSpacing / 5,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVals = []

window.onscroll = function() {
    let top = document.documentElement.scrollTop,
        delta = lastPos - top

    lastPos = top

    frames.forEach(function(n, i) {
        zVals.push((i * zSpacing) + zSpacing)
        zVals[i] += delta * -5.5
        let frame = frames[i],
            transform = `translateZ(${zVals[i]}px)`,
            opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
    })
}

window.scrollTo(0, 1)

// Audio controls
let soundButton = document.querySelector('.soundbutton'),
    soundButtonLeft = document.querySelector('.soundbutton-left'),
    audio = document.querySelector('.audio')

// Функция смены изображения кнопки soundbutton
function toggleSoundButtonImage() {
    if (audio.paused) {
        soundButton.src = 'images/player.png';  // Картинка на паузе
    } else {
        soundButton.src = 'images/playerps.png';  // Картинка при воспроизведении
    }
}

// Функция для плавного приглушения аудио
function fadeAudio(fadeIn = false) {
    let fadeTarget = fadeIn ? 1 : 0; // Цель: 1 для восстановления громкости, 0 для приглушения
    let fadeSpeed = 0.05; // Скорость изменения громкости (0.05 - плавное изменение)

    let fadeInterval = setInterval(() => {
        let currentVolume = audio.volume;
        if (Math.abs(currentVolume - fadeTarget) < fadeSpeed) {
            audio.volume = fadeTarget;
            clearInterval(fadeInterval);
        } else {
            audio.volume = currentVolume + (fadeTarget > currentVolume ? fadeSpeed : -fadeSpeed);
        }
    }, 30); // Интервал обновления громкости
}

// Слушатель событий для правой кнопки soundbutton
soundButton.addEventListener('click', e => {
    soundButton.classList.toggle('paused');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    toggleSoundButtonImage();  // Обновление изображения после каждого клика
    fadeAudio(!audio.paused);  // Приглушение или восстановление громкости
});

// Функция для управления воспроизведением при фокусе и потере фокуса
window.onfocus = function() {
    if (soundButton.classList.contains('paused')) {
        audio.pause();
    } else {
        audio.play();
    }
    toggleSoundButtonImage();  // Обновление изображения при возврате фокуса
    fadeAudio(!audio.paused);  // Приглушение или восстановление громкости
}

window.onblur = function() {
    audio.pause();
    fadeAudio(false);  // Приглушение при потере фокуса
}

// Add the left sound button with a delay
window.addEventListener('load', () => {
    setTimeout(() => {
        soundButtonLeft.classList.add('visible'); // Make left button visible after 1 second
    }, 1000); // 1 second delay
});

// Слушатель для кнопки soundbutton-left
soundButtonLeft.addEventListener('click', () => {
    // Toggle the visibility of the left sound button on click
    soundButtonLeft.classList.remove('visible');
});
