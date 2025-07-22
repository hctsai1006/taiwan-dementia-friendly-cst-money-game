// 台灣本土化失智友善認知刺激治療遊戲 - 主程式
// 全域遊戲狀態
let currentGameState = {
    currentItemIndex: 0,
    correctAnswers: 0,
    totalScore: 0,
    userAnswers: [],
    difficulty: 'normal',
    startTime: null,
    gameData: null,
    isGameActive: false
};

// 文件載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('台灣本土化失智友善遊戲開始載入...');
    
    // 確保遊戲數據已載入
    if (typeof taiwanGameData !== 'undefined') {
        currentGameState.gameData = taiwanGameData;
        initializeGame();
        setupEventListeners();
        showScreen('welcomeScreen');
        console.log('遊戲成功初始化');
    } else {
        console.error('遊戲數據未正確載入');
        showErrorMessage('遊戲載入失敗，請重新整理頁面');
    }
});

// 初始化遊戲
function initializeGame() {
    currentGameState = {
        currentItemIndex: 0,
        correctAnswers: 0,
        totalScore: 0,
        userAnswers: [],
        difficulty: document.getElementById('difficultyLevel')?.value || 'normal',
        startTime: null,
        gameData: taiwanGameData,
        isGameActive: false
    };
    
    updateProgress(0);
    resetAllButtonStates();
}

// 設定所有事件監聽器
function setupEventListeners() {
    try {
        // 主要遊戲按鈕
        addClickListener('startGameBtn', startIntroduction);
        addClickListener('startMainGameBtn', startMainGame);
        addClickListener('hintButton', showHint);
        addClickListener('revealButton', revealAnswer);
        addClickListener('nextButton', nextItem);
        addClickListener('continueBtn', continueToNext);
        addClickListener('restartBtn', restartGame);
        addClickListener('summaryBtn', showSummary);
        addClickListener('backToCompletionBtn', backToCompletion);
        
        // 音效控制按鈕
        addClickListener('audioToggle', toggleAudio);
        addClickListener('playMemoryBtn', playMemoryPrompt);
        addClickListener('playStoryBtn', playMemoryStory);
        
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
                playClickSound();
            });
        }

        // 鍵盤支援
        document.addEventListener('keydown', handleKeyPress);
        
        // 觸控支援
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        console.log('事件監聽器設定完成');
    } catch (error) {
        console.error('設定事件監聽器時發生錯誤:', error);
    }
}

// 輔助函數：安全地添加點擊監聽器
function addClickListener(elementId, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', handler);
    } else {
        console.warn(`找不到元素: ${elementId}`);
    }
}

// 螢幕切換函數
function showScreen(screenId) {
    try {
        // 隱藏所有螢幕
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 顯示目標螢幕
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            playClickSound();
        } else {
            console.error(`找不到螢幕: ${screenId}`);
        }
    } catch (error) {
        console.error('螢幕切換錯誤:', error);
    }
}

// 更新進度條
function updateProgress(percentage) {
    try {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = Math.max(0, Math.min(100, percentage)) + '%';
        }
        
        if (progressText) {
            if (percentage === 0) {
                progressText.textContent = '準備開始';
            } else if (percentage >= 100) {
                progressText.textContent = '遊戲完成！';
            } else {
                progressText.textContent = `進度 ${Math.round(percentage)}%`;
            }
        }
    } catch (error) {
        console.error('更新進度條錯誤:', error);
    }
}

// 音效函數
function playClickSound() {
    if (typeof GameAudio !== 'undefined' && GameAudio.enabled) {
        GameAudio.playClick();
    }
}

function playSuccessSound() {
    if (typeof GameAudio !== 'undefined' && GameAudio.enabled) {
        GameAudio.playSuccess();
    }
}

function playErrorSound() {
    if (typeof GameAudio !== 'undefined' && GameAudio.enabled) {
        GameAudio.playError();
    }
}

function speakText(text) {
    if (typeof GameAudio !== 'undefined' && GameAudio.enabled) {
        GameAudio.speak(text);
    }
}

