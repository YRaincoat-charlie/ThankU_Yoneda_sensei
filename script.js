// 画面の要素を取得
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const errorMessage = document.getElementById('error-message');
const modeToggle = document.getElementById('mode-toggle');

// 1. パスワード認証の処理
loginButton.addEventListener('click', () => {
    if (passwordInput.value === '202605') {
        passwordScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    } else {
        errorMessage.textContent = '❌ パスワードが違います（ヒント: 202605）';
    }
});

// 2. タブ切り替えの処理（フッターテキスト切り替え版）
function switchPage(pageId, currentButton) {
    // すべてのページを一旦非表示にする
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    // クリックされたページだけを表示する
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.remove('hidden');

    // タブボタンのアクティブ状態を切り替え
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (currentButton) {
        currentButton.classList.add('active');
    }

    // メインページ以外ではお花のアートを隠す
    const flyingDecor = document.getElementById('main-page-flying-decor');
    if (flyingDecor) {
        if (pageId === 'main') {
            flyingDecor.classList.remove('hidden');
        } else {
            flyingDecor.classList.add('hidden');
        }
    }

    // メッセージタブが開かれたらルーレットを再描画
    if (pageId === 'messages') {
        setTimeout(drawRoulette, 50);
    }

    // 🎯【ここを追加】各ページに応じたフッターテキストの切り替え処理
    const footerTextEl = document.getElementById('footer-text');
    if (footerTextEl) {
        if (pageId === 'main') {
            footerTextEl.textContent = "2026年5月29日"; // 1ページ目：日付
        } else if (pageId === 'trajectory') {
            footerTextEl.textContent = "おつかれさまでした！"; // 2ページ目：研修のタイトルなど
        } else if (pageId === 'messages') {
            footerTextEl.textContent = ""; // 3ページ目：先生への英語メッセージなど
        }
    }
}

// 🎯【ここを追加】ページを開いた最初の瞬間（初期状態）にもメインの文字を入れておく
document.addEventListener("DOMContentLoaded", () => {
    const footerTextEl = document.getElementById('footer-text');
    if (footerTextEl) {
        footerTextEl.textContent = "2026年5月29日";
    }
});

// 3. ダークモード切り替え
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ==========================================
// 🕹️ フッターのGIFをクリックしたらくるくる回すギミック
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const gifs = document.querySelectorAll(".footer-gif");

    gifs.forEach(gif => {
        gif.addEventListener("click", () => {
            if (gif.classList.contains("spin-y")) return;
            gif.classList.add("spin-y");
            setTimeout(() => {
                gif.classList.remove("spin-y");
            }, 600);
        });
    });
});

// ==========================================
// 📈 軌跡ページ：各技術のスタート日に合わせて「active」クラスを付与する
// ==========================================
function displayRoadmapLines() {
    if (!document.getElementById('page-trajectory')) return;

    const rows = document.querySelectorAll('.roadmap-row');
    
    rows.forEach((row, index) => {
        const l1 = row.querySelector('.line-1');
        const l2 = row.querySelector('.line-2');
        const l3 = row.querySelector('.line-3');
        const l4 = row.querySelector('.line-4');
        const l5 = row.querySelector('.line-5');
        const l6 = row.querySelector('.line-6');

        if (l1) l1.classList.add('active');
        if (index >= 2 && l2) l2.classList.add('active');
        if (index >= 15 && l3) l3.classList.add('active');
        if (index >= 18 && l4) l4.classList.add('active');
        if (index >= 19 && l5) l5.classList.add('active');
        if (index >= 21 && l6) l6.classList.add('active');
    });
}

document.addEventListener("DOMContentLoaded", displayRoadmapLines);


// ==========================================
// 🔼 2ページ目：一番上へ戻るボタンのスクロール処理
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scroll-to-top-btn");
    const mainScreen = document.getElementById("main-content"); // 👈 スクロールしている親コンテナ

    if (scrollTopBtn && mainScreen) {
        scrollTopBtn.addEventListener("click", () => {
            // スクロールバーを持っている「#main-content」の最上部へスムーズに戻す
            mainScreen.scrollTo({
                top: 0,
                behavior: "smooth" // フワッと滑らかに動かす設定
            });
        });
    }
});










// ==========================================
// 🎡 3ページ目：Python実行 ＆ 虹色ルーレット完全制御システム
// ==========================================

