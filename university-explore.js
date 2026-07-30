const descriptions = {
  전체: '공개된 소속구분별 대학 정보를 확인하고, 나에게 맞는 상담 단위를 둘러보세요.',
  요양보호: '요양·보건 계열 진학을 준비하는 학생이 살펴볼 수 있는 공개 소속구분입니다.',
  육성형전문기술: '현장 중심 전문기술 과정을 운영하는 공개 소속구분입니다.',
  뿌리산업: '산업 현장과 연결된 기술 분야의 공개 소속구분입니다.',
  기타: '다양한 진로 분야의 공개 소속구분입니다.'
};

const pageSize = 8;
let selectedField = '전체';
let searchTerm = '';
let currentPage = 1;

const grid = document.querySelector('#directory-grid');
const pagination = document.querySelector('#pagination');
const description = document.querySelector('#directory-description');
const resultCount = document.querySelector('#result-count');
const search = document.querySelector('#university-search');

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>&"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[character]));
}

function getMatchingAffiliations() {
  const query = searchTerm.trim().toLocaleLowerCase('ko');
  const cards = window.UniChatPublicUniversityPrototype?.listCards?.() || [];
  return cards.filter((card) => {
    const fieldMatches = selectedField === '전체' || card.fields.includes(selectedField);
    const searchable = [card.displayName, card.universityName, card.universityNameEn, card.location, ...card.fields].join(' ').toLocaleLowerCase('ko');
    return fieldMatches && (!query || searchable.includes(query));
  });
}

function cardMarkup(card) {
  const tags = card.fields.map((field) => `<span class="tag">${escapeHtml(field)}</span>`).join('');
  const response = card.consultation.responseLabel;
  const slowClass = response.includes('1일') ? ' slow' : '';
  const href = `university-detail.html?universityId=${encodeURIComponent(card.universityId)}&affiliationId=${encodeURIComponent(card.affiliationId)}`;

  return `
    <article class="university-card" data-university-id="${escapeHtml(card.universityId)}" data-affiliation-id="${escapeHtml(card.affiliationId)}">
      <div class="university-top">
        <div class="university-mark" aria-hidden="true">${escapeHtml(card.visual.initials)}</div>
        <div>
          <h3 class="university-name">${escapeHtml(card.displayName)}</h3>
          <p class="university-region">${escapeHtml(card.location)} · ${escapeHtml(card.universityNameEn)}</p>
        </div>
      </div>
      <div class="university-meta">
        <span class="response${slowClass}">${escapeHtml(response)}</span>
        ${tags}
      </div>
      <a class="button-quiet" href="${href}">대학 소개 보기 <span aria-hidden="true">→</span></a>
    </article>`;
}

function renderPagination(pageCount) {
  if (pageCount <= 1) {
    pagination.replaceChildren();
    pagination.hidden = true;
    return;
  }

  pagination.hidden = false;
  const controls = [
    `<button class="pagination-button" type="button" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="이전 페이지">←</button>`,
    ...Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1;
      return `<button class="pagination-button${page === currentPage ? ' active' : ''}" type="button" data-page="${page}" aria-current="${page === currentPage ? 'page' : 'false'}">${page}</button>`;
    }),
    `<button class="pagination-button" type="button" data-page="${currentPage + 1}" ${currentPage === pageCount ? 'disabled' : ''} aria-label="다음 페이지">→</button>`
  ];
  pagination.innerHTML = controls.join('');
}

function renderDirectory() {
  const matching = getMatchingAffiliations();
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  if (currentPage > pageCount) currentPage = pageCount;

  description.textContent = descriptions[selectedField];
  resultCount.textContent = `총 ${matching.length}개 공개 소속구분`;

  if (!matching.length) {
    grid.innerHTML = '<div class="empty-state"><b>공개된 대학 정보가 아직 없습니다.</b>다른 검색어 또는 관심 분야를 선택해 보세요.</div>';
    renderPagination(0);
    return;
  }

  const start = (currentPage - 1) * pageSize;
  grid.innerHTML = matching.slice(start, start + pageSize).map(cardMarkup).join('');
  renderPagination(pageCount);
}

document.querySelectorAll('.explore-pill').forEach((button) => {
  button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');
  button.addEventListener('click', () => {
    selectedField = button.dataset.field;
    currentPage = 1;
    document.querySelectorAll('.explore-pill').forEach((pill) => {
      const selected = pill === button;
      pill.classList.toggle('active', selected);
      pill.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    renderDirectory();
  });
});

search.addEventListener('input', () => {
  searchTerm = search.value;
  currentPage = 1;
  renderDirectory();
});

pagination.addEventListener('click', (event) => {
  const button = event.target.closest('[data-page]');
  if (!button || button.disabled) return;
  currentPage = Number(button.dataset.page);
  renderDirectory();
  grid.scrollIntoView({ block: 'start', behavior: 'smooth' });
});

renderDirectory();
window.addEventListener('unichat:universities-updated', renderDirectory);
