// 全域變數
let currentGameState = {
    currentItemIndex: 0,
    correctAnswers: 0,
    totalScore: 0,
    userAnswers: [],
    difficulty: 'normal',
    startTime: null,
    gameData: null
};

// 初始化遊戲
document.addEventListener('DOMContentLoaded', function() {
    // 確保 taiwanGameData 已載入
    if (typeof taiwanGameData !== 'undefined') {
        currentGameState.gameData = taiwanGameData;
        initializeGame();
        setupEventListeners();
        showScreen('welcomeScreen');
    } else {
        console.error('遊戲數據未正確載入');
        alert('遊戲載入失敗，請重新整理頁面');
    }
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
    
    updateProgress(0);
    console.log('台灣本土化失智友善遊戲已初始化');
}

// 設定事件監聽器
function setupEventListeners() {
    // 主要按鈕事件
    document.getElementById('startGameBtn').addEventListener('click', startIntroduction);
    document.getElementById('startMainGameBtn').addEventListener('click', startMainGame);
    document.getElementById('hintButton').addEventListener('click', showHint);
    document.getElementById('revealButton').addEventListener('click', revealAnswer);
    document.getElementById('nextButton').addEventListener('click', nextItem);
    document.getElementById('continueBtn').addEventListener('click', continueToNext);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    document.getElementById('summaryBtn').addEventListener('click', showSummary);
    document.getElementById('backToCompletionBtn').addEventListener('click', backToCompletion);
    
    // 音效控制
    document.getElementById('audioToggle').addEventListener('click', toggleAudio);
    document.getElementById('playMemoryBtn').addEventListener('click', playMemoryPrompt);
    document.getElementById('playStoryBtn').addEventListener('click', playMemoryStory);
    
    // 音量控制
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function(e) {
            if (typeof GameAudio !== 'undefined') {
                GameAudio.volume = e.target.value / 100;
            }
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

// 螢幕切換
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    playClickSound();
}

// 更新進度條
function updateProgress(percentage) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
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

// 音效函數
function playClickSound() {
    if (typeof GameAudio !== 'undefined') {
        GameAudio.playClick();
    }
}

function playSuccessSound() {
    if (typeof GameAudio !== 'undefined') {
        GameAudio.playSuccess();
    }
}

function playErrorSound() {
    if (typeof GameAudio !== 'undefined') {
        GameAudio.playError();
    }
}

function speakText(text) {
    if (typeof GameAudio !== 'undefined') {
        GameAudio.speak(text);
    }
}

// 遊戲流程函數
function startIntroduction() {
    speakText('歡迎來到懷舊金錢遊戲');
    updateProgress(10);
    showScreen('introScreen');
}

function startMainGame() {
    currentGameState.startTime = new Date();
    currentGameState.currentItemIndex = 0;
    currentGameState.correctAnswers = 0;
    currentGameState.totalScore = 0;
    currentGameState.userAnswers = [];
    
    speakText('遊戲開始！');
    updateProgress(15);
    showScreen('gameScreen');
    loadCurrentItem();
}

function loadCurrentItem() {
    if (!currentGameState.gameData || !currentGameState.gameData.items) {
        console.error('遊戲數據不完整');
        return;
    }
    
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    const totalItems = currentGameState.gameData.settings.totalItems;
    
    const progress = 15 + (currentGameState.currentItemIndex / totalItems) * 70;
    updateProgress(progress);
    
    updateItemDisplay(item);
    generatePriceOptions(item);
    resetButtons();
    
    setTimeout(() => {
        speakText(`第${currentGameState.currentItemIndex + 1}項物品：${item.name}`);
    }, 500);
}

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

function generatePriceOptions(item) {
    const optionsContainer = document.getElementById('priceOptions');
    optionsContainer.innerHTML = '';
    
    item.priceOptions.forEach(price => {
        const optionElement = document.createElement('div');
        optionElement.className = 'price-option';
        optionElement.textContent = `${price} 元`;
        optionElement.addEventListener('click', () => selectPrice(price, item.oldPrice, optionElement));
        optionsContainer.appendChild(optionElement);
    });
}

function resetButtons() {
    document.getElementById('hintButton').style.display = 'block';
    document.getElementById('revealButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
}

function selectPrice(selectedPrice, correctPrice, element) {
    playClickSound();
    
    document.querySelectorAll('.price-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
        option.style.pointerEvents = 'none';
    });
    
    element.classList.add('selected');
    
    const isCorrect = selectedPrice === correctPrice;
    
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
        
        element.classList.add('correct');
        playSuccessSound();
        speakText('答對了！真棒！');
    } else {
        element.classList.add('incorrect');
        
        document.querySelectorAll('.price-option').forEach(option => {
            if (option.textContent === `${correctPrice} 元`) {
                option.classList.add('correct');
            }
        });
        
        playErrorSound();
        speakText('不太對喔，讓我們看看正確答案');
    }
    
    document.getElementById('currentScore').textContent = currentGameState.totalScore;
    
    setTimeout(() => {
        document.getElementById('hintButton').style.display = 'none';
        document.getElementById('revealButton').style.display = 'block';
    }, 1500);
}

function showHint() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    playClickSound();
    speakText(`提示：${item.hint}`);
    alert(`💡 提示：${item.hint}`);
}

