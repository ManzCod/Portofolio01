// 1. Hamburger Menu untuk tampilan HP
const mobileMenu = document.querySelector('#mobile-menu');
const navbarMenu = document.querySelector('.navbar');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navbarMenu.classList.toggle('active');
    });
}

// Menutup menu mobile saat mengklik link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if(mobileMenu) mobileMenu.classList.remove('is-active');
        if(navbarMenu) navbarMenu.classList.remove('active');
    });
});

// Hapus elemen lama jika ada, atau buat baru
const textContainer = document.querySelector(".home-content");
let typeSpan = document.querySelector(".typing-text");

if (!typeSpan) {
    typeSpan = document.createElement("span");
    typeSpan.className = "typing-text";
    typeSpan.style.display = "block";
    typeSpan.style.fontSize = "2rem";
    typeSpan.style.color = "#ff3c3c";
    typeSpan.style.fontWeight = "600";
    typeSpan.style.overflow = "hidden"; // Penting untuk efek mulus
    typeSpan.style.borderRight = "3px solid #ff3c3c"; // Garis kursor |
    typeSpan.style.whiteSpace = "nowrap"; // Mencegah teks turun
    typeSpan.style.width = "0"; // Awalnya lebar 0
    typeSpan.style.transition = "width 3s linear"; // Animasi mulus 3 detik
    
    const h1Element = textContainer.querySelector("h1");
    textContainer.insertBefore(typeSpan, h1Element.nextSibling);
}

const text = "Web Developer";

function animateText() {
    // Tahap 1: Mengetik (Memperlebar width)
    typeSpan.style.width = "0";
    typeSpan.textContent = "";
    
    setTimeout(() => {
        typeSpan.style.width = "100%"; // Munculkan teks
        typeSpan.textContent = text;
    }, 100);

    // Tahap 2: Menunggu
    setTimeout(() => {
        // Tahap 3: Menghapus secara mulus (Geser ke kiri)
        typeSpan.style.width = "0";
    }, 4000); // Teks diam selama 4 detik

    // Ulangi terus menerus
    setTimeout(animateText, 7000); // Total durasi siklus
}

// Jalankan
document.addEventListener("DOMContentLoaded", animateText);

// 2. Efek Scroll Lembut (Smooth Scrolling) & Menu Aktif Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 3. Animasi Fade In & Fade Out Berulang (Intersection Observer)
const observerOptions = {
    root: null,
    threshold: 0.15 
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Jika elemen masuk ke area layar, tambahkan class show (Fade-In)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        // Jika elemen keluar dari area layar, hapus class show (Fade-Out)
        else {
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

// Mengamati semua elemen yang memiliki class anim-scroll
document.querySelectorAll('.anim-scroll').forEach(el => {
    scrollObserver.observe(el);
});
