const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const errorMessage = document.getElementById('error-message');
const modeToggle = document.getElementById('mode-toggle');

loginButton.addEventListener('click', () => {
    if (passwordInput.value === '202605') {
        passwordScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        const flyingDecor = document.getElementById('main-page-flying-decor');
        if (flyingDecor) flyingDecor.classList.remove('hidden');

        setRandomFlowers();
    } else {
        errorMessage.textContent = '❌ パスワードが違います';
    }
});

function switchPage(pageId, currentButton) {
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (currentButton) {
        currentButton.classList.add('active');
    }

    const flyingDecor = document.getElementById('main-page-flying-decor');
    if (flyingDecor) {
        if (pageId === 'main') {
            flyingDecor.classList.remove('hidden');
            setRandomFlowers(); 
        } else {
            flyingDecor.classList.add('hidden');
        }
    }

    const footerTextEl = document.getElementById('footer-text');
    if (footerTextEl) {
        const isEn = document.body.classList.contains('en-mode');
        if (pageId === 'main') {
            footerTextEl.textContent = isEn ? "May 29, 2026" : "2026年5月29日";
        } else if (pageId === 'trajectory') {
            footerTextEl.textContent = isEn ? "best wishes 4 ur next chapter" : "おつかれさまでした！";
        } else if (pageId === 'messages') {
            footerTextEl.textContent = isEn ? "we miss you sooooooo much!!" : "また見に来てね！";
        }
    }

    document.querySelectorAll('.page-header-group').forEach(el => {
        el.style.display = 'inline-block'; 
        el.offsetHeight;                   
        el.style.display = 'block';        
    });
}

function setRandomFlowers() {
    const top1 = document.getElementById('random-flower-top1');
    const top3 = document.getElementById('random-flower-top3');
    const bottom4 = document.getElementById('random-flower-bottom4');

    if (top1 && top3 && bottom4) {
        const flowerImages = [
            'flower1.png',  'flower2.png',  'flower3.png',  'flower4.png',  'flower5.png',
            'flower6.png',  'flower7.png',  'flower8.png',  'flower9.png',  'flower10.png',
            'flower11.png', 'flower12.png', 'flower13.png', 'flower14.png', 'flower15.png'
        ];

        const random1 = flowerImages[Math.floor(Math.random() * flowerImages.length)];
        const random3 = flowerImages[Math.floor(Math.random() * flowerImages.length)];
        const random4 = flowerImages[Math.floor(Math.random() * flowerImages.length)];

        top1.src = `images/${random1}`;
        top3.src = `images/${random3}`;
        bottom4.src = `images/${random4}`;
    }
}

setRandomFlowers();

