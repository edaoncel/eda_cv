async function changeLanguage(lang) {
    // Seçilen dili tarayıcıya kaydet (Geri dönüşlerde ve PDF sonrası hatırlaması için)
    localStorage.setItem('selectedLang', lang);

    const response = await fetch('lang.json');
    const data = await response.json();
    const content = data[lang];

    // Dil butonlarının görünürlüğünü ayarla
    if (lang === 'tr') {async function changeLanguage(lang) {
    try {
        const response = await fetch('lang.json');
        const data = await response.json();
        const content = data[lang];

        // Header & Hakkımda
        document.querySelector('.cv-name').innerText = content.header_name;
        document.querySelector('.cv-title').innerText = content.header_title;
        document.querySelector('.lang-about-title').innerText = content.about_h2;
        document.querySelector('.lang-about-text').innerText = content.about_p;

        // Eğitim & Deneyim
        document.querySelector('.lang-edu-title').innerText = content.edu_h2;
        document.querySelector('.lang-edu-dept').innerText = content.edu_dept;
        document.querySelector('.lang-edu-pedagogy').innerText = content.edu_pedagogy;
        document.querySelector('.lang-exp-title').innerText = content.exp_h2;
        document.getElementById('exp-1').innerHTML = content.exp_1;
        document.getElementById('exp-2').innerHTML = content.exp_2;
        document.getElementById('exp-3').innerHTML = content.exp_3;
        document.getElementById('exp-4').innerHTML = content.exp_4;
        document.getElementById('exp-5').innerHTML = content.exp_5;

        // Diğer Başlıklar
        document.querySelector('.lang-cert-title').innerText = content.cert_h2;
        document.querySelector('.lang-contact-title').innerText = content.contact_h2;
        document.querySelector('.lang-skills-title').innerText = content.skills_h2;
        document.querySelector('.lang-projects-title').innerText = content.projects_h2;
        document.querySelector('.lang-langs-title').innerText = content.lang_h2;
        document.querySelector('.lang-accounts-title').innerText = content.acc_h2;
        document.querySelector('.lang-en-level').innerText = content.lang_en_level;
        document.querySelector('.lang-skills-db').innerHTML = content.skills_db;
        document.querySelector('.lang-skills-ai').innerHTML = content.skills_ai;
        document.querySelector('[data-key="view-cv-btn"]').innerHTML = `<i class="fas fa-external-link-alt"></i> ${content['view-cv-btn']}`;

        // Proje Modalları
        document.querySelector('.lang-proj1-title').innerText = content.proj1_title;
        document.querySelector('.lang-proj2-title').innerText = content.proj2_title;
        document.querySelector('.lang-proj1-modal-title').innerText = content.proj1_modal_title;
        document.querySelector('.lang-proj1-desc').innerText = content.proj1_desc;
        document.querySelector('.lang-proj2-modal-title').innerText = content.proj2_modal_title;
        document.querySelector('.lang-proj2-desc').innerText = content.proj2_desc;
        
        // GitHub Butonları & PDF & QR
        document.querySelectorAll('.lang-github-text').forEach(btn => btn.innerHTML = content.github_text);
        document.querySelector('.lang-download-btn').innerHTML = content.download_btn;
        document.querySelector('.qr-hint').innerHTML = content.qr_code;

        // Dil Değiştirme Butonları
        document.getElementById('btn-en').style.display = lang === 'en' ? 'none' : 'inline-flex';
        document.getElementById('btn-tr').style.display = lang === 'tr' ? 'none' : 'inline-flex';

        localStorage.setItem('selectedLang', lang);
    } catch (e) { console.error("Dil yükleme hatası:", e); }
}


window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }
};

function downloadCV() {
    window.scrollTo(0, 0);
    
    const element = document.querySelector('.cv-wrapper');
    const buttons = document.querySelectorAll('.lang-switch-btn, .theme-btn, .download-section, .language-wrapper, .theme-wrapper');
    
    buttons.forEach(btn => btn.style.display = 'none');

const opt = {
    margin: 0,
    filename: 'Eda_Oncel_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
        scale: 2, 
        useCORS: true,
        scrollY: 0,
        letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { 
        mode: ['css', 'legacy'], 
        before: '.html2pdf__page-break',
        avoid: ['section', 'h2', '.item']
    }
};

    html2pdf().set(opt).from(element).save().then(() => {
        const lang = localStorage.getItem('selectedLang') || 'tr';
        buttons.forEach(btn => {
            if (btn.id === 'btn-en' && lang === 'en') btn.style.display = 'none';
            else if (btn.id === 'btn-tr' && lang === 'tr') btn.style.display = 'none';
            else btn.style.display = ''; 
        });
    });
}


function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.classList.remove('modal-open');
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
};
        document.getElementById('btn-tr').style.display = 'none';
        document.getElementById('btn-en').style.display = 'inline-block';
    } else {
        document.getElementById('btn-tr').style.display = 'inline-block';
        document.getElementById('btn-en').style.display = 'none';
    }

    document.querySelector('[data-key="cv-title"]').innerText = content['cv-title'];
    document.querySelector('[data-key="p1"]').innerHTML = content.p1;
    document.querySelector('[data-key="p2"]').innerHTML = content.p2;
    document.querySelector('[data-key="p3"]').innerHTML = content.p3;
    document.querySelector('[data-key="p4"]').innerHTML = content.p4;
    document.querySelector('[data-key="sig"]').innerText = content.sig;
    document.querySelector('[data-key="view-cv-btn"]').innerHTML = `<i class="fas fa-external-link-alt"></i> ${content['view-cv-btn']}`;
    
    // Alt kısımlar
    document.querySelector('.lang-download-btn').innerHTML = `<i class="fas fa-file-pdf"></i> ${content.down_btn || 'PDF'}`;
    document.querySelector('.qr-hint').innerText = content.qr_text;
}

window.onload = () => {
    // Tema kontrolü
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }

    // Dil kontrolü
    const savedLang = localStorage.getItem('selectedLang') || 'tr';
    changeLanguage(savedLang);
};

function downloadCV() {
    window.scrollTo(0, 0);
    
    const element = document.querySelector('.cv-wrapper');
    const buttons = document.querySelectorAll('.lang-switch-btn, .theme-btn, .download-section, .language-wrapper, .theme-wrapper');
    
    buttons.forEach(btn => btn.style.display = 'none');

const opt = {
    margin: 0,
    filename: 'Eda_Oncel_ÖNYAZI.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
        scale: 2, 
        useCORS: true,
        scrollY: 0,
        letterRendering: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { 
        mode: ['css', 'legacy'], 
        before: '.html2pdf__page-break',
        avoid: ['section', 'h2', '.item']
    }
};

    html2pdf().set(opt).from(element).save().then(() => {
        const lang = localStorage.getItem('selectedLang') || 'tr';
        buttons.forEach(btn => {
            if (btn.id === 'btn-en' && lang === 'en') btn.style.display = 'none';
            else if (btn.id === 'btn-tr' && lang === 'tr') btn.style.display = 'none';
            else btn.style.display = ''; 
        });
    });
}


function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}