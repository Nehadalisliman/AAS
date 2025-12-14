/**
 * ASEEL Perfumes - Main JavaScript File
 * - Inject Header & Footer
 * - Handle all site interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    loadLayout();
    initializeSiteFunctions();
});

/* =========================================
   1. Inject Header & Footer
   ========================================= */
function loadLayout() {

    /* ---------- Header ---------- */
    const headerPlaceholder = document.getElementById('app-header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header>
                <div class="container">
                    <nav>
                        <a href="index.html" class="logo">ASEEL</a>

                        <div class="mobile-menu-btn">
                            <i class="fas fa-bars"></i>
                        </div>

                        <ul class="nav-links">
                            <li><a href="index.html" class="${isActivePage('index.html')}">الرئيسية</a></li>
                            <li><a href="shop.html" class="${isActivePage('shop.html')}">المتجر</a></li>
                            <li><a href="about.html" class="${isActivePage('about.html')}">من نحن</a></li>
                            <li><a href="contact.html" class="${isActivePage('contact.html')}">اتصل بنا</a></li>
                            <li><a href="login.html" class="${isActivePage('login.html')}">دخول</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }

    /* ---------- Footer ---------- */
    const footerPlaceholder = document.getElementById('app-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-col">
                            <h4>عن أصيل</h4>
                            <p>علامة تجارية رائدة في عالم العطور الرجالية الفاخرة.</p>
                        </div>

                        <div class="footer-col">
                            <h4>روابط سريعة</h4>
                            <ul>
                                <li><a href="shop.html">المتجر</a></li>
                                <li><a href="policies.html">السياسات</a></li>
                                <li><a href="contact.html">اتصل بنا</a></li>
                            </ul>
                        </div>

                        <div class="footer-col">
                            <h4>تواصل معنا</h4>
                            <p>concierge@aseel.com</p>
                            <p>+966 50 000 0000</p>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>&copy; 2024 ASEEL Perfumes. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

/* ---------- Active Page ---------- */
function isActivePage(pageName) {
    const path = window.location.pathname;
    if (
        path.includes(pageName) ||
        (pageName === 'index.html' &&
            (path.endsWith('/') || path.endsWith('index.html')))
    ) {
        return 'active';
    }
    return '';
}

/* =========================================
   2. Site Functions
   ========================================= */
function initializeSiteFunctions() {

    /* ---------- Mobile Menu ---------- */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    /* ---------- Sticky Header ---------- */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow =
                window.scrollY > 50 ? '0 2px 10px rgba(0,0,0,.5)' : 'none';
        });
    }

    /* ---------- Shop Filter ---------- */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.filter;
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display =
                    category === 'all' || card.dataset.category === category
                        ? 'block'
                        : 'none';
                card.style.animation = 'fadeIn 0.5s ease';
            });
        });
    });

    /* ---------- Contact Form ---------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('تم إرسال الرسالة بنجاح ✓');
            contactForm.reset();
        });
    }

    /* ---------- Login ---------- */
    const toggleBtn = document.querySelector('.toggle-password');
    const passInput = document.getElementById('loginPassword');

    if (toggleBtn && passInput) {
        toggleBtn.addEventListener('click', () => {
            passInput.type = passInput.type === 'password' ? 'text' : 'password';
            toggleBtn.classList.toggle('fa-eye');
            toggleBtn.classList.toggle('fa-eye-slash');
        });
    }

    /* ---------- Counters ---------- */
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
            count += target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + '+';
            }
        };
        update();
    });

    /* ---------- Product Gallery ---------- */
    const mainImage = document.getElementById('mainImage');
    document.querySelectorAll('.thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    /* ---------- Accordion ---------- */
    document.querySelectorAll('.accordion-header').forEach(acc => {
        acc.addEventListener('click', () => {
            acc.classList.toggle('active');
            const content = acc.nextElementSibling;
            content.style.maxHeight
                ? (content.style.maxHeight = null)
                : (content.style.maxHeight = content.scrollHeight + 'px');
        });
    });
}

/* ---------- FadeIn Animation ---------- */
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);
