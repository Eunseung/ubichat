const detailQuery = new URLSearchParams(window.location.search);
const requestedUniversity = detailQuery.get('universityId') || detailQuery.get('university');
const requestedAffiliation = detailQuery.get('affiliationId');
const profile = window.UniChatPublicUniversityPrototype?.resolve(requestedUniversity, requestedAffiliation);

if (!profile) {
  window.location.replace('university-explore.html');
} else {
  const detailBack = document.querySelector('#detail-back');
  detailBack.addEventListener('click', (event) => {
    if (window.history.length < 2) return;
    event.preventDefault();
    window.history.back();
  });

  const consultationStatus = String(profile.consultation.status || '').trim().toLowerCase();
  const consultationOpen = consultationStatus === 'open';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>&"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[character]));
  }

  function renderTextList(target, values, emptyCopy) {
    if (!values.length) {
      target.innerHTML = `<p class="detail-empty">${escapeHtml(emptyCopy)}</p>`;
      return;
    }
    target.innerHTML = `<ul class="detail-list">${values.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>`;
  }

  function renderLogo() {
    const mark = document.querySelector('#detail-mark');
    const fallback = profile.visual.initials || 'UC';
    if (!profile.visual.logo) {
      mark.textContent = fallback;
      return;
    }
    const image = document.createElement('img');
    image.src = profile.visual.logo;
    image.alt = `${profile.displayName} 로고`;
    image.addEventListener('error', () => { mark.textContent = fallback; });
    mark.replaceChildren(image);
  }

  document.title = `UBIChat | ${profile.displayName} 소개`;
  document.querySelector('#university-name').textContent = profile.displayName;
  document.querySelector('#university-meta').textContent = `${profile.location} · ${profile.universityNameEn}`;
  document.querySelector('#response-time').textContent = profile.consultation.responseLabel;
  document.querySelector('#university-intro').textContent = profile.profile.intro;
  document.querySelector('#cover-title').textContent = profile.profile.headline || '대학 정보를 준비하고 있습니다.';
  document.querySelector('#cover-subtitle').textContent = `${profile.displayName}에서 공개한 소개입니다.`;
  document.querySelector('#university-tags').innerHTML = profile.fields.map((field) => `<span class="tag">${escapeHtml(field)}</span>`).join('');
  renderLogo();

  const cover = document.querySelector('.detail-cover');
  if (profile.visual.heroImage) {
    cover.style.backgroundImage = `linear-gradient(117deg, rgba(33,59,98,.88), rgba(57,114,177,.75)), url("${profile.visual.heroImage}")`;
    cover.style.backgroundPosition = 'center';
    cover.style.backgroundSize = 'cover';
  }

  renderTextList(document.querySelector('#programs-list'), profile.profile.programs, '등록된 학과·지원 과정이 없습니다.');
  renderTextList(document.querySelector('#benefits-list'), profile.profile.benefits, '등록된 기숙사·장학금 정보가 없습니다.');

  const gallery = document.querySelector('#detail-gallery');
  const galleryControls = document.querySelector('#detail-gallery-controls');
  const galleryPrevious = document.querySelector('#detail-gallery-prev');
  const galleryNext = document.querySelector('#detail-gallery-next');
  const photoDialog = document.querySelector('#photo-dialog');
  const photoDialogImage = document.querySelector('#photo-dialog-image');
  const photoDialogCaption = document.querySelector('#photo-dialog-caption');

  function updateGalleryControls() {
    const maxScrollLeft = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
    const hasOverflow = maxScrollLeft > 2;
    galleryControls.hidden = !hasOverflow;
    if (!hasOverflow) return;
    galleryPrevious.disabled = gallery.scrollLeft <= 2;
    galleryNext.disabled = gallery.scrollLeft >= maxScrollLeft - 2;
  }

  function openPhotoDetail(photo) {
    const alt = photo.alt || `${profile.displayName} 소개 사진`;
    photoDialogImage.src = photo.src;
    photoDialogImage.alt = alt;
    photoDialogCaption.textContent = alt;
    if (typeof photoDialog.showModal === 'function') {
      photoDialog.showModal();
    } else {
      photoDialog.setAttribute('open', '');
    }
  }

  function closePhotoDetail() {
    if (typeof photoDialog.close === 'function') {
      photoDialog.close();
    } else {
      photoDialog.removeAttribute('open');
    }
  }

  if (profile.profile.photos.length) {
    gallery.innerHTML = profile.profile.photos.map((photo, index) => {
      const alt = photo.alt || `${profile.displayName} 소개 사진`;
      return `<button class="detail-gallery-item" type="button" data-photo-index="${index}" aria-label="${escapeHtml(alt)} 상세 보기"><img src="${escapeHtml(photo.src)}" alt="${escapeHtml(alt)}"></button>`;
    }).join('');
    gallery.addEventListener('click', (event) => {
      const button = event.target.closest('[data-photo-index]');
      if (!button) return;
      const photo = profile.profile.photos[Number(button.dataset.photoIndex)];
      if (photo) openPhotoDetail(photo);
    });
    gallery.addEventListener('scroll', updateGalleryControls, { passive: true });
    galleryPrevious.addEventListener('click', () => gallery.scrollBy({ left: -gallery.clientWidth * .8, behavior: 'smooth' }));
    galleryNext.addEventListener('click', () => gallery.scrollBy({ left: gallery.clientWidth * .8, behavior: 'smooth' }));
    if ('ResizeObserver' in window) {
      new ResizeObserver(updateGalleryControls).observe(gallery);
    } else {
      window.addEventListener('resize', updateGalleryControls);
    }
    requestAnimationFrame(updateGalleryControls);
  } else {
    gallery.innerHTML = '<p class="detail-empty">등록된 소개 사진이 없습니다.</p>';
    galleryControls.hidden = true;
  }

  document.querySelector('[data-photo-dialog-close]').addEventListener('click', closePhotoDetail);
  photoDialog.addEventListener('click', (event) => {
    if (event.target === photoDialog) closePhotoDetail();
  });

  const brochureList = document.querySelector('#brochure-list');
  if (profile.profile.brochures.length) {
    brochureList.innerHTML = profile.profile.brochures.map((brochure) => {
      const href = String(brochure.href || '').trim();
      const isAvailable = Boolean(href && href !== '#');
      const link = isAvailable
        ? `<a class="brochure-view" href="${escapeHtml(href)}" target="_blank" rel="noopener">보기</a>`
        : '<span class="brochure-view is-disabled" aria-disabled="true">보기</span>';
      return `<div class="brochure-card"><div class="brochure-icon" aria-hidden="true">▤</div><div class="brochure-copy"><b>${escapeHtml(brochure.title || '모집 브로셔')}</b><span>${escapeHtml(brochure.description || '브로셔 정보를 준비하고 있습니다.')}</span></div>${link}</div>`;
    }).join('');
  } else {
    brochureList.innerHTML = '<p class="detail-empty">등록된 모집 브로셔가 없습니다.</p>';
  }

  const consultationCopyByStatus = {
    open: { status: '상담 운영 중' },
    offline: { status: '상담 운영시간 외', action: '현재는 상담 운영시간 외입니다', note: profile.consultation.offlineMessage || '현재는 상담 운영시간이 아닙니다. 운영시간에 다시 상담을 시작해 주세요.' },
    paused: { status: '상담 일시 중지', action: '상담이 일시 중지되었습니다', note: profile.consultation.pausedMessage || '현재 신규 상담을 일시 중지했습니다. 잠시 후 다시 확인해 주세요.' }
  };
  const consultationCopy = consultationCopyByStatus[consultationStatus] || { status: '상담 준비 중', action: '상담 준비 중입니다', note: '대학의 상담 운영 정보가 준비되면 상담을 신청할 수 있습니다.' };

  document.querySelector('#consult-status').textContent = consultationCopy.status;
  document.querySelector('#consult-hours').textContent = profile.consultation.hours;
  document.querySelector('#consult-languages').textContent = profile.consultation.languages.join(' · ') || '상담 언어 준비 중';

  const consultationLink = document.querySelector('#consult-link');
  const studentSignedIn = Boolean(window.UniChatStudentSession?.isSignedIn());
  const destination = `student-desktop.html?universityId=${encodeURIComponent(profile.universityId)}&affiliationId=${encodeURIComponent(profile.affiliationId)}`;
  consultationLink.dataset.universityId = profile.universityId;
  consultationLink.dataset.affiliationId = profile.affiliationId;

  if (consultationOpen) {
    consultationLink.href = studentSignedIn
      ? destination
      : `login.html?role=student&universityId=${encodeURIComponent(profile.universityId)}&affiliationId=${encodeURIComponent(profile.affiliationId)}&returnTo=${encodeURIComponent(destination)}`;
    consultationLink.innerHTML = studentSignedIn
      ? '상담 시작하기 <span aria-hidden="true">→</span>'
      : '학생 로그인 후 상담하기 <span aria-hidden="true">→</span>';
  } else {
    consultationLink.removeAttribute('href');
    consultationLink.classList.add('is-disabled');
    consultationLink.setAttribute('aria-disabled', 'true');
    consultationLink.setAttribute('tabindex', '-1');
    consultationLink.textContent = consultationCopy.action;
  }

  const detailTabs = Array.from(document.querySelectorAll('[data-detail-tab]'));
  const detailPanels = Array.from(document.querySelectorAll('[data-detail-panel]'));
  function selectDetailTab(key) {
    detailTabs.forEach((tab) => {
      const selected = tab.dataset.detailTab === key;
      tab.classList.toggle('on', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    detailPanels.forEach((panel) => { panel.hidden = panel.dataset.detailPanel !== key; });
  }
  detailTabs.forEach((tab) => {
    tab.addEventListener('click', () => selectDetailTab(tab.dataset.detailTab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = detailTabs.indexOf(tab);
      const nextIndex = event.key === 'Home' ? 0
        : event.key === 'End' ? detailTabs.length - 1
          : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + detailTabs.length) % detailTabs.length;
      const nextTab = detailTabs[nextIndex];
      selectDetailTab(nextTab.dataset.detailTab);
      nextTab.focus();
    });
  });
}