const rouletteMembers = [
    { id: 0, name: "ヨネダ",      fullName: "米田久斗", honorific: "先生", avatar: "images/icon_sensei.png",            color: "#9b59b6", msg: "先生、ぜひメッセージをお願いします" },
    { id: 1, name: "タカミ",      fullName: "高見一綺", honorific: "さん", avatar: "images/icon_TakamiKazuki.png",      color: "#4a76a8", msg: "この2か月間、大変お世話になりました。\nまだ同期のメンバーとも十分に打ち解けていない中での研修で、当初はとても緊張していましたが、米田さんの優しく穏やかな雰囲気のおかげで、少しずつ緊張がほぐれていったように思います。\nこれからいよいよ仕事が始まりますが、研修で教えていただいた内容や、協力し合える同期がいることを心の支えに頑張りたいと思います。" },
    { id: 2, name: "カンノ",      fullName: "菅野愛斗", honorific: "さん", avatar: "images/icon_KannoManato.png",       color: "#3498db", msg: "2か月間熱心にご指導いただき、ありがとうございました！\n技術的な内容を幅広く教えていただき、基礎から実務に近い考え方まで多くの学びがありました。また、チームでのコミュニケーションや情報共有の重要性、締切を意識して行動する大切さも強く実感しました。前半Zoomの名前がラッパーみたいで面白かったです！本当にありがとうございました！" },
    { id: 3, name: "タナカ",      fullName: "田中柾利", honorific: "さん", avatar: "images/icon_TanakaMasatoshi.png",   color: "#2ecc71", msg: "米田先生、2か月間大変お世話になりました。朝の一言での「逃げ上手の若君」の話や音楽の話などがとても面白く、毎朝楽しく参加できました。\nまた、日報のコメントでは実務目線の助言を毎回いただき、少しずつ考え方を整理することができました。今後もエラー共有やデバッグを大切にしていきたいです。ありがとうございました。" },
    { id: 4, name: "マツバヤシ",  fullName: "松林ゆい", honorific: "さん", avatar: "images/icon_MatsubayashiYui.png",   color: "#9ebd5e", msg: "先生、こんにちは！\n研修中、自分の尽きない質問に、納得できるまで一つひとつ丁寧に答えてくださり、嬉しかったです！日報でのアドバイスや質問の返答は、経験からしか知ることのできない為になる内容が多く、心に留めておこうと思います。\n朝やお昼休みに聞けたお話も、どれも興味深かったり面白いものばかりで、特に本やAI、家畜化と淘汰の話が印象に残っています。\n私たちの研修の講師が米田先生で本当によかったです！\nありがとうございました！" },
    { id: 5, name: "カシワギ",    fullName: "柏木一歩", honorific: "さん", avatar: "images/icon_KashiwagiKazuho.png",   color: "#f1c40f", msg: "2ヶ月間、手厚いサポートをいただき本当にありがとうございました！\n次々と湧いてくる疑問に何でも優しく答えていただき、とても心強かったです。とくにブループリントなど、一人では理解が難しい箇所も的確に教えていただけたおかげで、開発演習を円滑にスタートできました。\nここで得た知識を活かし、研修後もさらに努力してまいります！" },
    { id: 6, name: "モリタ",      fullName: "森田菜月", honorific: "さん", avatar: "images/icon_MoritaNatsuki.png",     color: "#e67e22", msg: "2ヶ月間お世話になりました！\n米田さんが毎朝ルーレット朝会を開いてくださったおかげで、同期同士の交流も深めることができたように思います。\n「出社きついよね」「この日早く終われて嬉しい」といったような親近感のある言葉をかけてくださり、講師でありながら、上司のような身近な存在に感じていました。\nたくさんのことを教えてくださり、本当にありがとうございました！\n学んだことを胸に、これからも頑張っていきます！" },
    { id: 7, name: "ヒライ",      fullName: "平井智也", honorific: "さん", avatar: "images/icon_HiraiTomoya.png",       color: "#e74c3c", msg: "質問に対する対応が丁寧で、ただ答えを教えるのではなくどのような考え方をするのか、ということまで教えていただけたおかげで後から同じことで詰まることなく研修を進めるこできました。\nまた、チェックインでのお話も緩いものが多く、楽しく研修を受けることができました。２か月間本当にありがとうございました。" }
];

// ── 💻 2. Pythonコード実行ギミック ──
const runBtn = document.getElementById('run-python-btn');
const terminalOutput = document.getElementById('terminal-output');
let typeTimer = null;

if (runBtn) {
    runBtn.addEventListener('click', () => {
        if (typeTimer) clearInterval(typeTimer);
        terminalOutput.textContent = "";

        const pythonSetMembers = ["Kazuki.T", "Yui.M", "Natsuki.M", "Manato.K", "Masatoshi.T", "Kazuho.K", "Tomoya.H"];
        for (let i = pythonSetMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pythonSetMembers[i], pythonSetMembers[j]] = [pythonSetMembers[j], pythonSetMembers[i]];
        }

        const outputLines = [
            "> python yoneda_thank_you.py",
            "研修期間: 2ヶ月 (4/7 ～ 5/29)",
            "学習した言語／技術: Python -> SQL -> HTML/CSS -> JavaScript -> Flask -> React",
            `受講生一同: ${pythonSetMembers.join(', ')}`,
            "",
            "米田久斗先生研修期間中大変お世話になりました。",
            "あっという間の２ヶ月でしたが、先生のサポートのもと、皆様のおかげで日々充実した学びと楽しい時間を過ごすことができました！",
            "本当にありがとうございました！",
            "",
            "Paiza株式会社様、株式会社infordio様をはじめ、すべての関係者の皆様とのご縁に、心より感謝申し上げます。",
            "研修終了日 : 2026年5月29日"
        ];

        const outputText = outputLines.join("\n");
        let charIndex = 0;
        typeTimer = setInterval(() => {
            if (charIndex < outputText.length) {
                terminalOutput.textContent += outputText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeTimer);
            }
        }, 8);
    });
}

