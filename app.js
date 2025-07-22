// 全域變數
let currentGameState = {
    currentItemIndex: 0,
    correctAnswers: 0,
    totalScore: 0,
    userAnswers: [],
    difficulty: 'normal',
    startTime: null,
    gameData: taiwanGameData
};

// 初始化遊戲
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    showScreen('welcomeScreen');
});

// 初始化遊戲
function initializeGame() {
    currentGameState = {
        currentItemIndex: 0,
        correctAnswers: 0,
        totalScore: 0,
        userAnswers: [],
        difficulty: 'normal',
        startTime: null,
        gameData: taiwanGameData
    };
    
    // 設定進度條
    updateProgress(0);
    
    console.log('台灣本土化失智友善遊戲已初始化');
}

// 設定事件監聽器
function setupEventListeners() {
    // 音量控制
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function(e) {
            GameAudio.volume = e.target.value / 100;
        });
    }

    // 難度選擇
    const difficultySelect = document.getElementById('difficultyLevel');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', function(e) {
            currentGameState.difficulty = e.target.value;
        });
    }

    // 鍵盤支援
    document.addEventListener('keydown', handleKeyPress);
}

// 鍵盤操作
function handleKeyPress(event) {
    switch(event.key) {
        case 'Enter':
        case ' ':
            event.preventDefault();
            handleEnterKey();
            break;
        case 'Escape':
            event.preventDefault();
            if (confirm('確定要重新開始嗎？')) {
                restartGame();
            }
            break;
    }
}

function handleEnterKey() {
    const currentScreen = document.querySelector('.screen.active').id;
    
    switch(currentScreen) {
        case 'welcomeScreen':
            startIntroduction();
            break;
        case 'introScreen':
            startGame();
            break;
        case 'answerScreen':
            continueToNext();
            break;
    }
}

// 螢幕切換
function showScreen(screenId) {
    // 隱藏所有螢幕
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 顯示指定螢幕
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // 播放切換音效
    GameAudio.playClick();
}

// 更新進度條
function updateProgress(percentage) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.setProperty('--progress', `${percentage}%`);
    }
    
    if (progressText) {
        if (percentage === 0) {
            progressText.textContent = '準備開始';
        } else if (percentage === 100) {
            progressText.textContent = '遊戲完成！';
        } else {
            progressText.textContent = `進度 ${Math.round(percentage)}%`;
        }
    }
}

// 開始介紹
function startIntroduction() {
    GameAudio.speak('歡迎來到懷舊金錢遊戲');
    updateProgress(10);
    showScreen('introScreen');
}

// 開始遊戲
function startGame() {
    currentGameState.startTime = new Date();
    currentGameState.currentItemIndex = 0;
    currentGameState.correctAnswers = 0;
    currentGameState.totalScore = 0;
    currentGameState.userAnswers = [];
    
    GameAudio.speak('遊戲開始！');
    updateProgress(15);
    showScreen('gameScreen');
    loadCurrentItem();
}

// 載入當前物品
function loadCurrentItem() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    const totalItems = currentGameState.gameData.settings.totalItems;
    
    // 更新進度
    const progress = 15 + (currentGameState.currentItemIndex / totalItems) * 70;
    updateProgress(progress);
    
    // 更新物品資訊
    updateItemDisplay(item);
    
    // 生成價格選項
    generatePriceOptions(item);
    
    // 重設按鈕狀態
    resetButtons();
    
    // 語音介紹物品
    setTimeout(() => {
        GameAudio.speak(`第${currentGameState.currentItemIndex + 1}項物品：${item.name}`);
    }, 500);
}

// 更新物品顯示
function updateItemDisplay(item) {
    document.getElementById('currentItemNumber').textContent = currentGameState.currentItemIndex + 1;
    document.getElementById('totalItems').textContent = currentGameState.gameData.settings.totalItems;
    document.getElementById('currentScore').textContent = currentGameState.totalScore;
    
    document.getElementById('itemImage').src = item.image;
    document.getElementById('itemImage').alt = item.name;
    document.getElementById('itemName').textContent = item.name;
    document.getElementById('itemDescription').textContent = item.description;
    document.getElementById('itemEra').textContent = item.era;
    document.getElementById('memoryPrompt').textContent = item.memoryPrompt;
}