if (typeof window.isPartyModeInitialized === 'undefined') {
    window.isPartyModeInitialized = true;
    window.isPartyMode = false;
    let globalHue = 0;

    const blobCursor = document.createElement('img');
    blobCursor.id = 'custom-blob-cursor';
    blobCursor.src = 'images/party_blob.gif'; 
    document.body.appendChild(blobCursor);

    setInterval(() => {
        globalHue = (globalHue + 6) % 360; 
    }, 20);

    function checkDarkModeButton() {
        const toggleBtn = document.getElementById('party-toggle-btn');
        if (!toggleBtn) return;

        const isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            toggleBtn.style.display = 'inline-flex';
        } else {
            toggleBtn.style.display = 'none';
            window.isPartyMode = false;
            document.body.classList.remove('party-mode');
            blobCursor.style.display = 'none';
            toggleBtn.classList.remove('active');
        }
    }

    document.addEventListener('click', () => {
        setTimeout(checkDarkModeButton, 50);
    });

    const toggleBtn = document.getElementById('party-toggle-btn');
    if (toggleBtn) {
        setTimeout(checkDarkModeButton, 100);

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            window.isPartyMode = !window.isPartyMode;
            
            if (window.isPartyMode) {
                document.body.classList.add('party-mode');
                const mainContent = document.getElementById('main-content');
                if (mainContent && !mainContent.classList.contains('hidden')) {
                    blobCursor.style.display = 'block';
                }
                toggleBtn.classList.add('active');
            } else {
                document.body.classList.remove('party-mode');
                blobCursor.style.display = 'none';
                toggleBtn.classList.remove('active');
            }
        });
    }

    document.addEventListener('mousemove', (e) => {
        const mainContent = document.getElementById('main-content');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (!mainContent || mainContent.classList.contains('hidden') || !isDark) {
            blobCursor.style.display = 'none';
            document.body.classList.remove('party-mode');
            return;
        }

        if (window.isPartyMode) {
            document.body.classList.add('party-mode');
            blobCursor.style.display = 'block';
            blobCursor.style.left = `${e.clientX}px`;
            blobCursor.style.top = `${e.clientY}px`;
        }

        if (!window.isPartyMode) return; 
        if (Math.random() > 0.8) return; 

        for (let i = 0; i < 3; i++) {
            const star = document.createElement('img');
            star.src = 'images/star_yellow.png'; 
            star.classList.add('fairy-dust');

            const scrollContainer = document.getElementById('main-content');
            
            const offsetX = (Math.random() - 0.5) * 30; 
            const offsetY = -15 + (Math.random() - 0.5) * 10; 
            
            const x = e.clientX + offsetX;
            const y = e.clientY + scrollContainer.scrollTop + offsetY;

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            const size = Math.floor(Math.random() * 16) + 12;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            const drift = (Math.random() - 0.5) * 100; 
            star.style.setProperty('--drift-x', `${drift}px`);
            star.style.setProperty('--base-hue', `${globalHue}deg`);

            const randomRotate = Math.random() > 0.5 ? 180 : -180;
            star.style.setProperty('--target-rotate', `${randomRotate}deg`);

            scrollContainer.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 1000);
        }
    }); 
}

window.addEventListener("load", () => {
    setRandomFlowers();
});

document.addEventListener("DOMContentLoaded", () => {
    const footerTextEl = document.getElementById('footer-text');
    if (footerTextEl) {
        footerTextEl.textContent = document.body.classList.contains('en-mode') ? "May 29, 2026" : "2026年5月29日";
    }
});

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

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

