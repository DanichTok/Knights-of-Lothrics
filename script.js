// script.js
document.addEventListener("DOMContentLoaded", () => {
    // === 1. ЭКРАН ЗАГРУЗКИ (Preloader) — 1 СЕКУНДА ===
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <img src="img/Lothric.svg" alt="Loading..." class="preloader-logo">
            <div class="preloader-text">Загрузка сайта... 1 сек</div>
            <div class="preloader-bar">
                <div class="preloader-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(preloader);

    // Прогресс-бар (1 секунда)
    const progress = preloader.querySelector('.preloader-progress');
    let width = 0;
    const duration = 1000;
    const interval = 10;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
        if (width >= 100) {
            clearInterval(timer);
            fadeOutPreloader();
        } else {
            width += step;
            progress.style.width = Math.min(width, 100) + '%';
        }
    }, interval);

    function fadeOutPreloader() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }, 400);
    }

    // Скрываем контент до загрузки
    document.body.style.visibility = 'hidden';
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';

    // === 2. ТЁМНАЯ / СВЕТЛАЯ ТЕМА ===
    const themeKey = 'knights-of-lothric-theme';
    const defaultTheme = 'dark';
    let currentTheme = localStorage.getItem(themeKey) || defaultTheme;

    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.title = currentTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
    document.body.appendChild(themeToggle);

    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem(themeKey, currentTheme);
        themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.title = currentTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
    });

    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
    }

    // === 3. АНИМАЦИЯ ПЕЧАТИ С НОВЫМИ ФРАЗАМИ ===
    const textElement = document.querySelector('.text1');
    if (textElement) {
        const phrases = [
            "Ебал вас в жопу",
            "Кошак сын Аказика",
            "Ахуенный клан",
            "Lothric Never Die",
            "Влад соси бибу",
            "Крутышка крутая шишка",
            "Марта соси",
            "Я арбузик я еблан"
        ];
        let phraseIndex = 0;

        function typePhrase(text, callback) {
            let i = 0;
            textElement.textContent = '';
            const typing = setInterval(() => {
                if (i < text.length) {
                    textElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    if (callback) callback();
                }
            }, 50);
        }

        function showNextPhrase() {
            const currentPhrase = phrases[phraseIndex];
            typePhrase(currentPhrase, () => {
                setTimeout(() => {
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    showNextPhrase();
                }, 10000); // 10 секунд на фразу
            });
        }

        // Начинаем с первой фразы
        showNextPhrase();
    }

    // === 4. SPA-ЭФФЕКТ: УЛУЧШЕННОЕ ПЛАВНОЕ ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ ===
    document.querySelectorAll('a').forEach(link => {
        if (
            link.getAttribute('href').startsWith('http') ||
            link.closest('.social-links') ||
            link.getAttribute('href').startsWith('#')
        ) {
            return;
        }

        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.background = document.body.getAttribute('data-theme') === 'dark' ? '#000' : '#fff';

            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    // === 5. АНИМАЦИИ ПРИ НАВЕДЕНИИ ===
    const hoverElements = document.querySelectorAll(`
        .url-button,
        .faq-icon,
        .nav-link,
        [href],
        .feature-card,
        .content-card,
        .discord,
        .social-links img
    `);

    hoverElements.forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-3px) scale(1.03)';
            el.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0) scale(1)';
            el.style.boxShadow = 'none';
        });
    });

    console.log("Knights of Lothric: Все функции активированы.");
});
