// アプリケーションの状態
let gameState = {
    selectedDisaster: null,
    selectedCharacter: null,
    selectedItems: []
};

// 災害データ
const disasters = {
    1: { name: "地震", image: "719_data/disaster/Image_fx (7).jpg" },
    2: { name: "大雨・洪水", image: "719_data/disaster/Image_fx (8).jpg" },
    3: { name: "土砂災害", image: "719_data/disaster/Image_fx (11).jpg" },
    4: { name: "台風", image: "719_data/disaster/Image_fx (10).jpg" },
    5: { name: "津波", image: "719_data/disaster/Image_fx (12).jpg" },
    6: { name: "火災", image: "719_data/disaster/Image_fx (13).jpg" }
};

// キャラクターデータ
const characters = {
    1: {
        name: "ゆうたくん",
        image: "719_data/chara/Image_fx (17).jpg",
        description: "小学3年生。パパ、ママ、妹で暮らしています。毎日学校まで歩いて通っています。"
    },
    2: {
        name: "まさとくん",
        image: "719_data/chara/Image_fx (18).jpg",
        description: "高校生。母と妹と暮らしています。得意なことは英語とゲーム。普段歩くときははヘッドフォンをしています。"
    },
    3: {
        name: "まきさん",
        image: "719_data/chara/Image_fx (19).jpg",
        description: "おばあちゃん。（72歳）一人暮らしをしています。得意なことは料理。足が少し悪いです。"
    },
    4: {
        name: "たけしさん",
        image: "719_data/chara/Image_fx (20).jpg",
        description: "35歳。妻、小学生の娘、3歳の息子がいます。得意なことは車の運転です。会社には車で行きます。体力は普通です。"
    }
};

// アイテムデータ
const items = {
    1: { name: "懐中電灯", image: "719_data/item/Image_fx (14).jpg" },
    2: { name: "笛", image: "719_data/item/Image_fx (15).jpg" },
    3: { name: "食料", image: "719_data/item/Image_fx (16).jpg" },
    4: { name: "毛布", image: "719_data/item/Image_fx (21).jpg" },
    5: { name: "救急箱", image: "719_data/item/Image_fx (22).jpg" },
    6: { name: "ラジオ", image: "719_data/item/Image_fx (23).jpg" },
    7: { name: "充電器", image: "719_data/item/Image_fx (24).jpg" },
    8: { name: "マスク", image: "719_data/item/Image_fx (26).jpg" },
    9: { name: "カッパ", image: "719_data/item/Image_fx (27).jpg" }
};

// ページの表示切り替え
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// 災害選択の処理
function initDisasterPage() {
    const disasterCards = document.querySelectorAll('#disaster-page .card');
    const nextBtn = document.getElementById('disaster-next');
    const selectedDisasterDiv = document.getElementById('selected-disaster');
    const disasterImage = document.getElementById('disaster-image');
    const disasterName = document.getElementById('disaster-name');

    disasterCards.forEach(card => {
        card.addEventListener('click', function() {
            // 他のカードの選択を解除
            disasterCards.forEach(c => c.classList.remove('selected'));
            // 選択されたカードをハイライト
            this.classList.add('selected');
            
            // ランダムに災害を選択
            const randomDisasterId = Math.floor(Math.random() * 6) + 1;
            const disaster = disasters[randomDisasterId];
            
            // 選択された災害を保存
            gameState.selectedDisaster = randomDisasterId;
            
            // 災害情報を表示
            disasterImage.src = disaster.image;
            disasterImage.alt = disaster.name;
            disasterName.textContent = disaster.name;
            selectedDisasterDiv.classList.remove('hidden');
            
            // 次へボタンを有効化
            nextBtn.disabled = false;
        });
    });

    nextBtn.addEventListener('click', function() {
        showPage('character-page');
        initCharacterPage();
    });
}