document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scroll-to-top-btn");
    const mainScreen = document.getElementById("main-content");
    if (scrollTopBtn && mainScreen) {
        scrollTopBtn.addEventListener("click", () => {
            mainScreen.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

const rouletteMembers = [
    { id: 0, name: "ヨネダ",      fullName: "米田久斗", honorific: "先生",  fullNameEn: "Hisato Yoneda",    honorificEn: "Sensei", avatar: "images/icon_sensei.png",            color: "#9b59b6", 
        msg: "2ヶ月間ありがとうございました！\n研修を通して「開発楽しいなあ、仕事って悪くないなあ」と思ってくれていたら、これ以上の喜びはありません。\nお互いに成長した姿で、またお会いできる日を楽しみにしています。\nみなさんのこれからの人生に、ありとあらゆる良いことがたくさんありますように！",     
        msgEn: `With my sincere gratitude for these past two months, and honestly, nothing would bring me greater reward than knowing this training made you think;\n<i>'Hey, development's kinda fun\n<span style="margin-left: 60px;"></span>... and work isn't so bad after all.'</i>\nLet's keep pushing our limits until our paths cross again.\nMay each and every single <b>one</b> of you find a life full of absolute greatness and happiness in the <b>day</b>s ahead!!` },
    { id: 1, name: "タカミ",      fullName: "高見一綺", honorific: "さん",  fullNameEn: "Kazuki Takami",    honorificEn: "",       avatar: "images/icon_TakamiKazuki.png",      color: "#4a76a8", 
        msg: "この2か月間、大変お世話になりました\nまだ同期のメンバーとも十分に打ち解けていない中での研修で、当初はとても緊張していましたが、米田さんの優しく穏やかな雰囲気のおかげで、少しずつ緊張がほぐれていったように思います。\nこれからいよいよ仕事が始まりますが、研修で教えていただいた内容や、協力し合える同期がいることを心の支えに頑張りたいと思います。",     
        msgEn: "Thank you so much for your support over the past two months.\nAt first, I was very nervous about starting the training when I hadn't yet gotten close to the other members. However, thanks to your kind and gentle demeanor, I felt my tension ease little by little.\nNow, our actual work is about to start, but I will do my best by leaning on what you taught us during the training and knowing I've got supportive peers by my side." },
    { id: 2, name: "カンノ",      fullName: "菅野愛斗", honorific: "さん",  fullNameEn: "Manato Kanno",     honorificEn: "",       avatar: "images/icon_KannoManato.png",       color: "#3498db", 
        msg: "2か月間熱心にご指導いただき、ありがとうございました！\n技術的な内容を幅広く教えていただき、基礎から実務に近い考え方まで多くの学びがありました。また、チームでのコミュニケーションや情報共有の重要性、締切を意識して行動する大切さも強く実感しました。前半Zoomの名前がラッパーみたいで面白かったです！本当にありがとうございました！",     
        msgEn: "I am so grateful for your passionate guidance and support over these two months!\nI learned so much, from the basics to practical approaches, through the wide range of technical topics you taught us. I also truly realized the importance of team communication, information sharing, and being mindful of deadlines. Btw, I thought your Zoom name in the first day looked like a rapper, 'twas so funny XD\nThank you so very much!" },
    { id: 3, name: "タナカ",      fullName: "田中柾利", honorific: "さん",  fullNameEn: "Masatoshi Tanaka", honorificEn: "",       avatar: "images/icon_TanakaMasatoshi.png",   color: "#2ecc71", 
        msg: "米田先生、2か月間大変お世話になりました。朝の一言での「逃げ上手の若君」の話や音楽の話などがとても面白く、毎朝楽しく参加できました。\nまた、日報のコメントでは実務目線の助言を毎回いただき、少しずつ考え方を整理することができました。今後もエラー共有やデバッグを大切にしていきたいです。ありがとうございました。",     
        msgEn: "Yoneda-sensei, thank you so much for everything over the past two months. Your morning talks were always so enjoyable (especially about 'The Elusive Samurai' and music to me), and I really looked forward to joining your class every day.\nAlso, your feedback on our daily reports always gave us a practical perspective, which helped me organize my thoughts step by step. I'll keep in mind to be more conscious of error-sharing and debugging going forward. Thank you so much for everything." },
    { id: 4, name: "マツバヤシ",  fullName: "松林ゆい", honorific: "さん",  fullNameEn: "Yui Matsubayashi", honorificEn: "",       avatar: "images/icon_MatsubayashiYui.png",   color: "#9ebd5e", 
        msg: "先生、こんにちは！\n研修中、自分の尽きない質問に、納得できるまで一つひとつ丁寧に答えてくださり、嬉しかったです！日報でのアドバイスや質問の返答は、経験からしか知ることのできない為になる内容が多く、心に留めておこうと思います。\n朝やお昼休みに聞けたお話も、どれも興味深かったり面白いものばかりで、特に本やAI、家畜化と淘汰の話が印象に残っています。\n私たちの研修の講師が米田先生で本当によかったです！\nありがとうございました！",     
        msgEn: "Hello, Sensei!\nDuring the whole class, I was SO happy that you answered every single one of my endless questions kindly and patiently until I was convinced and fully understood. What would I do without you? Your advice on daily reports and answers to our questions were full of valuable insights that can only come from your special experience, and I will keep them close to my heart.\nThe stories you shared in the mornings and during lunch breaks were always fascinating and funny at times; I was especially impressed by the talks about books, AI, languages, domestication, and natural selection.\nWe are super lucky to have Yoneda-sensei as our instructor!\nThanks a lot for your wonderful guidance!" },
    { id: 5, name: "カシワギ",    fullName: "柏木一歩", honorific: "さん",  fullNameEn: "Kazuho Kashiwagi", honorificEn: "",       avatar: "images/icon_KashiwagiKazuho.png",   color: "#f1c40f", 
        msg: "2ヶ月間、手厚いサポートをいただき本当にありがとうございました！\n次々と湧いてくる疑問に何でも優しく答えていただき、とても心強かったです。とくにブループリントなど、一人では理解が難しい箇所も的確に教えていただけたおかげで、開発演習を円滑にスタートできました。\nここで得た知識を活かし、研修後もさらに努力してまいります！",     
        msgEn: "Thank you so very much for your warm support over these two months!\nYour kindness in answering all the questions that kept popping up was truly reassuring for me. Thanks to your clear and precise explanations on topics that are difficult to understand alone, especially like Blueprints, we were able to start our development exercises smoothly.\nI will make the most of the knowledge I gained here and work even harder after this training!" },
    { id: 6, name: "モリタ",      fullName: "森田菜月", honorific: "さん",  fullNameEn: "Natsuki Morita",   honorificEn: "",       avatar: "images/icon_MoritaNatsuki.png",     color: "#e67e22", 
        msg: "2ヶ月間お世話になりました！\n米田さんが毎朝ルーレット朝会を開いてくださったおかげで、同期同士の交流も深めることができたように思います。\n「出社きついよね」「この日早く終われて嬉しい」といったような親近感のある言葉をかけてくださり、講師でありながら、上司のような身近な存在に感じていました。\nたくさんのことを教えてくださり、本当にありがとうございました！\n学んだことを胸に、これからも頑張っていきます！",     
        msgEn: "Thank you for everything over the past two months!\nIt was a huge help that you hosted the morning roulette check-ins every day; I believe we were able to bond with our peers.\nYou always spoke to us with such friendly words, saying things like 'Coming to the office is tough, isn't it?' or 'Off work early, so happy♪' Even though you were our instructor, I felt like you were an approachable, boss-like figure to us.\nI highly appreciate your support and teaching us so many things!\nKeeping what I learned in my heart, I promise you to keep doing my best!" },
    { id: 7, name: "ヒライ",      fullName: "平井智也", honorific: "さん",  fullNameEn: "Tomoya Hirai",     honorificEn: "",       avatar: "images/icon_HiraiTomoya.png",       color: "#e74c3c", 
        msg: "質問に対する対応が丁寧で、ただ答えを教えるのではなくどのような考え方をするのか、ということまで教えていただけたおかげで後から同じことで詰まることなく研修を進めるこできました。\nまた、チェックインでのお話も緩いものが多く、楽しく研修を受けることができました。２か月間本当にありがとうございました。",     
        msgEn: "Your responses to our questions were always so thorough. Instead of just giving us the answers, you taught us the mindset and how to think through problems. Thanks to that, I was able to move forward with the training without getting stuck on the same issues later.\nAlso, the lighthearted talks during check-ins made the training a lot of fun. Thank you so much for these invaluable times over the two months." }
];

const runBtn = document.getElementById('run-python-btn');
const terminalOutput = document.getElementById('terminal-output');
let typeTimer = null;
let isTerminalRun = false;     
let currentPythonMembers = []; 

if (runBtn) {
    runBtn.addEventListener('click', () => {
        if (typeTimer) clearInterval(typeTimer);
        terminalOutput.textContent = "";
        isTerminalRun = true;

        const pythonSetMembers = ["Kazuki.T", "Yui.M", "Natsuki.M", "Manato.K", "Masatoshi.T", "Kazuho.K", "Tomoya.H"];
        for (let i = pythonSetMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pythonSetMembers[i], pythonSetMembers[j]] = [pythonSetMembers[j], pythonSetMembers[i]];
        }
        currentPythonMembers = pythonSetMembers;

        startTerminalTyping(false); 
    });
}

function startTerminalTyping(instant = false) {
    if (!isTerminalRun) return; 
    if (typeTimer) clearInterval(typeTimer);
    
    const isEn = document.body.classList.contains('en-mode');
    let outputLines = [];

    if (isEn) {
        outputLines = [
            "> python yoneda_thank_you.py",
            "Training Period: 2 Months (4/7 - 5/29)",
            "Curriculum: Python -> SQL -> HTML/CSS -> JavaScript -> Flask -> React",
            `Students: ${currentPythonMembers.join(', ')}`,
            "",
            "Dear Yoneda Hisato-sensei, thank you so much for everything during the training period.",
            "They say time flies when you're having fun, and these two months were gone in a flash!",
            "Thanks to your support and everyone here, we were able to spend every day filled with fruitful learning and great times!",
            "Thank you very, very much!",
            "",
            "We would like to express our heartfelt gratitude for the opportunity to connect with Paiza Inc., infordio Inc., and everyone involved.",
            "Finished on: May 29, 2026"
        ];
    } else {
        outputLines = [
            "> python yoneda_thank_you.py",
            "研修期間: 2ヶ月 (4/7 ～ 5/29)",
            "学習した言語／技術: Python -> SQL -> HTML/CSS -> JavaScript -> Flask -> React",
            `受講生一同: ${currentPythonMembers.join(', ')}`,
            "",
            "米田久斗先生研修期間中大変お世話になりました。",
            "あっという間の２ヶ月でしたが、先生のサポートのもと、皆様のおかげで日々充実した学びと楽しい時間を過ごすことができました！",
            "本当にありがとうございました！",
            "",
            "Paiza株式会社様、株式会社infordio様をはじめ、すべての関係者の皆様とのご縁に、心より感謝申し上げます。",
            "研修終了日 : 2026年5月29日"
        ];
    }

    const outputText = outputLines.join("\n");
    
    if (instant) {
        terminalOutput.textContent = outputText;
    } else {
        terminalOutput.textContent = "";
        let charIndex = 0;
        typeTimer = setInterval(() => {
            if (charIndex < outputText.length) {
                terminalOutput.textContent += outputText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeTimer);
            }
        }, 8);
    }
}

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

    const isEn = document.body.classList.contains('en-mode');

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
        
        const displayName = isEn ? member.fullNameEn.split(' ').pop() : member.name;
        const textText = `${member.id} ${displayName}`;
        
        let fontSize = isEn ? 20 : 20;
        if (isEn && displayName.length >= 10) {
            fontSize = 16; 
        }

        ctx.font = `bold ${fontSize}px 'Helvetica Neue', Arial, sans-serif`;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        
        ctx.fillText(textText, radius - 20, 0);
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

let msgTimer = null;
let lastSelectedWinner = null; 

function displayWinnerMessage(winner) {
    if (!winner) return;
    lastSelectedWinner = winner; 

    const msgBox = document.getElementById('active-message-box');
    const nameEl = document.getElementById('student-name');
    const msgEl = document.getElementById('student-message');
    const avatarEl = document.getElementById('student-avatar');

    if (msgTimer) clearInterval(msgTimer);
    msgEl.innerHTML = ""; 
    
    let typedText = "";

    msgEl.style.whiteSpace = "normal";
    msgEl.style.wordBreak = "break-word";

    const isEn = document.body.classList.contains('en-mode');

    const displayName = isEn ? winner.fullNameEn : winner.fullName;
    const displayHonorific = isEn ? winner.honorificEn : winner.honorific;
    const displayMsg = isEn ? winner.msgEn : winner.msg;

    nameEl.innerHTML = `${displayName}<span class="honorific-text">${displayHonorific}</span>`;
    avatarEl.src = winner.avatar;
    
    msgBox.classList.remove('hidden');
    avatarEl.style.borderColor = winner.color;

    let charIndex = 0;
    msgTimer = setInterval(() => {
        if (charIndex < displayMsg.length) {
            
            if (displayMsg.substring(charIndex, charIndex + 2) === '\\n' || displayMsg.charAt(charIndex) === '\n') {
                typedText += "<br>";
                msgEl.innerHTML = typedText;
                charIndex += (displayMsg.substring(charIndex, charIndex + 2) === '\\n') ? 2 : 1;
                return;
            }

            if (displayMsg.charAt(charIndex) === '<') {
                const tagEndIndex = displayMsg.indexOf('>', charIndex);
                if (tagEndIndex !== -1) {
                    typedText += displayMsg.substring(charIndex, tagEndIndex + 1);
                    msgEl.innerHTML = typedText;
                    charIndex = tagEndIndex + 1; 
                    return;
                }
            }

            typedText += displayMsg.charAt(charIndex);
            msgEl.innerHTML = typedText;
            charIndex++;
        } else {
            clearInterval(msgTimer); 
        }
    }, 40);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(drawRoulette, 100);
});