// 生成價格選項
function generatePriceOptions(item) {
    const optionsContainer = document.getElementById('priceOptions');
    optionsContainer.innerHTML = '';
    
    item.priceOptions.forEach(price => {
        const optionElement = document.createElement('div');
        optionElement.className = 'price-option';
        optionElement.textContent = `${price} 元`;
        optionElement.onclick = () => selectPrice(price, item.oldPrice);
        optionsContainer.appendChild(optionElement);
    });
}

// 重設按鈕狀態
function resetButtons() {
    document.getElementById('hintButton').style.display = 'block';
    document.getElementById('revealButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
}

// 選擇價格
function selectPrice(selectedPrice, correctPrice) {
    GameAudio.playClick();
    
    // 移除之前的選中狀態
    document.querySelectorAll('.price-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
        option.onclick = null; // 禁用點擊
    });
    
    // 標記選中的選項
    event.target.classList.add('selected');
    
    // 檢查答案
    const isCorrect = selectedPrice === correctPrice;
    
    // 記錄答案
    currentGameState.userAnswers.push({
        itemId: currentGameState.gameData.items[currentGameState.currentItemIndex].id,
        selectedPrice: selectedPrice,
        correctPrice: correctPrice,
        isCorrect: isCorrect
    });
    
    if (isCorrect) {
        currentGameState.correctAnswers++;
        const difficultyMultiplier = currentGameState.gameData.settings.difficultyLevels[currentGameState.difficulty].scoreMultiplier;
        currentGameState.totalScore += Math.round(10 * difficultyMultiplier);
        
        event.target.classList.add('correct');
        GameAudio.playSuccess();
        GameAudio.speak('答對了！真棒！');
    } else {
        event.target.classList.add('incorrect');
        
        // 顯示正確答案
        document.querySelectorAll('.price-option').forEach(option => {
            if (option.textContent === `${correctPrice} 元`) {
                option.classList.add('correct');
            }
        });
        
        GameAudio.playError();
        GameAudio.speak('不太對喔，讓我們看看正確答案');
    }
    
    // 更新分數顯示
    document.getElementById('currentScore').textContent = currentGameState.totalScore;
    
    // 顯示查看答案按鈕
    setTimeout(() => {
        document.getElementById('hintButton').style.display = 'none';
        document.getElementById('revealButton').style.display = 'block';
    }, 1500);
}

// 顯示提示
function showHint() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    GameAudio.playClick();
    GameAudio.speak(`提示：${item.hint}`);
    
    // 顯示提示對話框
    alert(`💡 提示：${item.hint}`);
}

// 播放記憶提示語音
function playMemoryPrompt() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    GameAudio.speak(item.memoryPrompt);
}

// 播放記憶故事語音
function playMemoryStory() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    GameAudio.speak(item.memoryStory);
}

// 揭曉答案
function revealAnswer() {
    GameAudio.playClick();
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    
    // 設定答案畫面內容
    setupAnswerScreen(item);
    
    showScreen('answerScreen');
    GameAudio.speak(`答案是${item.oldPrice}元`);
}

// 設定答案畫面
function setupAnswerScreen(item) {
    document.getElementById('oldPrice').textContent = `${item.oldPrice} 元`;
    
    if (typeof item.newPrice === 'number') {
        document.getElementById('newPrice').textContent = `${item.newPrice} 元`;
        
        // 計算價格變化
        const multiplier = (item.newPrice / item.oldPrice).toFixed(1);
        const percentage = Math.round(((item.newPrice - item.oldPrice) / item.oldPrice) * 100);
        document.getElementById('priceIncrease').textContent = `漲了 ${multiplier} 倍 (${percentage}%)`;
        
        // 生成等價比較
        generateEquivalentComparison(item);
    } else {
        document.getElementById('newPrice').textContent = item.newPrice;
        document.getElementById('priceIncrease').textContent = '已成為珍貴收藏品';
        document.getElementById('equivalentComparison').textContent = '無價的歷史回憶';
    }
    
    document.getElementById('memoryStory').textContent = item.memoryStory;
}

