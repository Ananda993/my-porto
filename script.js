document.addEventListener('DOMContentLoaded', function() {

    // --- Translations Object ---
    const translations = {
        en: {
            pageTitle: "Ananda's Portfolio",
            navHome: "Home",
            navProfile: "Profile",
            navProjects: "Projects",
            navAbout: "About",
            navContact: "Contact",
            heroTitle: "Hi, I'm Ananda Guna",
            typingWords: ["A Front-End Developer.", "A Passionate Student.", "A Creative Thinker."],
            profileTitle: "My Profile",
            profileSubTitle: "Front-End Developer & Student",
            profileDesc: "I'm a 3rd-semester Informatics student at UHN Sugriwa Denpasar who's still learning and exploring the world of Front-End Web Development. Although I'm still a beginner, I’m passionate about designing simple, responsive websites and enjoy experimenting with new technologies. In my spare time, I like cycling, reading comics, and picking up new skills little by little to improve myself. 😊",
            projectsTitle: "My Projects",
            viewProject: "View Project",
            project1Title: "MathMitshu",
            project1Desc: "An interactive and fun math learning website for kids, featuring an AI assistant to help with problems.",
            project2Title: "Waifuku Chatbot",
            project2Desc: "A chatbot featuring Mitsuha from the anime 'Kimi No Nawa,' allowing users to interact with their favorite character.",
            project3Title: "ByteNova Class Site",
            project3Desc: "The official website for the ByteNova Informatics class of 2024 at UHN I Gusti Bagus Sugriwa Denpasar.",
            project4Title: "OS Recommendation Blog",
            project4Desc: "A blog dedicated to providing recommendations and reviews for various operating systems to help users choose the best one.",
            project5Title: "Mitshu Audiovisualizer",
            project5Desc: "A web-based audio visualizer that responds to music or microphone input in real-time with dynamic visual effects.",
            aboutTitle: "About Me & Skills",
            aboutSubTitle: "Passionate Learner & Creator",
            aboutDesc: "As a developer, I thrive on bringing ideas to life through code. I'm skilled in various web technologies and always eager to expand my knowledge. My goal is to create web experiences that are not only functional but also intuitive and enjoyable for everyone.",
            contactTitle: "Get In Touch",
            contactDesc: "Have a question or want to work together? Feel free to send me a message on WhatsApp!",
            contactButton: "Chat on WhatsApp",
            footerText: "© 2024 | Designed & Built by I Putu Agus Ananda Guna Prasetya"
        },
        id: {
            pageTitle: "Portofolio Ananda",
            navHome: "Beranda",
            navProfile: "Profil",
            navProjects: "Proyek",
            navAbout: "Tentang",
            navContact: "Kontak",
            heroTitle: "Hai, saya Ananda Guna",
            typingWords: ["Seorang Front-End Developer.", "Seorang Mahasiswa Penuh Semangat.", "Seorang Pemikir Kreatif."],
            profileTitle: "Profil Saya",
            profileSubTitle: "Front-End Developer & Mahasiswa",
            profileDesc: "Saya seorang mahasiswa Informatika semester 3 di UHN Sugriwa Denpasar yang masih belajar dan mendalami dunia Front-End Web Development. Meskipun masih pemula, saya bersemangat dalam merancang website yang simpel, responsif, dan suka bereksperimen dengan teknologi baru. Di waktu luang, saya suka bersepeda, membaca komik, dan sedikit demi sedikit mempelajari hal baru untuk meningkatkan kemampuan diri. 😊",
            projectsTitle: "Proyek Saya",
            viewProject: "Lihat Proyek",
            project1Title: "MathMitshu",
            project1Desc: "Website pembelajaran matematika yang interaktif dan menyenangkan untuk anak-anak, dilengkapi dengan asisten AI untuk membantu mengerjakan soal.",
            project2Title: "Waifuku Chatbot",
            project2Desc: "Chatbot dengan karakter Mitsuha dari anime 'Kimi No Nawa,' memungkinkan pengguna untuk berinteraksi dengan karakter favorit mereka.",
            project3Title: "Situs Kelas ByteNova",
            project3Desc: "Situs resmi untuk kelas Informatika ByteNova angkatan 2024 di UHN I Gusti Bagus Sugriwa Denpasar.",
            project4Title: "Blog Rekomendasi OS",
            project4Desc: "Blog yang didedikasikan untuk memberikan rekomendasi dan ulasan berbagai sistem operasi untuk membantu pengguna memilih yang terbaik.",
            project5Title: "Mitshu Audiovisualizer",
            project5Desc: "Visualizer audio berbasis web yang merespons musik atau input mikrofon secara real-time dengan efek visual yang dinamis.",
            aboutTitle: "Tentang Saya & Keahlian",
            aboutSubTitle: "Pembelajar & Kreator yang Penuh Semangat",
            aboutDesc: "Sebagai seorang developer, saya berkembang dengan mewujudkan ide melalui kode. Saya terampil dalam berbagai teknologi web dan selalu bersemangat untuk memperluas pengetahuan saya. Tujuan saya adalah menciptakan pengalaman web yang tidak hanya fungsional tetapi juga intuitif dan menyenangkan bagi semua orang.",
            contactTitle: "Hubungi Saya",
            contactDesc: "Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk mengirimi saya pesan di WhatsApp!",
            contactButton: "Chat di WhatsApp",
            footerText: "© 2024 | Dirancang & Dibuat oleh I Putu Agus Ananda Guna Prasetya"
        }
    };

    // --- Language Switcher ---
    const languageSelector = document.getElementById('language-selector');
    
    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        languageSelector.value = lang;

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        // Restart typing animation with new words
        if (typingText) {
             words = translations[lang].typingWords;
             wordIndex = 0;
             charIndex = 0;
             isDeleting = false;
             // Clear existing timeout to avoid overlap
             if(typingTimeout) clearTimeout(typingTimeout);
             type();
        }
    };

    languageSelector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // --- Typing Animation ---
    const typingText = document.querySelector('.typing-text');
    let words = [];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function type() {
        if (!words || words.length === 0) return;
        const currentWord = words[wordIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (typingText) {
             typingText.textContent = displayText;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        typingTimeout = setTimeout(type, typeSpeed);
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // --- Scroll Animations ---
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
    });
    
    // --- Mobile Menu ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navAndControls = document.querySelector('.nav-and-controls');
    mobileMenuToggle.addEventListener('click', () => {
        navAndControls.classList.toggle('active');
    });

    // --- Initial Load ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || 'id';

    setTheme(savedTheme);
    setLanguage(savedLang);

});