document.addEventListener("DOMContentLoaded", () => {
    const roadmapCards = document.querySelectorAll('.multi-line-roadmap .roadmap-row > div:last-child, .multi-line-roadmap .roadmap-row .roadmap-card-box');
    if (roadmapCards.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -15% 0px", 
        threshold: 0
    };

    const roadmapCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    roadmapCards.forEach(card => {
        roadmapCardObserver.observe(card);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('en-mode');
            langBtn.classList.toggle('active');

            const currentTab = document.querySelector('.tab-btn.active');
            let currentPageId = 'main';
            if (currentTab) {
                if (currentTab.getAttribute('onclick').includes('trajectory')) currentPageId = 'trajectory';
                if (currentTab.getAttribute('onclick').includes('messages')) currentPageId = 'messages';
            }
            
            const footerTextEl = document.getElementById('footer-text');
            if (footerTextEl) {
                if (currentPageId === 'main') {
                    footerTextEl.textContent = document.body.classList.contains('en-mode') ? "May 29, 2026" : "2026年5月29日";
                } else if (currentPageId === 'trajectory') {
                    footerTextEl.textContent = document.body.classList.contains('en-mode') ? "best wishes 4 ur next chapter" : "おつかれさまでした！";
                } else if (currentPageId === 'messages') {
                    footerTextEl.textContent = document.body.classList.contains('en-mode') ? "we miss you sooooooo much!!" : "また見に来てね！";
                }
            }

            if (typeof lastSelectedWinner !== 'undefined' && lastSelectedWinner) {
                displayWinnerMessage(lastSelectedWinner);
            }

            if (typeof drawRoulette === 'function') {
                drawRoulette(); 
            }

            if (typeof startTerminalTyping === 'function') {
                startTerminalTyping(true); 
            }
        });
    }
});

