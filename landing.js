const fieldLabels = {
  전체: '지금 상담 가능한 전문대학',
  요양보호: '요양보호 분야 전문대학',
  육성형전문기술: '육성형 전문기술 분야 대학',
  뿌리산업: '뿌리산업 분야 전문대학',
  기타: '기타 분야 전문대학'
};

const descriptionLabels = {
  전체: '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.',
  요양보호: '요양·보건 계열 진학을 준비하는 학생이 상담할 수 있는 대학입니다.',
  육성형전문기술: '전문기술 분야 진학을 준비하는 학생이 상담할 수 있는 대학입니다.',
  뿌리산업: '산업 현장과 연결된 기술 분야를 살펴볼 수 있는 대학입니다.',
  기타: '다양한 진로를 준비하는 학생이 상담할 수 있는 대학입니다.'
};

const grid = document.querySelector('#university-grid');
const title = document.querySelector('#discover-title');
const description = document.querySelector('#discover-description');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[character]));
}

function cardMarkup(university) {
  const tags = university.fields.map((field) => `<span class="tag">${escapeHtml(field)}</span>`).join('');
  const response = university.consultation.responseLabel;
  const slowClass = response.includes('1일') ? ' slow' : '';
  // 상담 가능 상태 도트는 현재 비노출입니다.
  // 필요 시 아래 상태 계산과 카드의 active-dot 마크업을 함께 복구합니다.
  // const consultationOpen = UniversityDirectory.isConsultationOpen(university);
  // const statusClass = consultationOpen ? '' : ' off';
  // const statusLabel = consultationOpen ? '상담 운영 중' : '운영시간 확인 필요';

  return `
    <article class="university-card">
      <div class="university-top">
        <div class="university-mark" aria-hidden="true">${escapeHtml(university.visual.initials)}</div>
        <div>
          <h3 class="university-name">${escapeHtml(university.name.ko)}</h3>
          <p class="university-region">${escapeHtml(university.location.label)} · ${escapeHtml(university.name.en)}</p>
        </div>
      </div>
      <div class="university-meta">
        <span class="response${slowClass}">${escapeHtml(response)}</span>
        ${tags}
      </div>
      <a class="button-quiet" href="university-detail.html?universityId=${encodeURIComponent(university.id)}">대학 소개 보기 <span aria-hidden="true">→</span></a>
    </article>`;
}

function renderUniversities(field) {
  const universities = UniversityDirectory.listPublic();
  const matching = field === '전체'
    ? universities.slice(0, 8)
    : universities.filter((university) => university.fields.includes(field));

  title.textContent = fieldLabels[field];
  description.textContent = descriptionLabels[field];

  if (!matching.length) {
    grid.innerHTML = '<div class="empty-state"><b>곧 더 많은 대학을 소개할 예정입니다.</b>다른 관심 분야도 함께 둘러보세요.</div>';
    return;
  }

  grid.innerHTML = matching.map(cardMarkup).join('');
}

document.querySelectorAll('.explore-pill').forEach((button) => {
  button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
  button.addEventListener('click', () => {
    document.querySelectorAll('.explore-pill').forEach((pill) => {
      const selected = pill === button;
      pill.classList.toggle('active', selected);
      pill.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    renderUniversities(button.dataset.field);
  });
});

document.querySelectorAll('[data-toast]').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (element.tagName === 'A') event.preventDefault();
    showToast(element.dataset.toast);
  });
});

function initializeCarousel(carousel) {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-to]'));
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const interval = Number(carousel.dataset.autoplay) || 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let autoplayTimer;

  const setActiveSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const stopAutoplay = () => window.clearInterval(autoplayTimer);
  const startAutoplay = () => {
    stopAutoplay();
    if (interval > 0 && slides.length > 1 && !reduceMotion) {
      autoplayTimer = window.setInterval(() => setActiveSlide(activeIndex + 1), interval);
    }
  };

  previous?.addEventListener('click', () => {
    setActiveSlide(activeIndex - 1);
    startAutoplay();
  });
  next?.addEventListener('click', () => {
    setActiveSlide(activeIndex + 1);
    startAutoplay();
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setActiveSlide(Number(dot.dataset.carouselTo));
      startAutoplay();
    });
  });
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });

  setActiveSlide(activeIndex);
  startAutoplay();
}