// 遊戲流程函數
function startIntroduction() {
    try {
        speakText('歡迎來到懷舊金錢遊戲');
        updateProgress(10);
        showScreen('introScreen');
    } catch (error) {
        console.error('開始介紹時發生錯誤:', error);
    }
}

function startMainGame() {
    try {
        currentGameState.startTime = new Date();
        currentGameState.currentItemIndex = 0;
        currentGameState.correctAnswers = 0;
        currentGameState.totalScore = 0;
        currentGameState.userAnswers = [];
        currentGameState.isGameActive = true;
        
        speakText('遊戲開始！');
        updateProgress(15);
        showScreen('gameScreen');
        loadCurrentItem();
    } catch (error) {
        console.error('開始遊戲時發生錯誤:', error);
        showErrorMessage('遊戲開始失敗，請重試');
    }
}

function loadCurrentItem() {
    try {
        if (!currentGameState.gameData || !currentGameState.gameData.items) {
            throw new Error('遊戲數據不完整');
        }
        
        const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
        const totalItems = currentGameState.gameData.settings.totalItems;
        
        if (!item) {
            throw new Error(`找不到物品數據: 索引 ${currentGameState.currentItemIndex}`);
        }
        
        // 計算並更新進度
        const progress = 15 + (currentGameState.currentItemIndex / totalItems) * 70;
        updateProgress(progress);
        
        // 更新顯示內容
        updateItemDisplay(item);
        generatePriceOptions(item);
        resetButtons();
        
        // 延遲語音介紹，確保畫面已更新
        setTimeout(() => {
            speakText(`第${currentGameState.currentItemIndex + 1}項物品：${item.name}`);
        }, 500);
        
    } catch (error) {
        console.error('載入物品時發生錯誤:', error);
        showErrorMessage('載入物品失敗');
    }
}

function updateItemDisplay(item) {
    try {
        // 更新基本資訊
        safeSetTextContent('currentItemNumber', currentGameState.currentItemIndex + 1);
        safeSetTextContent('totalItems', currentGameState.gameData.settings.totalItems);
        safeSetTextContent('currentScore', currentGameState.totalScore);
        
        // 更新物品資訊
        const itemImage = document.getElementById('itemImage');
        if (itemImage) {
            itemImage.src = item.image || '';
            itemImage.alt = item.name || '';
        }
        
        safeSetTextContent('itemName', item.name);
        safeSetTextContent('itemDescription', item.description);
        safeSetTextContent('itemEra', item.era);
        safeSetTextContent('memoryPrompt', item.memoryPrompt);
        
    } catch (error) {
        console.error('更新物品顯示時發生錯誤:', error);
    }
}

function safeSetTextContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = content || '';
    }
}