(() => {
    const secretWord = 'hisato';
    let inputLog = '';

    document.addEventListener('keydown', (e) => {
        inputLog += e.key.toLowerCase();
        if (inputLog.length > secretWord.length) {
            inputLog = inputLog.slice(-secretWord.length);
        }
        if (inputLog === secretWord) {
            inputLog = '';
            launchFireworksBatch();
        }
    });

    function launchFireworksBatch() {
        for (let i = 0; i < 4; i++) { 
            setTimeout(() => {
                const startX = Math.random() * (window.innerWidth * 0.5) + (window.innerWidth * 0.25);
                const startY = Math.random() * (window.innerHeight * 0.4) + (window.innerHeight * 0.3);
                createRadialFirework(startX, startY);
            }, i * 400); 
        }
    }

    function createRadialFirework(x, y) {
        const container = document.getElementById('firework-container');
        if (!container) return;

        const directions = 6;      
        const itemsPerLine = 9;    

        const fireworkImages = [
            'images/circle.png',
            'images/circles.png',
            'images/moon.png',
            'images/star_yellow.png', 
            'images/star_orange.png'  
        ];

        const baseHue = Math.random() * 360;
        const randomShift = Math.random();

        for (let d = 0; d < directions; d++) {
            const angle = ((d + randomShift) * (360 / directions)) * (Math.PI / 180);

            for (let i = 0; i < itemsPerLine; i++) {
                const img = document.createElement('img');
                const randomImg = fireworkImages[Math.floor(Math.random() * fireworkImages.length)];
                img.src = randomImg;
                img.classList.add('firework-particle');

                img.style.left = `${x}px`;
                img.style.top = `${y}px`;

                const baseDistance = 30 + (Math.pow(i, 1.5) * 12); 
                const randomVelocity = Math.random() * 10 - 5;
                const finalDistance = baseDistance + randomVelocity;

                const targetX = Math.cos(angle) * finalDistance;
                const targetY = Math.sin(angle) * finalDistance;

                img.style.setProperty('--tx', `${targetX}px`);
                img.style.setProperty('--ty', `${targetY}px`);
                img.style.setProperty('--start-hue', `${baseHue + (i * 8)}deg`);

                const size = 18 + (i * 2.5) + (Math.random() * 8); 
                img.style.width = `${size}px`;
                img.style.height = `${size}px`;

                img.style.animationDelay = `${i * 0.05}s`;

                img.addEventListener('animationend', () => {
                    img.remove();
                });

                container.appendChild(img);
            }
        }
    }
})();