function playMemoryPrompt() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    speakText(item.memoryPrompt);
}

function playMemoryStory() {
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    speakText(item.memoryStory);
}

function revealAnswer() {
    playClickSound();
    const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
    
    setupAnswerScreen(item);
    showScreen('answerScreen');
    speakText(`答案是${item.oldPrice}元`);
}

function setupAnswerScreen(item) {
    document.getElementById('oldPrice').textContent = `${item.oldPrice} 元`;
    
    if (typeof item.newPrice === 'number') {
        document.getElementById('newPrice').textContent = `${item.newPrice} 元`;
        
        const multiplier = (item.newPrice / item.oldPrice).toFixed(1);
        const percentage = Math.round(((item.newPrice - item.oldPrice) / item.oldPrice) * 100);
        document.getElementById('priceIncrease').textContent = `漲了 ${multiplier} 倍 (${percentage}%)`;
        
        generateEquivalentComparison(item);
    } else {
        document.getElementById('newPrice').textContent = item.newPrice;
        document.getElementById('priceIncrease').textContent = '已成為珍貴收藏品';
        document.getElementById('equivalentComparison').textContent = '無價的歷史回憶';
    }
    
    document.getElementById('memoryStory').textContent = item.memoryStory;
}

function generateEquivalentComparison(item) {
    const referenceItems = currentGameState.gameData.equivalentComparisons.referenceItems;
    const randomRef = referenceItems[Math.floor(Math.random() * referenceItems.length)];
    
    if (typeof item.newPrice === 'number') {
        const equivalent = Math.round(item.oldPrice / randomRef.price);
        document.getElementById('equivalentComparison').textContent = 
            `當年 ${item.oldPrice} 元相當於 ${equivalent} 碗${randomRef.name}`;
    }
}

function continueToNext() {
    nextItem();
}

function nextItem() {
    playClickSound();
    currentGameState.currentItemIndex++;
    
    if (currentGameState.currentItemIndex < currentGameState.gameData.settings.totalItems) {
        showScreen('gameScreen');
        loadCurrentItem();
    } else {
        showCompletionScreen();
    }
}

function showCompletionScreen() {
    updateProgress(100);
    
    document.getElementById('finalScore').textContent = currentGameState.totalScore;
    document.getElementById('correctCount').textContent = currentGameState.correctAnswers;
    
    const achievement = determineAchievement();
    document.getElementById('achievementTitle').textContent = achievement.name;
    document.getElementById('achievementDescription').textContent = achievement.description;
    
    showScreen('completionScreen');
    speakText(`遊戲完成！您總共答對了${currentGameState.correctAnswers}題，獲得${achievement.name}稱號`);
}

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

function backToCompletion() {
    showScreen('completionScreen');
}

function restartGame() {
    playClickSound();
    initializeGame();
    showScreen('welcomeScreen');
    speakText('歡迎再次遊玩');
}

function toggleAudio() {
    if (typeof GameAudio !== 'undefined') {
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
}

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
            startMainGame();
            break;
        case 'answerScreen':
            continueToNext();
            break;
    }
}

// 錯誤處理
window.addEventListener('error', function(event) {
    console.error('遊戲發生錯誤:', event.error);
    alert('系統發生問題，請重新整理頁面');
});

window.addEventListener('beforeunload', function(event) {
    if (currentGameState.currentItemIndex > 0 && 
        currentGameState.currentItemIndex < currentGameState.gameData.settings.totalItems) {
        event.preventDefault();
        event.returnValue = '遊戲進行中，確定要離開嗎？';
    }
});

window.addEventListener('resize', function() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener('touchstart', function() {}, {passive: true});