// キャラクター選択の処理
function initCharacterPage() {
    const characterCards = document.querySelectorAll('#character-page .card');
    const nextBtn = document.getElementById('character-next');
    const selectedCharacterDiv = document.getElementById('selected-character');
    const characterImage = document.getElementById('character-image');
    const characterName = document.getElementById('character-name');
    const characterDescription = document.getElementById('character-description');

    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            // 他のカードの選択を解除
            characterCards.forEach(c => c.classList.remove('selected'));
            // 選択されたカードをハイライト
            this.classList.add('selected');
            
            // ランダムにキャラクターを選択
            const randomCharId = Math.floor(Math.random() * 4) + 1;
            const character = characters[randomCharId];
            
            // 選択されたキャラクターを保存
            gameState.selectedCharacter = randomCharId;
            
            // キャラクター情報を表示
            characterImage.src = character.image;
            characterImage.alt = character.name;
            characterName.textContent = character.name;
            characterDescription.textContent = character.description;
            selectedCharacterDiv.classList.remove('hidden');
            
            // 次へボタンを有効化
            nextBtn.disabled = false;
        });
    });

    nextBtn.addEventListener('click', function() {
        showPage('item-page');
        initItemPage();
    });
}

// アイテム選択の処理
function initItemPage() {
    const itemCardsContainer = document.getElementById('item-cards');
    const nextBtn = document.getElementById('item-next');
    const selectedCountSpan = document.getElementById('selected-count');
    
    // 全てのアイテムを表示
    const itemKeys = Object.keys(items);
    
    // アイテムカードを生成
    itemCardsContainer.innerHTML = '';
    itemKeys.forEach(itemId => {
        const item = items[itemId];
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.item = itemId;
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
        `;
        
        card.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.item);
            const index = gameState.selectedItems.indexOf(itemId);
            
            if (index > -1) {
                // 既に選択されている場合は選択解除
                gameState.selectedItems.splice(index, 1);
                this.classList.remove('selected');
            } else {
                // 3個まで選択可能
                if (gameState.selectedItems.length < 3) {
                    gameState.selectedItems.push(itemId);
                    this.classList.add('selected');
                }
            }
            
            // 選択数を更新
            selectedCountSpan.textContent = gameState.selectedItems.length;
            
            // 次へボタンの状態を更新（3個選択時のみ有効）
            nextBtn.disabled = gameState.selectedItems.length !== 3;
        });
        
        itemCardsContainer.appendChild(card);
    });

    nextBtn.addEventListener('click', function() {
        showPage('final-page');
        initFinalPage();
    });
}

// 最終ページの処理
function initFinalPage() {
    const finalDisaster = document.getElementById('final-disaster');
    const finalCharacter = document.getElementById('final-character');
    const finalItems = document.getElementById('final-items');
    const restartBtn = document.getElementById('restart-btn');

    // 災害情報を表示
    const disaster = disasters[gameState.selectedDisaster];
    finalDisaster.innerHTML = `
        <img src="${disaster.image}" alt="${disaster.name}">
        <p>${disaster.name}</p>
    `;

    // キャラクター情報を表示
    const character = characters[gameState.selectedCharacter];
    finalCharacter.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <p>${character.name}</p>
        <p style="font-size: 0.9em; color: #666;">${character.description}</p>
    `;

    // アイテム情報を表示
    const itemGrid = document.createElement('div');
    itemGrid.className = 'item-grid';
    gameState.selectedItems.forEach(itemId => {
        const item = items[itemId];
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p style="font-size: 0.8em;">${item.name}</p>
        `;
        itemGrid.appendChild(itemDiv);
    });
    finalItems.innerHTML = '';
    finalItems.appendChild(itemGrid);

    // 終了ボタンの処理
    restartBtn.addEventListener('click', function() {
        // 状態をリセット
        gameState = {
            selectedDisaster: null,
            selectedCharacter: null,
            selectedItems: []
        };
        
        // 最初のページに戻る
        showPage('disaster-page');
        
        // 選択状態をクリア
        document.querySelectorAll('.card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        
        // ボタンを無効化
        document.getElementById('disaster-next').disabled = true;
        document.getElementById('character-next').disabled = true;
        document.getElementById('item-next').disabled = true;
        
        // 選択数カウンターをリセット
        document.getElementById('selected-count').textContent = '0';
        
        // キャラクター表示を隠す
        document.getElementById('selected-character').classList.add('hidden');
        
        // 災害表示を隠す
        document.getElementById('selected-disaster').classList.add('hidden');
    });
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', function() {
    initDisasterPage();
});