function adSlideMarkup(slot, type, index, total) {
  const isActive = index === 0;
  const position = `${index + 1} / ${total}`;
  if (type === 'university') {
    const image = slot.asset
      ? `<img class="carousel-image" src="${escapeHtml(slot.asset)}" alt="${escapeHtml(slot.label || `${slot.advertiser} 대학 고객사 배너`)}">`
      : `<div class="asset-guide"><small>대학 고객사 · 광고</small><strong>${escapeHtml(slot.label || `${slot.advertiser} 배너 이미지`)}</strong><span>PC 1180 × 220px · 모바일 328 × 160px</span></div>`;
    return `<article class="carousel-slide${isActive ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${position}" aria-hidden="${isActive ? 'false' : 'true'}"><div class="sponsor-placeholder">${image}</div></article>`;
  }
  const template = ['finance', 'housing', 'telecom'].includes(slot.template) ? slot.template : 'finance';
  const image = slot.asset
    ? `<img class="carousel-image" src="${escapeHtml(slot.asset)}" alt="${escapeHtml(slot.label || `${slot.advertiser} 배너`)}">`
    : `<div class="asset-guide"><small>${escapeHtml(slot.advertiser)} · 광고</small><strong>${escapeHtml(slot.label || `${slot.category} 고객사 배너 이미지`)}</strong><span>PC 1180 × 220px · 모바일 328 × 160px</span></div>`;
  return `<article class="carousel-slide${isActive ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${position}" aria-hidden="${isActive ? 'false' : 'true'}"><div class="sponsor-placeholder corporate-${template}">${image}</div></article>`;
}

function mountAdCarousel(carousel) {
  const type = carousel.dataset.adCarousel;
  if (!window.UniChatAdSlots || !['university', 'corporate'].includes(type)) return;
  const slots = window.UniChatAdSlots.listActive(type);
  const viewport = carousel.querySelector('.carousel-viewport');
  if (!viewport) return;

  if (!slots.length) {
    viewport.innerHTML = '<article class="carousel-slide is-active" role="group" aria-roledescription="slide" aria-label="광고 준비 중"><div class="sponsor-placeholder"><div class="asset-guide"><small>광고 구좌</small><strong>새 배너를 준비하고 있습니다</strong><span>운영자가 공개한 광고만 이 영역에 노출됩니다.</span></div></div></article>';
    carousel.querySelector('.carousel-controls')?.remove();
    return;
  }

  viewport.innerHTML = slots.map((slot, index) => adSlideMarkup(slot, type, index, slots.length)).join('');
  const controlLabel = type === 'university' ? '대학 고객사 배너 제어' : '기업 제휴 광고 제어';
  const itemLabel = type === 'university' ? '배너 선택' : '기업 광고 선택';
  const dots = slots.map((slot, index) => `<button class="carousel-dot${index === 0 ? ' is-active' : ''}" type="button" data-carousel-to="${index}" aria-label="${escapeHtml(slot.advertiser)} 광고" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('');
  carousel.querySelector('.carousel-controls')?.remove();
  carousel.insertAdjacentHTML('beforeend', `<div class="carousel-controls" aria-label="${controlLabel}"><button class="carousel-arrow" type="button" data-carousel-prev aria-label="이전 배너">‹</button><div class="carousel-dots" aria-label="${itemLabel}">${dots}</div><button class="carousel-arrow" type="button" data-carousel-next aria-label="다음 배너">›</button></div>`);
}

function mountAllAdCarousels() {
  document.querySelectorAll('[data-ad-carousel]').forEach(mountAdCarousel);
}

mountAllAdCarousels();
document.querySelectorAll('[data-carousel]').forEach(initializeCarousel);
renderUniversities('전체');
window.addEventListener('unichat:universities-updated', () => {
  const selectedField = document.querySelector('.explore-pill.active')?.dataset.field || '전체';
  renderUniversities(selectedField);
});
window.addEventListener('unichat:ad-slots-updated', mountAllAdCarousels);
