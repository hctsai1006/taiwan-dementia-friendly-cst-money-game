// 遊戲數據 - 台灣本土化
const gameData = {
    items: [
        {
            id: 1,
            name: "黑松汽水",
            image: "https://via.placeholder.com/200x200/4a90e2/ffffff?text=黑松汽水",
            description: "250ml 玻璃瓶裝，台灣人的童年回憶",
            oldPrice: 5,
            newPrice: 20,
            memoryPrompt: "還記得小時候喝黑松汽水的清涼感嗎？那時候一瓶只要 5 塊錢呢！",
            memoryText: "那個年代，黑松汽水是夏天最棒的享受。玻璃瓶裝的汽水，喝完還可以退瓶換錢。",
            priceOptions: [3, 5, 8, 12],
            hint: "那時候一碗陽春麵才 10 元，汽水大概是麵的一半價錢"
        },
        {
            id: 2,
            name: "陽春麵",
            image: "https://via.placeholder.com/200x200/e67e22/ffffff?text=陽春麵",
            description: "路邊麵攤一碗熱騰騰的陽春麵",
            oldPrice: 10,
            newPrice: 45,
            memoryPrompt: "想起那時候路邊攤的陽春麵，香噴噴又便宜，是學生最愛的平價美食。",
            memoryText: "1970年代的陽春麵，湯頭清香，麵條Q彈，10元就能飽餐一頓，是庶民的美味。",
            priceOptions: [8, 10, 15, 20],
            hint: "那時候工人一天工資大概 50-80 元，一碗麵大概是工資的 1/5"
        },
        {
            id: 3,
            name: "台北市公車票",
            image: "https://via.placeholder.com/200x200/27ae60/ffffff?text=公車票",
            description: "紙製車票，上車投幣購票",
            oldPrice: 2,
            newPrice: 15,
            memoryPrompt: "那時候搭公車要投錢幣，售票小姐會撕票給你，記得嗎？",
            memoryText: "1970年代的公車票只要2元，售票員會在車上收費，那是台北交通的美好回憶。",
            priceOptions: [1, 2, 5, 8],
            hint: "那時候最便宜的交通工具，比現在的悠遊卡便宜很多"
        },
        {
            id: 4,
            name: "大同電鍋",
            image: "https://via.placeholder.com/200x200/8e44ad/ffffff?text=大同電鍋",
            description: "10人份綠色大同電鍋，台灣家庭必備",
            oldPrice: 1200,
            newPrice: 2380,
            memoryPrompt: "綠色的大同電鍋，是每個台灣家庭的廚房寶貝，什麼都能煮！",
            memoryText: "大同電鍋是台灣的驕傲，一個電鍋用幾十年，蒸煮炒炸樣樣行，是媽媽的好幫手。",
            priceOptions: [800, 1200, 1800, 2500],
            hint: "那時候算是貴重家電，大概是一個月薪水的價格"
        },
        {
            id: 5,
            name: "50元梅花幣",
            image: "https://via.placeholder.com/200x200/f39c12/ffffff?text=梅花幣",
            description: "已停止流通的 50 元梅花硬幣",
            oldPrice: 50,
            newPrice: 300,
            memoryPrompt: "這個梅花造型的硬幣，現在已經變成收藏品了呢！",
            memoryText: "梅花50元硬幣在當年是很大的面額，現在因為停止流通，成了珍貴的收藏品。",
            priceOptions: [50, 80, 120, 200],
            hint: "就是本來的面額，但現在收藏價值更高"
        },
        {
            id: 6,
            name: "茄芷袋",
            image: "https://via.placeholder.com/200x200/34495e/ffffff?text=茄芷袋",
            description: "尼龍材質購物袋，阿嬤的最愛",
            oldPrice: 12,
            newPrice: 120,
            memoryPrompt: "阿嬤總是提著花花綠綠的茄芷袋去菜市場買菜，超耐用的！",
            memoryText: "茄芷袋是台灣婆婆媽媽的購物良伴，耐用又便宜，是環保購物袋的始祖。",
            priceOptions: [8, 12, 18, 25],
            hint: "比一碗陽春麵稍微貴一點點"
        },
        {
            id: 7,
            name: "乖乖奶油椰子",
            image: "https://via.placeholder.com/200x200/e74c3c/ffffff?text=乖乖",
            description: "60g 包裝奶油椰子口味乖乖",
            oldPrice: 3,
            newPrice: 25,
            memoryPrompt: "小時候最愛的零食，奶油椰子口味香香甜甜，一口接一口！",
            memoryText: "乖乖是台灣小朋友的童年零食，奶油椰子口味特別受歡迎，3元就能買到滿滿的快樂。",
            priceOptions: [2, 3, 5, 8],
            hint: "小朋友的零用錢就能買得起的小點心"
        },
        {
            id: 8,
            name: "黑白照片",
            image: "https://via.placeholder.com/200x200/95a5a6/ffffff?text=證件照",
            description: "2吋黑白證件照，照相館拍攝",
            oldPrice: 8,
            newPrice: 150,
            memoryPrompt: "那時候拍證件照要特地去照相館，黑白照片洗出來要等好久！",
            memoryText: "1970年代拍證件照是大事，要穿整齊到照相館，黑白照片8元，彩色還要更貴。",
            priceOptions: [5, 8, 12, 20],
            hint: "比一碗陽春麵便宜一點，但比公車票貴很多"
        }
    ]
};