(() => {
    const secretWordcute = 'cute';
    let inputLogCute = '';

    const cuteImages = [
        'images/party_blob.gif',
        'images/mario_luigi_dance.gif',
        'images/thumbsup_parrot.gif',
        'images/icon_sensei.png'
    ];

    document.addEventListener('keydown', (e) => {
        inputLogCute += e.key.toLowerCase();
        if (inputLogCute.length > secretWordcute.length) {
            inputLogCute = inputLogCute.slice(-secretWordcute.length);
        }
        if (inputLogCute === secretWordcute) {
            inputLogCute = '';
            launchCuteJump();
        }
    });

    function launchCuteJump() {
        const totalCount = 70; 
        for (let i = 0; i < totalCount; i++) {
            setTimeout(() => {
                createJumpingCharacter();
            }, i * 45); 
        }
    }

    function createJumpingCharacter() {
        const container = document.getElementById('firework-container');
        if (!container) return;

        const img = document.createElement('img');
        const randomImg = cuteImages[Math.floor(Math.random() * cuteImages.length)];
        img.src = randomImg;
        
        img.style.position = 'fixed';
        img.style.bottom = '-100px'; 
        img.style.zIndex = '10000';
        img.style.pointerEvents = 'none';

        const startX = Math.random() * 100; 
        img.style.left = `${startX}vw`;

        const randomSize = Math.floor(Math.random() * 50) + 30;
        img.style.width = `${randomSize}px`;
        img.style.height = 'auto';
        img.style.objectFit = 'contain';

        const jumpHeight = -(Math.random() * 90 + 70); 
        const driftX = (Math.random() - 0.5) * 300; 
        const randomRotate = (Math.random() - 0.5) * 720; 

        img.style.setProperty('--jump-y', `${jumpHeight}vh`);
        img.style.setProperty('--drift-x', `${driftX}px`);
        img.style.setProperty('--target-rotate', `${randomRotate}deg`);

        const duration = Math.random() * 1.7 + 3.5;
        img.style.animation = `cuteJumpAnimation ${duration}s linear forwards`;

        img.addEventListener('animationend', () => {
            img.remove();
        });

        container.appendChild(img);
    }
})();