function generatePriceOptions(item) {
    try {
        const optionsContainer = document.getElementById('priceOptions');
        if (!optionsContainer) {
            throw new Error('找不到價格選項容器');
        }
        
        // 清空現有選項
        optionsContainer.innerHTML = '';
        
        if (!item.priceOptions || !Array.isArray(item.priceOptions)) {
            throw new Error('價格選項數據無效');
        }
        
        // 生成選項
        item.priceOptions.forEach((price, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'price-option';
            optionElement.textContent = `${price} 元`;
            optionElement.setAttribute('tabindex', '0');
            optionElement.setAttribute('role', 'button');
            optionElement.setAttribute('aria-label', `價格選項：${price}元`);
            
            // 添加點擊和鍵盤事件
            optionElement.addEventListener('click', () => selectPrice(price, item.oldPrice, optionElement));
            optionElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectPrice(price, item.oldPrice, optionElement);
                }
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
    } catch (error) {
        console.error('生成價格選項時發生錯誤:', error);
    }
}

function resetButtons() {
    try {
        const hintButton = document.getElementById('hintButton');
        const revealButton = document.getElementById('revealButton');
        const nextButton = document.getElementById('nextButton');
        
        if (hintButton) hintButton.style.display = 'block';
        if (revealButton) revealButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
    } catch (error) {
        console.error('重置按鈕狀態時發生錯誤:', error);
    }
}

function resetAllButtonStates() {
    try {
        resetButtons();
        
        // 重置價格選項
        const priceOptions = document.querySelectorAll('.price-option');
        priceOptions.forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
    } catch (error) {
        console.error('重置所有按鈕狀態時發生錯誤:', error);
    }
}

function selectPrice(selectedPrice, correctPrice, element) {
    try {
        playClickSound();
        
        // 禁用所有選項的點擊
        document.querySelectorAll('.price-option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'none';
        });
        
        // 標記選中的選項
        element.classList.add('selected');
        
        const isCorrect = selectedPrice === correctPrice;
        
        // 記錄答案
        currentGameState.userAnswers.push({
            itemId: currentGameState.gameData.items[currentGameState.currentItemIndex].id,
            selectedPrice: selectedPrice,
            correctPrice: correctPrice,
            isCorrect: isCorrect,
            timestamp: new Date()
        });
        
        if (isCorrect) {
            currentGameState.correctAnswers++;
            const difficultySettings = currentGameState.gameData.settings.difficultyLevels[currentGameState.difficulty];
            const scoreMultiplier = difficultySettings ? difficultySettings.scoreMultiplier : 1;
            currentGameState.totalScore += Math.round(10 * scoreMultiplier);
            
            element.classList.add('correct');
            playSuccessSound();
            speakText('答對了！真棒！');
        } else {
            element.classList.add('incorrect');
            
            // 顯示正確答案
            document.querySelectorAll('.price-option').forEach(option => {
                if (option.textContent === `${correctPrice} 元`) {
                    option.classList.add('correct');
                }
            });
            
            playErrorSound();
            speakText('不太對喔，讓我們看看正確答案');
        }
        
        // 更新分數顯示
        safeSetTextContent('currentScore', currentGameState.totalScore);
        
        // 延遲顯示查看答案按鈕
        setTimeout(() => {
            const hintButton = document.getElementById('hintButton');
            const revealButton = document.getElementById('revealButton');
            
            if (hintButton) hintButton.style.display = 'none';
            if (revealButton) revealButton.style.display = 'block';
        }, 1500);
        
    } catch (error) {
        console.error('選擇價格時發生錯誤:', error);
    }
}

function showHint() {
    try {
        const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
        if (!item || !item.hint) {
            throw new Error('找不到提示內容');
        }
        
        playClickSound();
        speakText(`提示：${item.hint}`);
        
        // 使用自定義提示框而非alert
        showCustomAlert(`💡 提示：${item.hint}`);
    } catch (error) {
        console.error('顯示提示時發生錯誤:', error);
    }
}

function showCustomAlert(message) {
    // 創建自定義提示框
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <button class="alert-close-btn">確定</button>
        </div>
    `;
    
    // 添加樣式
    alertDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'Noto Sans TC', sans-serif;
    `;
    
    const alertContent = alertDiv.querySelector('.alert-content');
    alertContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    const alertButton = alertDiv.querySelector('.alert-close-btn');
    alertButton.style.cssText = `
        background: linear-gradient(135deg, #3498db, #2ecc71);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 1.2rem;
        cursor: pointer;
        margin-top: 20px;
    `;
    
    // 添加關閉事件
    alertButton.addEventListener('click', () => {
        document.body.removeChild(alertDiv);
        playClickSound();
    });
    
    document.body.appendChild(alertDiv);
}

function playMemoryPrompt() {
    try {
        const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
        if (item && item.memoryPrompt) {
            speakText(item.memoryPrompt);
        }
    } catch (error) {
        console.error('播放記憶提示時發生錯誤:', error);
    }
}

function playMemoryStory() {
    try {
        const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
        if (item && item.memoryStory) {
            speakText(item.memoryStory);
        }
    } catch (error) {
        console.error('播放記憶故事時發生錯誤:', error);
    }
}

function revealAnswer() {
    try {
        playClickSound();
        const item = currentGameState.gameData.items[currentGameState.currentItemIndex];
        
        if (!item) {
            throw new Error('找不到當前物品數據');
        }
        
        setupAnswerScreen(item);
        showScreen('answerScreen');
        speakText(`答案是${item.oldPrice}元`);
    } catch (error) {
        console.error('揭曉答案時發生錯誤:', error);
    }
}

