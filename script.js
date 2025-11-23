// شريط التنقل التفاعلي
const navbarElement = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// تغيير شريط التنقل عند التمرير
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbarElement.classList.add('scrolled');
    } else {
        navbarElement.classList.remove('scrolled');
    }
    
    // تحديث الرابط النشط بناءً على الموقع
    updateActiveNavLink();
});

// تحديث الرابط النشط في شريط التنقل
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// قائمة الهاتف المحمول
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // إغلاق القائمة على الهاتف المحمول
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // تحديث الرابط النشط
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// نظام Reveal Animation المتقدم
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// مراقب للأقسام الرئيسية
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1, rootMargin: '0px' });

// مراقب للعناصر التفصيلية
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// إضافة تأثيرات reveal متعددة للعناصر
document.addEventListener('DOMContentLoaded', () => {
    // إضافة تأثير reveal للأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // تأثيرات مختلفة للعناصر
    const geoCards = document.querySelectorAll('.geo-card');
    geoCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('reveal-left');
        } else {
            card.classList.add('reveal-right');
        }
        elementObserver.observe(card);
    });

    // تأثيرات للبطاقات
    const attractionCards = document.querySelectorAll('.attraction-card');
    attractionCards.forEach((card, index) => {
        card.classList.add('reveal-up');
        card.style.transitionDelay = `${index * 0.15}s`;
        elementObserver.observe(card);
    });

    // تأثيرات للإحصائيات
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((stat, index) => {
        stat.classList.add('reveal-scale');
        stat.style.transitionDelay = `${index * 0.1}s`;
        elementObserver.observe(stat);
    });

    // تأثيرات للأنشطة
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('reveal-left');
        } else {
            card.classList.add('reveal-right');
        }
        elementObserver.observe(card);
    });

    // تأثيرات للثقافة
    const cultureItems = document.querySelectorAll('.culture-item');
    cultureItems.forEach((item, index) => {
        item.classList.add('reveal-rotate');
        item.style.transitionDelay = `${index * 0.15}s`;
        elementObserver.observe(item);
    });

    // تأثيرات للمعلومات
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.classList.add('reveal-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        elementObserver.observe(card);
    });

    // تأثيرات لمعرض الصور
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal-scale');
        item.style.transitionDelay = `${index * 0.1}s`;
        elementObserver.observe(item);
    });

    // تأثير خاص لمحتوى about
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const aboutText = aboutContent.querySelector('.about-text');
        const aboutImage = aboutContent.querySelector('.about-image');
        
        if (aboutText) {
            aboutText.classList.add('reveal-left');
            elementObserver.observe(aboutText);
        }
        
        if (aboutImage) {
            aboutImage.classList.add('reveal-right');
            elementObserver.observe(aboutImage);
        }
    }
});

// تأثيرات متقدمة للبطاقات مع حركات سلسة (تم دمجها في الكود السابق)

// تأثير الإحصائيات (عداد متحرك)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// تفعيل العدادات عند الظهور
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('h3');
            const targetValue = parseInt(statNumber.textContent);
            if (!isNaN(targetValue)) {
                statNumber.textContent = '0';
                animateCounter(statNumber, targetValue);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// تأثير الموجة في القسم الرئيسي
function createWaveEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // إضافة تأثير حركة خفيفة للخلفية
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

createWaveEffect();

// تأثير النقر على البطاقات
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.attraction-card');
        if (card) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }
    });
});

// تحسين الأداء: إزالة تأثيرات الحركة عند تقليل الحركة
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// إضافة تأثير عند تحميل الصفحة
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// تحديث الموقع عند التمرير (للتأكد من تحديث الرابط النشط)
let navTicking = false;
window.addEventListener('scroll', () => {
    if (!navTicking) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            navTicking = false;
        });
        navTicking = true;
    }
});

// تأثير خاص للزر الرئيسي
const heroButton = document.querySelector('.btn-primary');
if (heroButton) {
    heroButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    heroButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// إضافة تأثير للصور عند التحميل (إذا كانت موجودة)
const allImages = document.querySelectorAll('img');
allImages.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 100);
    });
});

