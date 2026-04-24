// 音樂控制邏輯
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle-btn');
const volumeSlider = document.getElementById('volume-slider');

if (music && volumeSlider) {
    music.volume = volumeSlider.value;
}

function toggleMusic() {
    if (!music) return;
    if (music.paused) {
        music.play()
            .then(() => {
                toggleBtn.innerText = "||";
                console.log("背景音樂開始播放");
            })
            .catch(e => console.error("播放失敗:", e));
    } else {
        music.pause();
        toggleBtn.innerText = "♪";
        console.log("已暫停");
    }
}

function updateVolume(val) {
    if (music) music.volume = val;
}

document.addEventListener('click', function() {
    if (music && music.paused && toggleBtn.innerText === "♪") {
        toggleMusic();
    }
}, { once: true });

/**
 * 愛麗絲摺疊邏輯優化
 */

// 1. 全局關閉函數：關閉所有圖片區塊
function closeAllContainers(exceptId = null) {
    // 關閉主要愛麗絲區塊 (div01, div02, div03)
    $('.picture-container').each(function() {
        if ($(this).attr('id') !== exceptId && !$(this).is(':hidden')) {
            $(this).slideUp(300);
        }
    });

    // 如果目前操作的不是里德爾相關區塊，則隱藏里德爾整個區域
    if (exceptId !== 'div04' && exceptId !== 'liddell-section') {
        if (!$('#liddell-section').is(':hidden')) {
            $('#div04').slideUp(200);
            $('#liddell-section').fadeOut(300);
        }
    }
}

// 2. 切換主要愛麗絲 (天、橘、瑪)
function toggleAlice(targetId) {
    const $target = $(`#${targetId}`);
    
    // 如果點擊的是已經開啟的，就關閉它
    if (!$target.is(':hidden')) {
        $target.slideUp(300);
    } else {
        // 否則，先關閉其他所有，再開啟目標
        closeAllContainers(targetId);
        $target.slideDown(300);
    }
}

// 3. 切換秘密按鈕 [X]
function toggleSecret() {
    const $section = $('#liddell-section');
    if (!$section.is(':hidden')) {
        // 關閉秘密區塊時，也把裡面的圖片關掉
        $('#div04').slideUp(200);
        $section.fadeOut(300);
    } else {
        // 開啟秘密區塊時，關閉其他所有主要愛麗絲
        closeAllContainers();
        $section.fadeIn(300);
    }
}

// 4. 里德爾抽獎邏輯與狀態管理
let currentLiddellState = "01"; 

function toggleLiddell() {
    const $div04 = $('#div04');
    const isHidden = $div04.is(':hidden');

    if (isHidden) {
        // 開啟前先關閉其他
        closeAllContainers('div04');
        
        // 抽獎邏輯 (1/3 機率抽中小紅帽)
        const rand = Math.floor(Math.random() * 3) + 1;
        const $img = $('#liddell-img');
        const $controls = $('#liddell-controls');
        const $notAlice = $('#not-alice-text');

        if (rand === 3) {
            $img.attr('src', './AliceSource/小紅帽.png');
            $controls.hide();
            $notAlice.show();
        } else {
            // 重置為里德爾初始狀態
            resetLiddellState();
            $img.attr('src', './AliceSource/里德爾.png');
            $controls.show();
            $notAlice.hide();
        }
        $div04.slideDown(400);
    } else {
        $div04.slideUp(400);
    }
}

function resetLiddellState() {
    currentLiddellState = "01";
    $('#text01').text("我等這一刻很久了，").css('color', 'black');
    $('#text02').text("蠕動潛行者").css('color', 'red');
}

function toggleLiddellState() {
    const $img = $('#liddell-img');
    const $text01 = $('#text01');
    const $text02 = $('#text02');

    if (currentLiddellState === "01") {
        currentLiddellState = "02";
        $img.attr('src', './AliceSource/小红帽斩首(BLACK_SOULS).jpg');
        $text01.text("回去").css('color', 'black');
        $text02.text("");
    } else {
        resetLiddellState();
        $img.attr('src', './AliceSource/里德爾.png');
    }
}

function checkLiddellEasterEgg() {
    const imgSrc = $('#liddell-img').attr('src');
    if (imgSrc.includes('里德爾.png')) {
        alert('被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了被發現了');
    }
}