// ── 🎡 3. Canvasによる虹色ルーレット描画 ──
const canvas = document.getElementById('roulette-canvas');
const spinBtn = document.getElementById('spin-button');

const numSegments = rouletteMembers.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentAngle = 0;
let isSpinning = false;

function drawRoulette() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    rouletteMembers.forEach((member, i) => {
        const startAngle = currentAngle + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = member.color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        
        ctx.fillStyle = "#222222";
        ctx.font = "bold 18px 'Helvetica Neue', Arial, sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        
        const textText = `${member.id} ${member.name}`;
        ctx.fillText(textText, radius - 35, 0);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.stroke();
}

let pressedKey = null;

window.addEventListener('keydown', (e) => {
    if (['0', '1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        pressedKey = parseInt(e.key);
    }
});

window.addEventListener('keyup', (e) => {
    if (pressedKey !== null && e.key === pressedKey.toString()) {
        pressedKey = null;
    }
});

if (spinBtn) {
    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        
        document.getElementById('active-message-box').classList.add('hidden');

        let targetIndex = (pressedKey !== null) ? pressedKey : Math.floor(Math.random() * numSegments);
        const winner = rouletteMembers[targetIndex];

        const targetStopAngle = (2 * Math.PI) - (targetIndex * segmentAngle) - (segmentAngle / 2);
        const minRotations = 2 * Math.PI * (3 + Math.floor(Math.random() * 2)); 
        const finalAngle = minRotations + targetStopAngle;

        currentAngle = currentAngle % (2 * Math.PI);
        let angleStart = currentAngle;
        let progress = 0;
        const duration = 4000;
        const startTime = performance.now();

        function animateSpin(now) {
            const elapsed = now - startTime;
            progress = elapsed / duration;

            if (progress > 1) progress = 1;

            const easeOutQuad = 1 - Math.pow(1 - progress, 3);
            currentAngle = angleStart + (finalAngle - angleStart) * easeOutQuad;
            drawRoulette();

            if (progress < 1) {
                requestAnimationFrame(animateSpin);
            } else {
                isSpinning = false;
                currentAngle = finalAngle % (2 * Math.PI);
                drawRoulette();
                displayWinnerMessage(winner);
            }
        }
        requestAnimationFrame(animateSpin);
    });
}

// ── 💬 4. 当たった人のメッセージを反映 ──
let msgTimer = null;
function displayWinnerMessage(winner) {
    const msgBox = document.getElementById('active-message-box');
    const nameEl = document.getElementById('student-name');
    const msgEl = document.getElementById('student-message');
    const avatarEl = document.getElementById('student-avatar');

    if (msgTimer) clearInterval(msgTimer);
    msgEl.textContent = "";

    nameEl.innerHTML = `${winner.fullName}<span class="honorific-text">${winner.honorific}</span>`;
    avatarEl.src = winner.avatar;
    
    msgBox.classList.remove('hidden');
    avatarEl.style.borderColor = winner.color;

    let charIndex = 0;
    msgTimer = setInterval(() => {
        if (charIndex < winner.msg.length) {
            msgEl.textContent += winner.msg.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(msgTimer); // 🎯【修正】typeTimerからmsgTimerに修正し、正しく文字送りを停止
        }
    }, 40);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(drawRoulette, 100);
});
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(drawRoulette, 100);
});



// ==========================================
// 📈 軌跡ページ：虹は表示したまま、箱だけをフワッと表示 (完全版)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 🎯【修正】'.roadmap-card-box' というクラス名だけでなく、
    // roadmap-row の中にある「div」要素（＝すべての箱）を確実にすべて取得するように変更します。
    const roadmapCards = document.querySelectorAll('.multi-line-roadmap .roadmap-row > div:last-child, .multi-line-roadmap .roadmap-row .roadmap-card-box');

    if (roadmapCards.length === 0) return;

    // 画面の下から15%の位置に入ったら発動（少し早めに出るように -15% に調整）
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -15% 0px", 
        threshold: 0
    };

    const roadmapCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // 一度表示されたら監視を解除
            }
        });
    }, observerOptions);

    // 最終日も含めて、すべてのカードを確実に監視対象に登録
    roadmapCards.forEach(card => {
        roadmapCardObserver.observe(card);
    });
});