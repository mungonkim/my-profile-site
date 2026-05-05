// ── 기본 콘텐츠 ──────────────────────────────────────────────
const DEFAULT_DATA = {
    hero: {
        greeting: '안녕하세요!',
        subtitle: '풀스택 개발자입니다',
        bio: '모던하고 사용자 중심의 웹 애플리케이션을 만드는 것을 좋아합니다. React, Node.js, 그리고 다양한 최신 기술들을 활용하여 매력적인 디지털 경험을 창출합니다.'
    },
    about: {
        heading: '저에 대해서',
        paragraphs: [
            '저는 웹 개발에 열정적인 풀스택 개발자입니다. 프론트엔드에서는 React와 Tailwind CSS를 사용하여 매력적인 UI를 만들고, 백엔드에서는 Node.js와 데이터베이스를 활용하여 견고한 서비스를 구축합니다.',
            '사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드 작성을 중요하게 여깁니다. 새로운 기술을 배우고 도전하는 것을 즐기며, 지속적으로 성장하고자 합니다.',
            '다양한 프로젝트 경험을 통해 문제 해결 능력과 팀 협업 능력을 갖추었습니다. 함께 멋진 무언가를 만들 수 있는 팀을 찾고 있습니다.'
        ]
    },
    skills: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Vue.js'],
        backend: ['Node.js', 'Express.js', 'MongoDB', 'Python', 'Git', 'REST API']
    },
    projects: [
        {
            title: '포트폴리오 웹사이트',
            description: '반응형 포트폴리오 웹사이트입니다. HTML, CSS, JavaScript를 사용하여 모던하고 깔끔한 디자인으로 제작했습니다.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            link: '#',
            gradient: 'from-blue-400 to-blue-600'
        },
        {
            title: '할일 관리 앱',
            description: 'React와 Node.js를 사용한 할일 관리 애플리케이션입니다. 실시간 데이터 동기화 및 사용자 인증 기능을 포함합니다.',
            tags: ['React', 'Node.js', 'MongoDB'],
            link: '#',
            gradient: 'from-purple-400 to-purple-600'
        },
        {
            title: '날씨 앱',
            description: 'React로 개발한 날씨 정보 애플리케이션입니다. 외부 API를 활용하여 실시간 날씨 데이터를 제공합니다.',
            tags: ['React', 'Axios', 'API'],
            link: '#',
            gradient: 'from-green-400 to-green-600'
        }
    ],
    contact: {
        tagline: '새로운 프로젝트에 참여하거나 협업할 기회가 있다면 언제든지 연락 주세요!',
        email: 'kmkmk94430228@gmail.com',
        github: { url: 'https://github.com', display: 'github.com/yourname' },
        linkedin: { url: 'https://linkedin.com', display: 'linkedin.com/in/yourname' }
    }
};

// ── 렌더링 ────────────────────────────────────────────────────
function renderPage(data) {
    // Hero
    document.getElementById('hero-greeting').textContent = data.hero.greeting;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-bio').textContent = data.hero.bio;

    // About
    document.getElementById('about-heading').textContent = data.about.heading;
    document.getElementById('about-p1').textContent = data.about.paragraphs[0];
    document.getElementById('about-p2').textContent = data.about.paragraphs[1];
    document.getElementById('about-p3').textContent = data.about.paragraphs[2];

    // Skills
    renderSkills(data.skills.frontend, 'skills-frontend');
    renderSkills(data.skills.backend, 'skills-backend');

    // Projects
    renderProjects(data.projects);

    // Contact
    document.getElementById('contact-tagline').textContent = data.contact.tagline;

    const emailEl = document.getElementById('contact-email');
    emailEl.textContent = data.contact.email;
    emailEl.href = 'mailto:' + data.contact.email;

    const githubEl = document.getElementById('contact-github');
    githubEl.textContent = data.contact.github.display;
    githubEl.href = data.contact.github.url;

    const linkedinEl = document.getElementById('contact-linkedin');
    linkedinEl.textContent = data.contact.linkedin.display;
    linkedinEl.href = data.contact.linkedin.url;

    document.getElementById('contact-email-btn').href = 'mailto:' + data.contact.email;
}

const PROJECT_ICONS = [
    '<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z">',
    '<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2 4 4 0 00-4 4v10a4 4 0 004 4h12a4 4 0 004-4V5a4 4 0 00-4-4 1 1 0 000 2 2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd">',
    '<path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 115.5 17zM7 9.5a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd">'
];

function renderSkills(list, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    list.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag bg-purple-100 text-purple-900 px-4 py-2 rounded-full font-medium';
        span.textContent = skill;
        container.appendChild(span);
    });
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    projects.forEach((proj, idx) => {
        const iconPath = PROJECT_ICONS[idx % PROJECT_ICONS.length];
        const tagsHtml = proj.tags.map(t =>
            `<span class="text-sm bg-purple-100 text-purple-900 px-3 py-1 rounded-full">${escHtml(t)}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'project-card bg-white rounded-lg overflow-hidden border border-gray-200 shadow-xl';
        card.innerHTML = `
            <div class="bg-gradient-to-br ${escHtml(proj.gradient)} h-48 flex items-center justify-center">
                <svg class="w-24 h-24 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    ${iconPath}
                </svg>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${escHtml(proj.title)}</h3>
                <p class="text-gray-600 mb-4">${escHtml(proj.description)}</p>
                <div class="flex flex-wrap gap-2 mb-4">${tagsHtml}</div>
                <a href="${escHtml(proj.link)}" class="inline-block text-purple-500 font-semibold hover:text-purple-600 transition">더 보기 →</a>
            </div>`;
        grid.appendChild(card);
    });
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── 네비게이션 ────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ── 초기 렌더 ─────────────────────────────────────────────────
const currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));
renderPage(currentData);