// 遊戲狀態
let gameState = {
    currentItemIndex: 0,
    correctAnswers: 0,
    userAnswers: [],
    soundEnabled: true,
    currentScreen: 'welcome'
};

// 音效控制
function playClickSound() {
    if (gameState.soundEnabled) {
        const audio = document.getElementById('clickSound');
        audio.currentTime = 0;
        audio.play().catch(e => console.log('音效播放失敗:', e));
    }
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const soundToggle = document.getElementById('soundToggle');
    soundToggle.textContent = gameState.soundEnabled ? '🔊' : '🔇';
    soundToggle.classList.toggle('muted', !gameState.soundEnabled);
    playClickSound();
}

// 語音播報 (如果支援)
function speak(text) {
    if (gameState.soundEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// 螢幕切換
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
    
    // 更新進度條
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    let progress = 0;
    
    switch(gameState.currentScreen) {
        case 'welcome': progress = 0; break;
        case 'instruction': progress = 10; break;
        case 'game': progress = 20 + (gameState.currentItemIndex / gameData.items.length) * 60; break;
        case 'answer': progress = 20 + (gameState.currentItemIndex / gameData.items.length) * 60; break;
        case 'end': progress = 100; break;
        default: progress = 0;
    }
    
    progressBar.style.width = progress + '%';
}

// 遊戲開始
function startGame() {
    playClickSound();
    speak('歡迎來到懷舊金錢遊戲，讓我們開始吧！');
    showScreen('instructionScreen');
}

function showFirstItem() {
    playClickSound();
    gameState.currentItemIndex = 0;
    gameState.correctAnswers = 0;
    gameState.userAnswers = [];
    showScreen('gameScreen');
    loadCurrentItem();
}

// 載入當前物品
function loadCurrentItem() {
    const item = gameData.items[gameState.currentItemIndex];
    const currentItemNumber = document.getElementById('currentItemNumber');
    const itemImg = document.getElementById('itemImg');
    const itemName = document.getElementById('itemName');
    const itemDescription = document.getElementById('itemDescription');
    const memoryPrompt = document.getElementById('memoryPrompt');
    const priceOptions = document.getElementById('priceOptions');
    
    // 更新物品資訊
    currentItemNumber.textContent = gameState.currentItemIndex + 1;
    itemImg.src = item.image;
    itemImg.alt = item.name;
    itemName.textContent = item.name;
    itemDescription.textContent = item.description;
    memoryPrompt.textContent = item.memoryPrompt;
    
    // 生成價格選項
    priceOptions.innerHTML = '';
    item.priceOptions.forEach(price => {
        const option = document.createElement('div');
        option.className = 'price-option';
        option.textContent = `${price} 元`;
        option.onclick = () => selectPrice(price, item.oldPrice);
        priceOptions.appendChild(option);
    });
    
    // 重置按鈕狀態
    document.getElementById('hintBtn').style.display = 'block';
    document.getElementById('revealBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    
    // 語音播報
    speak(`第${gameState.currentItemIndex + 1}項物品：${item.name}`);
}

// 選擇價格
function selectPrice(selectedPrice, correctPrice) {
    playClickSound();
    
    // 移除之前的選中狀態
    document.querySelectorAll('.price-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 標記選中的選項
    event.target.classList.add('selected');
    
    // 檢查答案
    const isCorrect = selectedPrice === correctPrice;
    gameState.userAnswers.push({
        itemId: gameData.items[gameState.currentItemIndex].id,
        selected: selectedPrice,
        correct: correctPrice,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        gameState.correctAnswers++;
        event.target.classList.add('correct');
        speak('答對了！真棒！');
    } else {
        event.target.classList.add('incorrect');
        // 顯示正確答案
        document.querySelectorAll('.price-option').forEach(option => {
            if (option.textContent === `${correctPrice} 元`) {
                option.classList.add('correct');
            }
        });
        speak('不太對喔，讓我們看看正確答案');
    }
    
    // 顯示答案按鈕
    setTimeout(() => {
        document.getElementById('hintBtn').style.display = 'none';
        document.getElementById('revealBtn').style.display = 'block';
    }, 1500);
}

// 顯示提示
function showHint() {
    playClickSound();
    const item = gameData.items[gameState.currentItemIndex];
    alert(`💡 提示：${item.hint}`);
    speak(`提示：${item.hint}`);
}

// 揭曉答案
function revealAnswer() {
    playClickSound();
    const item = gameData.items[gameState.currentItemIndex];
    
    // 設置答案畫面的內容
    document.getElementById('oldPrice').textContent = `${item.oldPrice} 元`;
    document.getElementById('newPrice').textContent = `${item.newPrice} 元`;
    document.getElementById('memoryText').textContent = item.memoryText;
    
    // 計算價格變化
    const priceIncrease = Math.round((item.newPrice / item.oldPrice) * 100) / 100;
    const increasePercentage = Math.round(((item.newPrice - item.oldPrice) / item.oldPrice) * 100);
    document.getElementById('priceChange').textContent = 
        `漲了 ${priceIncrease} 倍 (${increasePercentage}%)`;
    
    showScreen('answerScreen');
    speak(`${item.name}在1970年是${item.oldPrice}元，現在是${item.newPrice}元`);
}

// 繼續遊戲
function continueGame() {
    playClickSound();
    gameState.currentItemIndex++;
    
    if (gameState.currentItemIndex < gameData.items.length) {
        showScreen('gameScreen');
        loadCurrentItem();
    } else {
        showEndScreen();
    }
}

// 下一個物品 (從遊戲畫面直接跳到下一個)
function nextItem() {
    continueGame();
}

// 顯示結束畫面
function showEndScreen() {
    document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
    showScreen('endScreen');
    speak(`遊戲結束！您總共答對了${gameState.correctAnswers}題`);
    
    // 播放慶祝動畫
    confetti();
}

// 重新開始遊戲
function restartGame() {
    playClickSound();
    gameState.currentItemIndex = 0;
    gameState.correctAnswers = 0;
    gameState.userAnswers = [];
    showScreen('welcomeScreen');
    speak('重新開始遊戲');
}

// 顯示製作團隊
function showCredits() {
    playClickSound();
    showScreen('creditsScreen');
}

// 回到結束畫面
function backToEnd() {
    playClickSound();
    showScreen('endScreen');
}

// 慶祝動畫 (簡單版本)
function confetti() {
    // 創建彩帶效果
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    // 動畫
    let position = -10;
    let rotation = 0;
    const gravity = 2;
    const wind = (Math.random() - 0.5) * 2;
    
    const animate = () => {
        position += gravity;
        rotation += 10;
        confetti.style.top = position + 'px';
        confetti.style.transform = `rotate(${rotation}deg) translateX(${wind * position / 10}px)`;
        
        if (position < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    };
    
    requestAnimationFrame(animate);
}

// 鍵盤支援
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'Enter':
        case ' ':
            event.preventDefault();
            // 根據當前畫面執行相應操作
            if (gameState.currentScreen === 'welcome') {
                startGame();
            } else if (gameState.currentScreen === 'instruction') {
                showFirstItem();
            } else if (gameState.currentScreen === 'answer') {
                continueGame();
            }
            break;
        case 'Escape':
            event.preventDefault();
            if (gameState.currentScreen !== 'welcome') {
                if (confirm('確定要回到主選單嗎？')) {
                    showScreen('welcomeScreen');
                }
            }
            break;
    }
});

// 觸控支援改善
document.addEventListener('touchstart', function() {}, {passive: true});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcomeScreen');
    console.log('失智友善懷舊金錢遊戲已載入');
    
    // 預載音效
    const audio = document.getElementById('clickSound');
    audio.volume = 0.3;
});

// 視窗大小改變時調整
window.addEventListener('resize', () => {
    // 確保在行動裝置上的顯示正常
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 錯誤處理
window.addEventListener('error', (event) => {
    console.error('發生錯誤:', event.error);
    alert('系統發生錯誤，請重新整理頁面');
});

// 防止意外離開
window.addEventListener('beforeunload', (event) => {
    if (gameState.currentScreen === 'game' || gameState.currentScreen === 'answer') {
        event.preventDefault();
        event.returnValue = '遊戲進行中，確定要離開嗎？';
    }
});
