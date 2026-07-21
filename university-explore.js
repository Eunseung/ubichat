const descriptions = {
  전체: '대학의 응답 정보와 특화 분야를 확인하고, 나에게 맞는 학교를 둘러보세요.',
  요양보호: '요양·보건 계열 진학을 준비하는 학생이 살펴볼 수 있는 대학입니다.',
  육성형전문기술: '현장 중심의 전문기술 과정을 운영하는 대학을 살펴보세요.',
  뿌리산업: '산업 현장과 연결된 기술 분야의 대학을 살펴보세요.',
  기타: '다양한 진로 분야의 전문대학을 살펴보세요.'
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

function getMatchingUniversities() {
  const query = searchTerm.trim().toLocaleLowerCase('ko');
  return UniversityDirectory.listPublic().filter((university) => {
    const fieldMatches = selectedField === '전체' || university.fields.includes(selectedField);
    const searchable = [university.name.ko, university.name.en, university.location.label, ...university.fields].join(' ').toLocaleLowerCase('ko');
    return fieldMatches && (!query || searchable.includes(query));
  });
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
  const matching = getMatchingUniversities();
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  if (currentPage > pageCount) currentPage = pageCount;

  description.textContent = descriptions[selectedField];
  resultCount.textContent = `총 ${matching.length}개 대학`;

  if (!matching.length) {
    grid.innerHTML = '<div class="empty-state"><b>검색 결과가 없습니다.</b>다른 검색어 또는 관심 분야를 선택해 보세요.</div>';
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
