// 深度台灣本土化遊戲數據
const taiwanGameData = {
    // 遊戲設定
    settings: {
        totalItems: 12,
        difficultyLevels: {
            easy: {
                name: '輕鬆模式',
                timeLimit: null,
                hintsAllowed: 3,
                scoreMultiplier: 1.0
            },
            normal: {
                name: '標準模式',
                timeLimit: 60,
                hintsAllowed: 2,
                scoreMultiplier: 1.5
            },
            hard: {
                name: '挑戦模式',
                timeLimit: 30,
                hintsAllowed: 1,
                scoreMultiplier: 2.0
            }
        }
    },

    // 台灣本土化物品數據
    items: [
        {
            id: 1,
            name: "美援麵粉袋衣物",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23f4e4bc'/%3E%3Ctext x='125' y='80' text-anchor='middle' fill='%238B4513' font-size='16' font-weight='bold'%3E中美合作%3C/text%3E%3Ctext x='125' y='110' text-anchor='middle' fill='%238B4513' font-size='12'%3EUSAID%3C/text%3E%3Crect x='50' y='130' width='150' height='80' fill='%23deb887' stroke='%23a0522d' stroke-width='2'/%3E%3Ctext x='125' y='175' text-anchor='middle' fill='%23654321' font-size='14'%3E麵粉袋衣物%3C/text%3E%3C/svg%3E",
            description: "用美援麵粉袋改製的衣褲，印有中美合作字樣",
            era: "美援時代 (1950-1960s)",
            oldPrice: 3,
            newPrice: "無價（博物館級收藏）",
            priceOptions: [1, 3, 5, 8],
            memoryPrompt: "還記得阿嬤把麵粉袋洗乾淨，巧手縫製成衣服的年代嗎？袋子上的「中美合作」四個大字，是那個時代的印記。",
            memoryStory: "美援時代的麵粉袋是珍貴的資源，勤儉的台灣婦女會把空袋子洗得乾乾淨淨，裁剪縫製成內衣褲或童裝。雖然質料粗糙，但在那個物資缺乏的年代，這就是最實用的衣料。袋子上的「中美合作」字樣見證了台美友誼，也見證了台灣人民的勤奮智慧。",
            hint: "那時候家家戶戶都有美援物資，麵粉袋是免費的副產品",
            culturalContext: "美援時代台灣人民的生活智慧",
            difficulty: "easy"
        },
        {
            id: 2,
            name: "脫脂奶粉",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23f0f8ff'/%3E%3Crect x='75' y='50' width='100' height='150' fill='%23ffffff' stroke='%234169e1' stroke-width='3' rx='5'/%3E%3Ctext x='125' y='80' text-anchor='middle' fill='%234169e1' font-size='12' font-weight='bold'%3EMILK POWDER%3C/text%3E%3Ctext x='125' y='100' text-anchor='middle' fill='%234169e1' font-size='10'%3EUSAID%3C/text%3E%3Ccircle cx='125' cy='140' r='25' fill='%23fffacd' stroke='%23daa520' stroke-width='2'/%3E%3Ctext x='125' y='145' text-anchor='middle' fill='%23b8860b' font-size='10'%3E脫脂奶粉%3C/text%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%23696969' font-size='10'%3E一磅裝%3C/text%3E%3C/svg%3E",
            description: "美援時代的脫脂奶粉，童年營養補給的回憶",
            era: "美援時代 (1950-1960s)",
            oldPrice: 15,
            newPrice: 200,
            priceOptions: [10, 15, 20, 25],
            memoryPrompt: "小時候喝的奶粉有著特殊的味道，不像現在的奶粉那麼香甜，但那是我們那個年代最珍貴的營養補給。",
            memoryStory: "美援脫脂奶粉是許多台灣孩子童年的共同回憶。雖然味道不如全脂奶粉香濃，但在那個營養不良普遍的年代，這是政府提供給學童最重要的營養補充。許多人還記得奶粉特有的粉質感和微甜的味道，以及媽媽小心翼翼用溫水沖泡的情景。",
            hint: "比一碗陽春麵稍微貴一點，但是珍貴的營養品",
            culturalContext: "台灣兒童營養改善計畫的見證",
            difficulty: "normal"
        },
        {
            id: 3,
            name: "竹蜻蜓",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23e6ffe6'/%3E%3Cline x1='125' y1='70' x2='125' y2='180' stroke='%238b4513' stroke-width='8' stroke-linecap='round'/%3E%3Cg transform='rotate(15 125 70)'%3E%3Cellipse cx='125' cy='70' rx='60' ry='8' fill='%23228b22' opacity='0.8'/%3E%3C/g%3E%3Cg transform='rotate(45 125 70)'%3E%3Cellipse cx='125' cy='70' rx='60' ry='8' fill='%2332cd32' opacity='0.6'/%3E%3C/g%3E%3Cg transform='rotate(75 125 70)'%3E%3Cellipse cx='125' cy='70' rx='60' ry='8' fill='%2334ce57' opacity='0.4'/%3E%3C/g%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%23556b2f' font-size='14' font-weight='bold'%3E竹蜻蜓%3C/text%3E%3C/svg%3E",
            description: "手工製作的竹蜻蜓，童年最簡單的快樂",
            era: "手工玩具時代 (1950-1970s)",
            oldPrice: 0.5,
            newPrice: 50,
            priceOptions: [0.2, 0.5, 1, 2],
            memoryPrompt: "雙手搓一搓，竹蜻蜓就飛上天了！那是最簡單也最神奇的玩具，不需要電池，不會壞，只要有竹子就能做。",
            memoryStory: "竹蜻蜓是台灣孩子最早接觸的飛行玩具。用竹片削成螺旋槳的形狀，中間插根竹籤當軸心，雙手一搓就能飛得老高。鄰居的阿伯常常在榕樹下削竹蜻蜓，小朋友圍在旁邊看得入神。那個年代的孩子，誰沒有過追著竹蜻蜓跑的回憶呢？",
            hint: "比一顆彈珠還便宜，是最便宜的玩具",
            culturalContext: "台灣傳統手工玩具文化",
            difficulty: "easy"
        },
        {
            id: 4,
            name: "陀螺",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23fdf5e6'/%3E%3Ccircle cx='125' cy='80' r='15' fill='%238b4513'/%3E%3Cpath d='M 125 95 L 110 160 L 140 160 Z' fill='%23deb887' stroke='%238b4513' stroke-width='2'/%3E%3Ccircle cx='125' cy='165' r='5' fill='%23654321'/%3E%3Cg stroke='%23cd853f' stroke-width='2' opacity='0.6'%3E%3Ccircle cx='125' cy='125' r='30'/%3E%3Ccircle cx='125' cy='125' r='40'/%3E%3Ccircle cx='125' cy='125' r='50'/%3E%3C/g%3E%3Ctext x='125' y='200' text-anchor='middle' fill='%23654321' font-size='14' font-weight='bold'%3E陀螺%3C/text%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%23a0522d' font-size='10'%3E木製手工%3C/text%3E%3C/svg%3E",
            description: "木製陀螺，街頭比賽的回憶",
            era: "童年玩具時代 (1950-1970s)",
            oldPrice: 2,
            newPrice: 80,
            priceOptions: [1, 2, 3, 5],
            memoryPrompt: "記得在廟埕和同伴比賽打陀螺嗎？看誰的陀螺轉得最久，轉得最穩，那是童年最激烈的競賽。",
            memoryStory: "木製陀螺是台灣男孩的最愛，每個人都有自己的秘密武器。有的陀螺重心低轉得穩，有的陀螺尖銳能擊倒對手。孩子們會在地上畫個圓圈，比賽誰能把對方的陀螺撞出圈外。那個年代的廟埕和學校操場，總是響著陀螺撞擊的聲音和孩子們的歡呼聲。",
            hint: "比竹蜻蜓貴一點，但比彈珠汽水便宜",
            culturalContext: "台灣傳統兒童競技遊戲",
            difficulty: "easy"
        },
        {
            id: 5,
            name: "玻璃彈珠",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23f0ffff'/%3E%3Cg%3E%3Ccircle cx='100' cy='100' r='25' fill='url(%23marble1)' stroke='%23ffffff' stroke-width='2' opacity='0.9'/%3E%3Ccircle cx='150' cy='120' r='22' fill='url(%23marble2)' stroke='%23ffffff' stroke-width='2' opacity='0.8'/%3E%3Ccircle cx='125' cy='80' r='20' fill='url(%23marble3)' stroke='%23ffffff' stroke-width='2' opacity='0.7'/%3E%3Ccircle cx='130' cy='140' r='28' fill='url(%23marble4)' stroke='%23ffffff' stroke-width='2'/%3E%3C/g%3E%3Ctext x='125' y='200' text-anchor='middle' fill='%23483d8b' font-size='16' font-weight='bold'%3E玻璃彈珠%3C/text%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%236a5acd' font-size='10'%3E尪仔標必備%3C/text%3E%3Cdefs%3E%3CradialGradient id='marble1' cx='30%25' cy='30%25'%3E%3Cstop offset='0%25' stop-color='%23ff6b6b'/%3E%3Cstop offset='100%25' stop-color='%23ee5a24'/%3E%3C/radialGradient%3E%3CradialGradient id='marble2' cx='30%25' cy='30%25'%3E%3Cstop offset='0%25' stop-color='%234ecdc4'/%3E%3Cstop offset='100%25' stop-color='%2326de81'/%3E%3C/radialGradient%3E%3CradialGradient id='marble3' cx='30%25' cy='30%25'%3E%3Cstop offset='0%25' stop-color='%23feca57'/%3E%3Cstop offset='100%25' stop-color='%23ff9ff3'/%3E%3C/radialGradient%3E%3CradialGradient id='marble4' cx='30%25' cy='30%25'%3E%3Cstop offset='0%25' stop-color='%2354a0ff'/%3E%3Cstop offset='100%25' stop-color='%235f27cd'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E",
            description: "五顏六色的玻璃彈珠，尪仔標遊戲必備",
            era: "童年遊戲時代 (1950-1970s)",
            oldPrice: 0.2,
            newPrice: 10,
            priceOptions: [0.1, 0.2, 0.5, 1],
            memoryPrompt: "一顆兩毛錢的彈珠，可以換來整個下午的快樂。打尪仔標、彈珠台，還有那些閃閃發亮的玻璃球。",
            memoryStory: "玻璃彈珠是那個年代最便宜的玩具，但也是最珍貴的收藏。孩子們會比較誰的彈珠比較大、比較漂亮，誰的彈珠打得比較準。透明的、彩色的、有花紋的，每一顆都有自己的故事。輸了彈珠會難過一整天，贏了彈珠會開心到睡不著覺。",
            hint: "最便宜的玩具，比買糖果還便宜",
            culturalContext: "台灣兒童遊戲文化的象徵",
            difficulty: "easy"
        },
        {
            id: 6,
            name: "彈珠汽水",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23e6f3ff'/%3E%3Crect x='90' y='50' width='70' height='150' fill='%23e6f7ff' stroke='%232980b9' stroke-width='3' rx='10'/%3E%3Ccircle cx='125' cy='70' r='8' fill='%23ffffff' stroke='%23bdc3c7' stroke-width='2'/%3E%3Crect x='95' y='80' width='60' height='100' fill='%2385c1e9' opacity='0.7'/%3E%3Ctext x='125' y='100' text-anchor='middle' fill='%23ffffff' font-size='8' font-weight='bold' transform='rotate(-90 125 100)'%3E彈珠汽水%3C/text%3E%3Crect x='85' y='200' width='80' height='20' fill='%2334495e' rx='10'/%3E%3Ctext x='125' y='235' text-anchor='middle' fill='%232c3e50' font-size='12' font-weight='bold'%3E彈珠汽水%3C/text%3E%3C/svg%3E",
            description: "250ml 玻璃瓶裝彈珠汽水，柑仔店的清涼回憶",
            era: "傳統小吃時代 (1960-1980s)",
            oldPrice: 3,
            newPrice: 35,
            priceOptions: [2, 3, 5, 8],
            memoryPrompt: "那個彈珠卡在瓶口的特殊設計，喝的時候還要小心不要讓彈珠掉下來。清涼的汽水配上夏日的蟬聲，就是童年。",
            memoryStory: "彈珠汽水是台灣夏天的經典回憶。特殊的玻璃瓶設計，用彈珠當作瓶蓋，開瓶時要用力一壓，彈珠就會掉到瓶子的凹槽裡。孩子們喝完汽水後，還會想辦法把彈珠取出來當玩具。柑仔店的冰桶裡，總是放著幾瓶冰涼的彈珠汽水，那是夏日午後最奢侈的享受。",
            hint: "和陀螺差不多價錢，夏天最受歡迎的飲料",
            culturalContext: "台灣傳統飲料文化",
            difficulty: "normal"
        },
        {
            id: 7,
            name: "維他奶",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23fffbf0'/%3E%3Crect x='85' y='40' width='80' height='160' fill='%23f8f9fa' stroke='%23e67e22' stroke-width='3' rx='8'/%3E%3Crect x='90' y='45' width='70' height='40' fill='%23e67e22'/%3E%3Ctext x='125' y='60' text-anchor='middle' fill='%23ffffff' font-size='10' font-weight='bold'%3E維他奶%3C/text%3E%3Ctext x='125' y='75' text-anchor='middle' fill='%23ffffff' font-size='8'%3EVITASOY%3C/text%3E%3Crect x='95' y='95' width='60' height='80' fill='%23fff8dc' opacity='0.8'/%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%23d35400' font-size='12' font-weight='bold'%3E維他奶%3C/text%3E%3C/svg%3E",
            description: "小瓶裝維他奶，學校營養午餐的經典飲品",
            era: "學童營養時代 (1960-1980s)",
            oldPrice: 2,
            newPrice: 18,
            priceOptions: [1, 2, 3, 4],
            memoryPrompt: "記得學校營養午餐時間，大家排隊領維他奶的情景嗎？那甜甜的豆漿味，是許多人學生時代的共同記憶。",
            memoryStory: "維他奶是台灣學童營養午餐的經典飲品，橘色的包裝盒裝著濃濃的豆漿香味。那個年代的孩子，很多人是透過維他奶才第一次品嚐到豆漿的美味。午餐時間，老師會發給每個同學一盒維他奶，大家小心翼翼地插入吸管，慢慢品嚐那份珍貴的營養補給。",
            hint: "比彈珠稍微貴一點，是學校的營養補給品",
            culturalContext: "台灣學童營養改善計畫",
            difficulty: "easy"
        },
        {
            id: 8,
            name: "地瓜籤",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23faf0e6'/%3E%3Cg%3E%3Cpath d='M 60 80 Q 80 75 100 82 Q 120 79 140 85 Q 160 82 180 88' stroke='%23daa520' stroke-width='4' fill='none'/%3E%3Cpath d='M 65 95 Q 85 90 105 97 Q 125 94 145 100 Q 165 97 185 103' stroke='%23cd853f' stroke-width='4' fill='none'/%3E%3Cpath d='M 70 110 Q 90 105 110 112 Q 130 109 150 115 Q 170 112 190 118' stroke='%23d2691e' stroke-width='4' fill='none'/%3E%3Cpath d='M 55 125 Q 75 120 95 127 Q 115 124 135 130 Q 155 127 175 133' stroke='%23bc8f8f' stroke-width='4' fill='none'/%3E%3Cpath d='M 80 140 Q 100 135 120 142 Q 140 139 160 145 Q 180 142 200 148' stroke='%23daa520' stroke-width='4' fill='none'/%3E%3C/g%3E%3Ctext x='125' y='180' text-anchor='middle' fill='%238b4513' font-size='16' font-weight='bold'%3E地瓜籤%3C/text%3E%3Ctext x='125' y='200' text-anchor='middle' fill='%23a0522d' font-size='10'%3E一斤裝%3C/text%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%23654321' font-size='10'%3E節約年代主食%3C/text%3E%3C/svg%3E",
            description: "地瓜切成籤狀曬乾，節約年代的主食",
            era: "節約時代 (1950-1970s)",
            oldPrice: 1.5,
            newPrice: 60,
            priceOptions: [1, 1.5, 2, 3],
            memoryPrompt: "那個年代米不夠吃，地瓜籤就是重要的主食。雖然粗糙，但有著天然的甜味，撐飽了多少台灣人的肚子。",
            memoryStory: "地瓜籤是台灣節約年代的重要主食，當米不夠吃的時候，地瓜籤就成了救命糧食。農家會把地瓜刨成絲，曬乾保存，煮飯時摻入米飯中一起煮。雖然口感粗糙，但地瓜的天然甜味和嚼勁，至今仍是許多老一輩台灣人懷念的味道。那是艱苦歲月裡的甘甜回憶。",
            hint: "比彈珠汽水便宜，是最便宜的主食之一",
            culturalContext: "台灣農業社會節約文化",
            difficulty: "normal"
        },
        {
            id: 9,
            name: "黑白電視機",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23f5f5f5'/%3E%3Crect x='50' y='80' width='150' height='100' fill='%23696969' rx='10'/%3E%3Crect x='60' y='90' width='130' height='80' fill='%23000000' rx='5'/%3E%3Cg fill='%23ffffff' opacity='0.8'%3E%3Cline x1='70' y1='95' x2='180' y2='95'/%3E%3Cline x1='70' y1='100' x2='180' y2='100'/%3E%3Cline x1='70' y1='105' x2='180' y2='105'/%3E%3C/g%3E%3Ccircle cx='210' cy='100' r='8' fill='%23d3d3d3'/%3E%3Ccircle cx='210' cy='130' r='8' fill='%23d3d3d3'/%3E%3Ccircle cx='210' cy='160' r='8' fill='%23d3d3d3'/%3E%3Crect x='75' y='180' width='100' height='15' fill='%238b4513' rx='5'/%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%232f4f4f' font-size='14' font-weight='bold'%3E黑白電視機%3C/text%3E%3Ctext x='125' y='235' text-anchor='middle' fill='%23696969' font-size='10'%3E12吋螢幕%3C/text%3E%3C/svg%3E",
            description: "12吋黑白電視機，鄰居聚看的溫馨時光",
            era: "電視普及時代 (1960-1970s)",
            oldPrice: 8000,
            newPrice: 15000,
            priceOptions: [6000, 8000, 10000, 12000],
            memoryPrompt: "記得全家人圍在小小的黑白電視前，鄰居也會來一起看節目的溫馨時光嗎？那是最珍貴的家電。",
            memoryStory: "黑白電視機是台灣家庭的第一台電視，12吋的小螢幕承載著全家人的娛樂時光。那個年代能買得起電視的家庭不多，所以鄰居們常常會聚在有電視的人家裡一起觀賞節目。從布袋戲到新聞報導，從歌仔戲到日本卡通，小小的螢幕連結起整個社區的情感。",
            hint: "那時候的高級家電，要存很久的錢才能買",
            culturalContext: "台灣電視文化的開端",
            difficulty: "hard"
        },
        {
            id: 10,
            name: "金馬號客車票",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23f0f8ff'/%3E%3Crect x='50' y='100' width='150' height='80' fill='%23fffacd' stroke='%23daa520' stroke-width='3' rx='5'/%3E%3Ctext x='125' y='120' text-anchor='middle' fill='%23b8860b' font-size='12' font-weight='bold'%3E金馬號客車票%3C/text%3E%3Ctext x='125' y='140' text-anchor='middle' fill='%23cd853f' font-size='10'%3E台北→台中%3C/text%3E%3Ctext x='125' y='155' text-anchor='middle' fill='%23daa520' font-size='8'%3E車票：5元%3C/text%3E%3Ctext x='125' y='170' text-anchor='middle' fill='%23b8860b' font-size='8'%3E民國60年代%3C/text%3E%3Cg%3E%3Cpath d='M 80 200 L 170 200 Q 175 200 175 195 L 175 190 Q 175 185 170 185 L 80 185 Q 75 185 75 190 L 75 195 Q 75 200 80 200' fill='%23ff6b35'/%3E%3Ctext x='125' y='195' text-anchor='middle' fill='%23ffffff' font-size='8'%3E金馬客運%3C/text%3E%3C/g%3E%3Ctext x='125' y='230' text-anchor='middle' fill='%234169e1' font-size='12' font-weight='bold'%3E金馬號客車票%3C/text%3E%3C/svg%3E",
            description: "金馬號長途客車票，跨縣市旅行的回憶",
            era: "交通發展時代 (1960-1980s)",
            oldPrice: 5,
            newPrice: 50,
            priceOptions: [3, 5, 8, 12],
            memoryPrompt: "記得坐金馬號從台北到台中，搖搖晃晃一路南下的長途旅行嗎？那是最早的跨縣市大眾運輸。",
            memoryStory: "金馬號是台灣早期最重要的長途客運，橘色的車身在公路上奔馳，連接起台灣南北各地。那個年代沒有高速公路，從台北到台中要開好幾個小時，車票5塊錢對當時的人來說不算便宜。但對於要返鄉探親或出門辦事的人來說，金馬號就是最重要的交通工具。",
            hint: "比彈珠汽水稍微貴一點，但能帶你跨縣市旅行",
            culturalContext: "台灣早期長途客運文化",
            difficulty: "normal"
        },
        {
            id: 11,
            name: "自行車",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23f0ffff'/%3E%3Cg stroke='%23333333' stroke-width='3' fill='none'%3E%3Ccircle cx='70' cy='170' r='35'/%3E%3Ccircle cx='180' cy='170' r='35'/%3E%3Cline x1='105' y1='170' x2='145' y2='170'/%3E%3Cline x1='125' y1='170' x2='125' y2='120'/%3E%3Cline x1='125' y1='120' x2='105' y2='100'/%3E%3Cline x1='125' y1='120' x2='145' y2='100'/%3E%3Cline x1='125' y1='120' x2='160' y2='140'/%3E%3Cline x1='160' y1='140' x2='180' y2='170'/%3E%3C/g%3E%3Crect x='120' y='85' width='10' height='15' fill='%234169e1' rx='2'/%3E%3Ccircle cx='105' cy='105' r='3' fill='%234169e1'/%3E%3Ccircle cx='145' cy='105' r='3' fill='%234169e1'/%3E%3Ctext x='125' y='50' text-anchor='middle' fill='%232c3e50' font-size='14' font-weight='bold'%3E自行車%3C/text%3E%3Ctext x='125' y='230' text-anchor='middle' fill='%234169e1' font-size='12' font-weight='bold'%3E成人款自行車%3C/text%3E%3C/svg%3E",
            description: "成人款自行車，主要代步工具",
            era: "交通工具時代 (1960-1980s)",
            oldPrice: 300,
            newPrice: 3000,
            priceOptions: [200, 300, 500, 800],
            memoryPrompt: "那個年代的自行車是最重要的代步工具，上班、買菜、接送小孩都靠它。一台好的自行車要用很多年。",
            memoryStory: "自行車是台灣早期最重要的交通工具，家家戶戶都有一台。那個年代汽車還很少見，機車也不普及，自行車就是最可靠的代步工具。早上騎車上班，傍晚騎車下班，假日全家出遊也是騎自行車。一台品質好的自行車可以用十幾年，是家庭重要的財產。",
            hint: "那時候的重要代步工具，要存幾個月薪水才能買",
            culturalContext: "台灣早期交通文化",
            difficulty: "hard"
        },
        {
            id: 12,
            name: "國語課本",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 250 250'%3E%3Crect width='250' height='250' fill='%23fffbf0'/%3E%3Crect x='75' y='60' width='100' height='140' fill='%23ffffff' stroke='%234169e1' stroke-width='3' rx='5'/%3E%3Ctext x='125' y='85' text-anchor='middle' fill='%234169e1' font-size='14' font-weight='bold'%3E國語%3C/text%3E%3Ctext x='125' y='105' text-anchor='middle' fill='%234169e1' font-size='12'%3E課本%3C/text%3E%3Ctext x='125' y='125' text-anchor='middle' fill='%236a5acd' font-size='10'%3E小學三年級%3C/text%3E%3Crect x='85' y='135' width='80' height='50' fill='%23f0f8ff'/%3E%3Cg font-size='8' fill='%232c3e50'%3E%3Ctext x='90' y='145'%3E來來來，來上學%3C/text%3E%3Ctext x='90' y='155'%3E去去去，去遊戲%3C/text%3E%3Ctext x='90' y='165'%3E爸爸早早起%3C/text%3E%3Ctext x='90' y='175'%3E看看書，寫寫字%3C/text%3E%3C/g%3E%3Ctext x='125' y='220' text-anchor='middle' fill='%234169e1' font-size='12' font-weight='bold'%3E國語課本%3C/text%3E%3C/svg%3E",
            description: "小學國語課本，九年國教的學習記憶",
            era: "教育普及時代 (1968年後)",
            oldPrice: 5,
            newPrice: 150,
            priceOptions: [3, 5, 8, 12],
            memoryPrompt: "記得「來來來，來上學，去去去，去遊戲」這些課文嗎？那是九年國民教育開始後，每個小朋友都要背的課文。",
            memoryStory: "國語課本是九年國民教育的象徵，1968年台灣實施九年義務教育後，每個小朋友都要上學讀書。課本裡的「來來來，來上學」、「爸爸早早起」等課文，是那個年代所有台灣小朋友共同的記憶。雖然課本只要5塊錢，但對許多家庭來說，讓孩子讀書上學是很大的投資和希望。",
            hint: "和金馬號車票一樣價錢，但是學習的希望",
            culturalContext: "台灣九年國教的歷史見證",
            difficulty: "normal"
        }
    ],

    // 成就系統
    achievements: {
        perfectScore: {
            name: "記憶大師",
            description: "全部答對，真是了不起！",
            condition: score => score === 12
        },
        goodScore: {
            name: "懷舊專家",
            description: "答對大部分題目，很厲害！",
            condition: score => score >= 8
        },
        participation: {
            name: "時光旅人",
            description: "完成了美好的懷舊之旅",
            condition: score => score >= 1
        }
    },

    // 等價比較數據
    equivalentComparisons: {
        // 用於生成有趣的價格比較
        referenceItems: [
            { name: "陽春麵", price: 10, era: "1970年代" },
            { name: "彈珠汽水", price: 3, era: "1970年代" },
            { name: "工人日薪", price: 50, era: "1970年代" },
            { name: "公務員月薪", price: 800, era: "1970年代" }
        ]
    }
};

// 音效和語音功能
const GameAudio = {
    enabled: true,
    volume: 0.7,

    // 播放點擊音效
    playClick: function() {
        if (!this.enabled) return;
        // 使用 Web Audio API 生成簡單的點擊音效
        this.playBeep(800, 100);
    },

    // 播放成功音效
    playSuccess: function() {
        if (!this.enabled) return;
        this.playBeep(1200, 200);
    },

    // 播放錯誤音效
    playError: function() {
        if (!this.enabled) return;
        this.playBeep(400, 300);
    },

    // 生成音效
    playBeep: function(frequency, duration) {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration / 1000);
    },

    // 語音播報
    speak: function(text) {
        if (!this.enabled || !window.speechSynthesis) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.8;
        utterance.volume = this.volume;
        
        speechSynthesis.speak(utterance);
    }
};

// 導出數據
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { taiwanGameData, GameAudio };
} else if (typeof window !== 'undefined') {
    window.taiwanGameData = taiwanGameData;
    window.GameAudio = GameAudio;
}