function setupAnswerScreen(item) {
    try {
        // 設定價格資訊
        safeSetTextContent('oldPrice', `${item.oldPrice} 元`);
        
        if (typeof item.newPrice === 'number') {
            safeSetTextContent('newPrice', `${item.newPrice} 元`);
            
            // 計算價格變化
            const multiplier = (item.newPrice / item.oldPrice).toFixed(1);
            const percentage = Math.round(((item.newPrice - item.oldPrice) / item.oldPrice) * 100);
            safeSetTextContent('priceIncrease', `漲了 ${multiplier} 倍 (${percentage}%)`);
            
            // 生成等價比較
            generateEquivalentComparison(item);
        } else {
            safeSetTextContent('newPrice', item.newPrice);
            safeSetTextContent('priceIncrease', '已成為珍貴收藏品');
            safeSetTextContent('equivalentComparison', '無價的歷史回憶');
        }
        
        // 設定記憶故事
        safeSetTextContent('memoryStory', item.memoryStory);
        
    } catch (error) {
        console.error('設定答案畫面時發生錯誤:', error);
    }
}

function generateEquivalentComparison(item) {
    try {
        const referenceItems = currentGameState.gameData.equivalentComparisons?.referenceItems;
        if (!referenceItems || !Array.isArray(referenceItems)) {
            return;
        }
        
        const randomRef = referenceItems[Math.floor(Math.random() * referenceItems.length)];
        
        if (typeof item.newPrice === 'number' && randomRef.price > 0) {
            const equivalent = Math.max(1, Math.round(item.oldPrice / randomRef.price));
            safeSetTextContent('equivalentComparison', 
                `當年 ${item.oldPrice} 元相當於 ${equivalent} ${equivalent === 1 ? '碗' : '碗'}${randomRef.name}`);
        }
    } catch (error) {
        console.error('生成等價比較時發生錯誤:', error);
    }
}

function continueToNext() {
    nextItem();
}

function nextItem() {
    try {
        playClickSound();
        currentGameState.currentItemIndex++;
        
        if (currentGameState.currentItemIndex < currentGameState.gameData.settings.totalItems) {
            showScreen('gameScreen');
            loadCurrentItem();
        } else {
            currentGameState.isGameActive = false;
            showCompletionScreen();
        }
    } catch (error) {
        console.error('進入下一項時發生錯誤:', error);
    }
}

function showCompletionScreen() {
    try {
        updateProgress(100);
        
        // 設定最終成績
        safeSetTextContent('finalScore', currentGameState.totalScore);
        safeSetTextContent('correctCount', currentGameState.correctAnswers);
        
        // 決定成就
        const achievement = determineAchievement();
        safeSetTextContent('achievementTitle', achievement.name);
        safeSetTextContent('achievementDescription', achievement.description);
        
        showScreen('completionScreen');
        speakText(`遊戲完成！您總共答對了${currentGameState.correctAnswers}題，獲得${achievement.name}稱號`);
        
        // 觸發慶祝效果
        triggerCelebration();
    } catch (error) {
        console.error('顯示完成畫面時發生錯誤:', error);
    }
}

function determineAchievement() {
    try {
        const achievements = currentGameState.gameData.achievements;
        const score = currentGameState.correctAnswers;
        
        if (achievements.perfectScore.condition(score)) {
            return achievements.perfectScore;
        } else if (achievements.goodScore.condition(score)) {
            return achievements.goodScore;
        } else {
            return achievements.participation;
        }
    } catch (error) {
        console.error('決定成就時發生錯誤:', error);
        return { name: '參與者', description: '感謝您的參與' };
    }
}

function triggerCelebration() {
    // 簡單的慶祝效果
    setTimeout(() => {
        playSuccessSound();
    }, 500);
}

