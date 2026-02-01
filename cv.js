async function changeLanguage(lang) {
    // Seçilen dili tarayıcıya kaydet (Geri dönüşlerde ve PDF sonrası hatırlaması için)
    localStorage.setItem('selectedLang', lang);

    const response = await fetch('lang.json');
    const data = await response.json();
    const content = data[lang];

    // Dil butonlarının görünürlüğünü ayarla
    if (lang === 'tr') {
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