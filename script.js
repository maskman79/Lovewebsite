document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const giftScreen = document.getElementById("gift-screen");
    const mainScreen = document.getElementById("main-screen");
    const giftBox = document.getElementById("gift-box");
    const typingText = document.getElementById("typing-text");
    const loveLetter = document.getElementById("love-letter");
    const loveGrid = document.getElementById("love-grid");
    
    const musicBtn = document.getElementById("music-btn");
    const bgMusic = document.getElementById("bg-music");
    const musicIcon = document.getElementById("music-icon");
    let isPlaying = false;

    // Music Control Toggle
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.textContent = "🎵";
        } else {
            bgMusic.play();
            musicIcon.textContent = "⏸️";
        }
        isPlaying = !isPlaying;
    });

    // Step 1: Transition from Welcome to Gift Screen after 3 Seconds
    setTimeout(() => {
        welcomeScreen.classList.remove("active");
        setTimeout(() => {
            giftScreen.classList.add("active");
        }, 1000);
    }, 3000);

    // Step 2: Open Gift Box
    giftBox.addEventListener("click", () => {
        // Play music automatically on user interaction if permitted
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIcon.textContent = "⏸️";
            }).catch(() => {});
        }

        giftScreen.classList.remove("active");
        setTimeout(() => {
            mainScreen.classList.add("active");
            startTypingEffect("I LOVE YOU ❤️", () => {
                // Actions after typing finishes
                loveLetter.classList.add("show");
                generateLoveGrid();
                startEffects();
            });
        }, 1000);
    });

    // Step 3: Typing Animation Function
    function startTypingEffect(text, onComplete) {
        let index = 0;
        typingText.textContent = "";
        const timer = setInterval(() => {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, 150);
    }

    // Step 4: Render "❤️ I LOVE YOU ❤️" 100 Times
    function generateLoveGrid() {
        loveGrid.innerHTML = "";
        for (let i = 1; i <= 100; i++) {
            const item = document.createElement("div");
            item.className = "grid-item";
            item.textContent = `❤️ I LOVE YOU ❤️`;
            loveGrid.appendChild(item);
        }
        setTimeout(() => {
            loveGrid.classList.add("show");
        }, 500);
    }

    // Step 5: Start Background Particle Canvas
    initCanvasParticles();

    // Step 6: Start Floating Hearts & Falling Petals Effects
    function startEffects() {
        setInterval(createFloatingHeart, 400);
        setInterval(createFallingPetal, 300);
    }

    function createFloatingHeart() {
        const container = document.getElementById("hearts-container");
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.textContent = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 4 + "s";
        heart.style.fontSize = Math.random() * 1.5 + 1 + "rem";

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }

    function createFallingPetal() {
        const container = document.getElementById("petals-container");
        const petal = document.createElement("div");
        petal.className = "falling-petal";
        petal.textContent = "🌹";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = Math.random() * 4 + 4 + "s";
        petal.style.fontSize = Math.random() * 1.2 + 0.8 + "rem";

        container.appendChild(petal);
        setTimeout(() => petal.remove(), 8000);
    }

    // Glowing Background Particles Canvas Algorithm
    function initCanvasParticles() {
        const canvas = document.getElementById("particle-canvas");
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            color: `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, 180, ${Math.random() * 0.5 + 0.2})`,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        }));

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#ff2a6d";
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }
});