// 生成等價比較
function generateEquivalentComparison(item) {
    const referenceItems = currentGameState.gameData.equivalentComparisons.referenceItems;
    const randomRef = referenceItems[Math.floor(Math.random() * referenceItems.length)];
    
    if (typeof item.newPrice === 'number') {
        const equivalent = Math.round(item.oldPrice / randomRef.price);
        document.getElementById('equivalentComparison').textContent = 
            `當年 ${item.oldPrice} 元相當於 ${equivalent} 碗${randomRef.name}`;
    }
}

// 繼續到下一個
function continueToNext() {
    GameAudio.playClick();
    currentGameState.currentItemIndex++;
    
    if (currentGameState.currentItemIndex < currentGameState.gameData.settings.totalItems) {
        showScreen('gameScreen');
        loadCurrentItem();
    } else {
        showCompletionScreen();
    }
}

// 顯示完成畫面
function showCompletionScreen() {
    updateProgress(100);
    
    // 設定最終成績
    document.getElementById('finalScore').textContent = currentGameState.totalScore;
    document.getElementById('correctCount').textContent = currentGameState.correctAnswers;
    
    // 決定成就
    const achievement = determineAchievement();
    document.getElementById('achievementTitle').textContent = achievement.name;
    document.getElementById('achievementDescription').textContent = achievement.description;
    
    showScreen('completionScreen');
    GameAudio.speak(`遊戲完成！您總共答對了${currentGameState.correctAnswers}題，獲得${achievement.name}稱號`);
}

// 決定成就
function determineAchievement() {
    const achievements = currentGameState.gameData.achievements;
    const score = currentGameState.correctAnswers;
    
    if (achievements.perfectScore.condition(score)) {
        return achievements.perfectScore;
    } else if (achievements.goodScore.condition(score)) {
        return achievements.goodScore;
    } else {
        return achievements.participation;
    }
}

// 顯示總結
function showSummary() {
    const summaryList = document.getElementById('itemSummaryList');
    summaryList.innerHTML = '';
    
    currentGameState.userAnswers.forEach((answer, index) => {
        const item = currentGameState.gameData.items[index];
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        
        summaryItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-info">
                <h4>${item.name}</h4>
                <p>您的答案：${answer.selectedPrice}元 | 正確答案：${answer.correctPrice}元</p>
            </div>
            <div class="summary-item-result ${answer.isCorrect ? 'result-correct' : 'result-incorrect'}">
                ${answer.isCorrect ? '✓ 正確' : '✗ 錯誤'}
            </div>
        `;
        
        summaryList.appendChild(summaryItem);
    });
    
    showScreen('summaryScreen');
}

// 返回完成畫面
function backToCompletion() {
    showScreen('completionScreen');
}

// 重新開始遊戲
function restartGame() {
    GameAudio.playClick();
    initializeGame();
    showScreen('welcomeScreen');
    GameAudio.speak('歡迎再次遊玩');
}

// 音效控制
function toggleAudio() {
    GameAudio.enabled = !GameAudio.enabled;
    const toggleBtn = document.getElementById('audioToggle');
    
    if (GameAudio.enabled) {
        toggleBtn.textContent = '🔊';
        toggleBtn.classList.remove('muted');
        GameAudio.speak('音效已開啟');
    } else {
        toggleBtn.textContent = '🔇';
        toggleBtn.classList.add('muted');
    }
}

// 錯誤處理
window.addEventListener('error', function(event) {
    console.error('遊戲發生錯誤:', event.error);
    alert('系統發生問題，請重新整理頁面');
});

// 防止意外離開
window.addEventListener('beforeunload', function(event) {
    if (currentGameState.currentItemIndex > 0 && currentGameState.currentItemIndex < currentGameState.gameData.settings.totalItems) {
        event.preventDefault();
        event.returnValue = '遊戲進行中，確定要離開嗎？';
    }
});

// 響應式設計調整
window.addEventListener('resize', function() {
    // 確保移動設備上的正確顯示
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 觸控支援
document.addEventListener('touchstart', function() {}, {passive: true});

// 導出給其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { currentGameState, showScreen, restartGame };
}