// تحسين تجربة المستخدم: إضافة مؤشر التحميل
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.5';
});

// معرض الصور التفاعلي
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentImageIndex = 0;
const galleryImages = [];

// جمع جميع الصور
galleryItems.forEach((item, index) => {
    const imgSrc = item.dataset.src;
    galleryImages.push(imgSrc);
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(imgSrc);
    });
});

// فتح نافذة عرض الصورة
function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// إغلاق نافذة عرض الصورة
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// التنقل بين الصور
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
});

// التنقل بلوحة المفاتيح
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        }
    }
});

// تأثير Parallax المتقدم للقسم الرئيسي
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                // تأثير parallax للخلفية
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0005})`;
                heroBackground.style.opacity = Math.max(0.3 - (scrolled / heroHeight) * 0.3, 0);
                
                // تأثير parallax للمحتوى
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = Math.max(1 - (scrolled / heroHeight) * 0.5, 0.5);
                }
            }
        });
    }
}

parallaxEffect();

// تأثير Parallax المتقدم للأقسام
function sectionParallax() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        window.addEventListener('scroll', () => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // تأثير parallax خفيف عند التمرير
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrolled = windowHeight - rect.top;
                const parallaxSpeed = 0.1;
                section.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    });
}

// تأثير متقدم للانتقال بين الأقسام
function smoothSectionTransition() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        // إضافة خط فاصل متحرك بين الأقسام
        if (index > 0) {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            divider.style.cssText = `
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
                margin: 0 auto;
                width: 0;
                transition: width 1s ease;
                opacity: 0;
            `;
            section.parentNode.insertBefore(divider, section);
            
            const dividerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.width = '80%';
                        entry.target.style.opacity = '1';
                    }
                });
            }, { threshold: 0.5 });
            
            dividerObserver.observe(divider);
        }
    });
}

smoothSectionTransition();

// تحسين تأثيرات البطاقات
const attractionCards = document.querySelectorAll('.attraction-card');
attractionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const cardImage = this.querySelector('.card-image img');
        if (cardImage) {
            cardImage.style.transform = 'scale(1.15)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const cardImage = this.querySelector('.card-image img');
        if (cardImage) {
            cardImage.style.transform = 'scale(1)';
        }
    });
});

// تأثيرات متقدمة للأنشطة
const activityCards = document.querySelectorAll('.activity-card');
activityCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// تأثير تموج عند النقر
function createRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// إضافة تأثير التموج للأزرار
document.querySelectorAll('.btn').forEach(btn => {
    createRippleEffect(btn);
});

// تحسين الأداء: Lazy loading للصور
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// تأثيرات متقدمة للخريطة
const mapContainer = document.querySelector('.map-container');
if (mapContainer) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    mapContainer.style.opacity = '0';
    mapContainer.style.transform = 'translateY(30px)';
    mapContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    mapObserver.observe(mapContainer);
}

// تحسين تجربة التمرير مع تأثيرات متقدمة
let lastScrollTop = 0;
let scrollTicking = false;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // تأثير إخفاء/إظهار شريط التنقل
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbarElement.style.transform = 'translateY(-100%)';
        navbarElement.style.opacity = '0.9';
    } else {
        navbarElement.style.transform = 'translateY(0)';
        navbarElement.style.opacity = '1';
    }
    
    // تأثير progress bar في الأعلى
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / windowHeight) * 100;
    
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            width: 0%;
            z-index: 10000;
            transition: width 0.1s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled + '%';
    
    lastScrollTop = scrollTop;
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(handleScroll);
        scrollTicking = true;
    }
}, false);

// تأثيرات متقدمة للإحصائيات
const statItems = document.querySelectorAll('.stat-item');
statItems.forEach((stat, index) => {
    stat.style.transitionDelay = `${index * 0.1}s`;
});

console.log('تم تحميل الموقع بنجاح! 🎉');

