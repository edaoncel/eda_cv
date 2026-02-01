function openModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.classList.remove('active');
        if (!document.querySelector('.modal.active')) {
            document.body.classList.remove('modal-open');
        }
        const iframe = targetModal.querySelector('iframe');
        if (iframe) { iframe.src = iframe.src; }
    }
}

async function changeLanguage(lang) {
    try {
        const response = await fetch('lang.json');
        const data = await response.json();
        const content = data[lang];

        // Temel İçerik Güncelleme
        document.querySelector('.cv-name').innerText = content.header_name;
        document.querySelector('.cv-title').innerText = content.header_title;
        document.querySelector('.lang-about-title').innerText = content.about_h2;
        document.querySelector('.lang-about-text').innerText = content.about_p;
        document.querySelector('.lang-edu-title').innerText = content.edu_h2;
        document.querySelector('.lang-edu-dept').innerText = content.edu_dept;
        document.querySelector('.lang-edu-pedagogy').innerText = content.edu_pedagogy;
        document.querySelector('.lang-exp-title').innerText = content.exp_h2;
        document.getElementById('exp-1').innerHTML = content.exp_1;
        document.getElementById('exp-2').innerHTML = content.exp_2;
        document.getElementById('exp-3').innerHTML = content.exp_3;
        document.getElementById('exp-4').innerHTML = content.exp_4;
        document.getElementById('exp-5').innerHTML = content.exp_5;
        document.querySelector('.lang-cert-title').innerText = content.cert_h2;
        document.querySelector('.lang-contact-title').innerText = content.contact_h2;
        document.querySelector('.lang-skills-title').innerText = content.skills_h2;
        document.querySelector('.lang-projects-title').innerText = content.projects_h2;
        document.querySelector('.lang-langs-title').innerText = content.lang_h2;
        document.querySelector('.lang-accounts-title').innerText = content.acc_h2;
        document.querySelector('.lang-en-level').innerText = content.lang_en_level;
        document.querySelector('.lang-skills-db').innerHTML = content.skills_db;
        document.querySelector('.lang-skills-ai').innerHTML = content.skills_ai;
        document.querySelector('.lang-view-cv-text').innerText = content["view-cv-btn"];

        // Proje Modalları
        document.querySelector('.lang-proj1-title').innerText = content.proj1_title;
        document.querySelector('.lang-proj2-title').innerText = content.proj2_title;
        document.querySelector('.lang-proj1-modal-title').innerText = content.proj1_modal_title;
        document.querySelector('.lang-proj1-desc').innerText = content.proj1_desc;
        document.querySelector('.lang-proj2-modal-title').innerText = content.proj2_modal_title;
        document.querySelector('.lang-proj2-desc').innerText = content.proj2_desc;
        
        
        // Butonlar ve Diğerleri
        document.querySelectorAll('.lang-github-text').forEach(btn => btn.innerHTML = content.github_text);
        document.querySelector('.lang-download-btn').innerHTML = content.download_btn;
        document.querySelector('.qr-hint').innerHTML = content.qr_code;

        document.getElementById('btn-en').style.display = lang === 'en' ? 'none' : 'inline-flex';
        document.getElementById('btn-tr').style.display = lang === 'tr' ? 'none' : 'inline-flex';

        localStorage.setItem('selectedLang', lang);
    } catch (e) { console.error("Dil yükleme hatası:", e); }
}

function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
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
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};