function showSummary() {
    try {
        const summaryList = document.getElementById('itemSummaryList');
        if (!summaryList) {
            throw new Error('找不到總結列表容器');
        }
        
        summaryList.innerHTML = '';
        
        currentGameState.userAnswers.forEach((answer, index) => {
            const item = currentGameState.gameData.items[index];
            if (!item) return;
            
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            
            summaryItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="summary-item-image" 
                     onerror="this.style.display='none'">
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
    } catch (error) {
        console.error('顯示總結時發生錯誤:', error);
    }
}

function backToCompletion() {
    showScreen('completionScreen');
}

function restartGame() {
    try {
        playClickSound();
        initializeGame();
        showScreen('welcomeScreen');
        speakText('歡迎再次遊玩');
    } catch (error) {
        console.error('重新開始遊戲時發生錯誤:', error);
    }
}

function toggleAudio() {
    try {
        if (typeof GameAudio !== 'undefined') {
            GameAudio.enabled = !GameAudio.enabled;
            const toggleBtn = document.getElementById('audioToggle');
            
            if (toggleBtn) {
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
    } catch (error) {
        console.error('切換音效時發生錯誤:', error);
    }
}

// 鍵盤操作處理
function handleKeyPress(event) {
    try {
        switch(event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                handleEnterKey();
                break;
            case 'Escape':
                event.preventDefault();
                if (currentGameState.isGameActive) {
                    if (confirm('遊戲進行中，確定要重新開始嗎？')) {
                        restartGame();
                    }
                }
                break;
            case 'h':
            case 'H':
                if (currentGameState.isGameActive) {
                    showHint();
                }
                break;
        }
    } catch (error) {
        console.error('處理鍵盤按鍵時發生錯誤:', error);
    }
}

function handleEnterKey() {
    try {
        const currentScreen = document.querySelector('.screen.active');
        if (!currentScreen) return;
        
        switch(currentScreen.id) {
            case 'welcomeScreen':
                startIntroduction();
                break;
            case 'introScreen':
                startMainGame();
                break;
            case 'answerScreen':
                continueToNext();
                break;
            case 'completionScreen':
                restartGame();
                break;
        }
    } catch (error) {
        console.error('處理Enter鍵時發生錯誤:', error);
    }
}

// 錯誤處理函數
function showErrorMessage(message) {
    console.error('遊戲錯誤:', message);
    
    // 顯示用戶友善的錯誤訊息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <h3>🚫 發生問題</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">確定</button>
        </div>
    `;
    
    errorDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: 'Noto Sans TC', sans-serif;
    `;
    
    const errorContent = errorDiv.querySelector('.error-content');
    errorContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    `;
    
    const errorButton = errorDiv.querySelector('button');
    errorButton.style.cssText = `
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.2rem;
        cursor: pointer;
        margin-top: 20px;
    `;
    
    document.body.appendChild(errorDiv);
}

// 全域錯誤處理
window.addEventListener('error', function(event) {
    console.error('全域錯誤:', event.error);
    showErrorMessage('系統發生問題，請重新整理頁面');
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('未處理的Promise拒絕:', event.reason);
    showErrorMessage('載入失敗，請檢查網路連線');
});

// 離開頁面前的確認
window.addEventListener('beforeunload', function(event) {
    if (currentGameState.isGameActive && 
        currentGameState.currentItemIndex > 0 && 
        currentGameState.currentItemIndex < currentGameState.gameData.settings.totalItems) {
        event.preventDefault();
        event.returnValue = '遊戲進行中，確定要離開嗎？';
    }
});

// 視窗大小變化處理
window.addEventListener('resize', function() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// 頁面可見性變化處理
document.addEventListener('visibilitychange', function() {
    if (document.hidden && currentGameState.isGameActive) {
        // 頁面不可見時暫停音效
        if (typeof GameAudio !== 'undefined') {
            GameAudio.enabled = false;
        }
    } else if (!document.hidden && currentGameState.isGameActive) {
        // 頁面重新可見時恢復音效（如果之前是開啟的）
        if (typeof GameAudio !== 'undefined') {
            const audioToggle = document.getElementById('audioToggle');
            if (audioToggle && !audioToggle.classList.contains('muted')) {
                GameAudio.enabled = true;
            }
        }
    }
});

// 導出主要函數供測試使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        currentGameState,
        showScreen,
        restartGame,
        initializeGame
    };
}

console.log('app.js 載入完成');
