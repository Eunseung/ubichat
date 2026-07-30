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
  const photoDialog = document.querySelector('#photo-dialog');
  const photoDialogImage = document.querySelector('#photo-dialog-image');
  const photoDialogCaption = document.querySelector('#photo-dialog-caption');
  const galleryUpdates = [];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>&"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[character]));
  }

  function safeArray(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

  function listMarkup(values, emptyCopy) {
    const entries = safeArray(values).map((value) => String(value).trim()).filter(Boolean);
    if (!entries.length) return `<p class="detail-empty">${escapeHtml(emptyCopy)}</p>`;
    return `<ul class="detail-list">${entries.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>`;
  }

  function sanitizeRichText(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const template = document.createElement('template');
    template.innerHTML = raw;
    const allowedTags = new Set(['P', 'STRONG', 'B', 'UL', 'OL', 'LI', 'H2', 'H3', 'H4', 'BR', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD']);
    template.content.querySelectorAll('*').forEach((node) => {
      if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].includes(node.tagName)) {
        node.remove();
        return;
      }
      if (!allowedTags.has(node.tagName)) {
        node.replaceWith(...Array.from(node.childNodes));
        return;
      }
      Array.from(node.attributes).forEach((attribute) => node.removeAttribute(attribute.name));
    });
    return template.innerHTML.trim();
  }

  function normalizePhotos(value) {
    return safeArray(value).filter((photo) => photo && String(photo.src || '').trim());
  }

  function publicInfo() {
    const source = profile.profile.publicInfo || {};
    return {
      website: source.website || {},
      location: source.location || {},
      admissionSchedules: safeArray(source.admissionSchedules)
    };
  }

  function isSafeExternalUrl(value) {
    return /^https:\/\//i.test(String(value || '').trim());
  }

  function universityInfoMarkup() {
    const info = publicInfo();
    const websiteUrl = String(info.website.url || '').trim();
    const websiteLabel = String(info.website.label || '학교 홈페이지').trim() || '학교 홈페이지';
    const address = String(info.location.address || profile.location || '위치 정보 준비 중').trim();
    const mapQuery = String(info.location.mapQuery || `${profile.displayName} ${profile.location}`).trim();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
    const homepage = isSafeExternalUrl(websiteUrl)
      ? `<a class="detail-info-link" href="${escapeHtml(websiteUrl)}" target="_blank" rel="noopener">${escapeHtml(websiteLabel)} <span aria-hidden="true">↗</span></a>`
      : '<span class="detail-info-link is-disabled" aria-disabled="true">홈페이지 정보 준비 중</span>';
    return `<section class="detail-university-info" aria-labelledby="detail-university-info-title">
      <div class="detail-university-info-head">
        <div><h2 id="detail-university-info-title">대학 정보</h2><p>${escapeHtml(address)}</p></div>
        ${homepage}
      </div>
      <div class="detail-map-frame">
        <iframe title="${escapeHtml(profile.displayName)} 위치 지도" src="${escapeHtml(mapEmbedUrl)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <a class="detail-map-link" href="${escapeHtml(mapUrl)}" target="_blank" rel="noopener">Google 지도에서 보기 <span aria-hidden="true">↗</span></a>
    </section>`;
  }

  function dateFromIso(value) {
    const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function isoDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function normalizeAdmissionSchedules() {
    return publicInfo().admissionSchedules
      .map((schedule) => {
        const start = dateFromIso(schedule.startAt);
        const end = dateFromIso(schedule.endAt) || start;
        if (!start || !end || end < start) return null;
        return {
          id: String(schedule.id || `${isoDate(start)}-${schedule.title || 'schedule'}`),
          type: String(schedule.type || 'other'),
          start,
          end,
          title: String(schedule.title || '입학 일정').trim(),
          description: String(schedule.description || '').trim()
        };
      })
      .filter(Boolean)
      .sort((left, right) => left.start - right.start);
  }

  function scheduleTypeLabel(type) {
    return ({
      application: '원서 접수',
      documents: '서류 제출',
      'info-session': '입학설명회',
      scholarship: '장학금',
      result: '합격 발표',
      registration: '등록'
    }[type] || '입학 일정');
  }

  function admissionCalendarMarkup() {
    if (!normalizeAdmissionSchedules().length) return '<p class="detail-empty">게시된 입학 일정이 없습니다.</p>';
    return `<section class="admission-calendar" data-admission-calendar aria-label="입학 일정 캘린더">
      <div class="admission-calendar-head">
        <button type="button" data-admission-calendar-previous aria-label="이전 달">‹</button>
        <strong data-admission-calendar-month></strong>
        <button type="button" data-admission-calendar-next aria-label="다음 달">›</button>
      </div>
      <div class="admission-calendar-weekdays" aria-hidden="true"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div>
      <div class="admission-calendar-grid" data-admission-calendar-grid></div>
      <div class="admission-calendar-events" data-admission-calendar-events aria-live="polite"></div>
    </section>`;
  }

  function fallbackTabs() {
    return [
      {
        id: 'detail-intro',
        title: '상세 소개',
        content: `<p>${escapeHtml(profile.profile.intro || '대학 소개를 준비하고 있습니다.')}</p>`,
        order: 1,
        enabled: true
      },
      {
        id: 'departments',
        title: '학과 정보',
        content: listMarkup(profile.profile.programs, '등록된 학과 정보가 없습니다.'),
        order: 2,
        enabled: true
      },
      {
        id: 'admission-process',
        title: '지원 과정',
        content: '<p>전공별 입학 요건과 준비 서류는 상담을 통해 안내합니다.</p>',
        order: 3,
        enabled: true
      },
      {
        id: 'dormitory-intro',
        title: '기숙사',
        content: listMarkup(profile.profile.benefits, '등록된 기숙사 정보가 없습니다.'),
        order: 5,
        enabled: true,
        kind: 'dormitory'
      },
      {
        id: 'admission-materials',
        title: '입학 안내 자료',
        content: '<p>외국인 유학생 모집과 지원에 필요한 안내 자료를 확인하세요.</p>',
        order: 4,
        enabled: true,
        kind: 'admission-materials'
      },
      {
        id: 'admission-calendar',
        title: '입학 일정',
        content: '<p>외국인 유학생 모집과 입학 절차의 주요 일정을 확인하세요.</p>',
        order: 5,
        enabled: true,
        kind: 'admission-calendar'
      }
    ];
  }

  function normalizeTabs() {
    const configuredTabs = safeArray(profile.profile.tabs);
    const source = configuredTabs.length ? configuredTabs : fallbackTabs();
    const usedKeys = new Set();
    return source
      .filter((tab) => tab && tab.enabled !== false)
      .sort((left, right) => Number(left.order || 0) - Number(right.order || 0))
      .map((tab, index) => {
        const requestedKey = String(tab.id || `tab-${index + 1}`).replace(/[^a-zA-Z0-9_-]/g, '') || `tab-${index + 1}`;
        const key = usedKeys.has(requestedKey) ? `${requestedKey}-${index + 1}` : requestedKey;
        usedKeys.add(key);
        return {
          key,
          title: String(tab.title || '상세 정보').trim() || '상세 정보',
          content: sanitizeRichText(tab.content),
          kind: String(tab.kind || '').trim()
        };
      });
  }

  function galleryMarkup(galleryKey, photos, heading, emptyCopy) {
    if (!photos.length) return `<h2>${escapeHtml(heading)}</h2><p class="detail-empty">${escapeHtml(emptyCopy)}</p>`;
    return `<h2>${escapeHtml(heading)}</h2>
      <div class="detail-gallery-shell">
        <div class="detail-gallery" id="${escapeHtml(galleryKey)}-gallery" aria-label="${escapeHtml(heading)}">
          ${photos.map((photo, index) => {
            const alt = String(photo.alt || `${profile.displayName} ${heading}`).trim();
            return `<button class="detail-gallery-item" type="button" data-gallery-photo="${escapeHtml(galleryKey)}" data-photo-index="${index}" aria-label="${escapeHtml(alt)} 상세 보기"><img src="${escapeHtml(photo.src)}" alt="${escapeHtml(alt)}"></button>`;
          }).join('')}
        </div>
        <div class="detail-gallery-controls" id="${escapeHtml(galleryKey)}-gallery-controls" aria-label="${escapeHtml(heading)} 이동" hidden>
          <button type="button" data-gallery-previous="${escapeHtml(galleryKey)}" aria-label="이전 사진" aria-controls="${escapeHtml(galleryKey)}-gallery">←</button>
          <button type="button" data-gallery-next="${escapeHtml(galleryKey)}" aria-label="다음 사진" aria-controls="${escapeHtml(galleryKey)}-gallery">→</button>
        </div>
      </div>`;
  }

  function brochureMarkup() {
    const brochures = safeArray(profile.profile.brochures);
    if (!brochures.length) return '<p class="detail-empty">등록된 입학 안내 자료가 없습니다.</p>';
    return `<div class="brochure-list">${brochures.map((brochure) => {
      const href = String(brochure.href || '').trim();
      const isAvailable = Boolean(href && !/^(javascript|data|vbscript):/i.test(href));
      const link = isAvailable
        ? `<a class="brochure-view" href="${escapeHtml(href)}" target="_blank" rel="noopener">보기</a>`
        : '<span class="brochure-view is-disabled" aria-disabled="true">보기</span>';
      return `<div class="brochure-card"><div class="brochure-icon" aria-hidden="true">▤</div><div class="brochure-copy"><b>${escapeHtml(brochure.title || '입학 안내 자료')}</b><span>${escapeHtml(brochure.description || '자료 정보를 준비하고 있습니다.')}</span></div>${link}</div>`;
    }).join('')}</div>`;
  }

  function tabPanelMarkup(tab) {
    const body = tab.content || '<p class="detail-empty">등록된 정보가 없습니다.</p>';
    const isIntroduction = tab.key === 'detail-intro';
    const isAdmissionMaterials = tab.kind === 'admission-materials' || tab.key === 'admission-materials';
    const isAdmissionCalendar = tab.kind === 'admission-calendar' || tab.key === 'admission-calendar';
    const isDormitory = tab.kind === 'dormitory' || tab.key === 'dormitory-intro';
    const tags = isIntroduction && profile.fields.length
      ? `<div class="detail-tags">${profile.fields.map((field) => `<span class="tag">${escapeHtml(field)}</span>`).join('')}</div>`
      : '';
    const introductionGallery = isIntroduction
      ? galleryMarkup('intro', normalizePhotos(profile.profile.photos), '소개 사진', '등록된 소개 사진이 없습니다.')
      : '';
    const admissionMaterials = isAdmissionMaterials ? brochureMarkup() : '';
    const universityInfo = isIntroduction ? universityInfoMarkup() : '';
    const admissionCalendar = isAdmissionCalendar ? admissionCalendarMarkup() : '';
    const dormitoryGallery = isDormitory
      ? galleryMarkup('dormitory', normalizePhotos(profile.profile.dormitoryPhotos), '기숙사 사진', '등록된 기숙사 사진이 없습니다.')
      : '';
    return `${body}${tags}${universityInfo}${introductionGallery}${admissionMaterials}${admissionCalendar}${dormitoryGallery}`;
  }

  function openPhotoDetail(photo, heading) {
    const alt = String(photo.alt || `${profile.displayName} ${heading}`).trim();
    photoDialogImage.src = photo.src;
    photoDialogImage.alt = alt;
    photoDialogCaption.textContent = alt;
    if (!photoDialog.open && typeof photoDialog.showModal === 'function') {
      photoDialog.showModal();
    } else if (!photoDialog.open) {
      photoDialog.setAttribute('open', '');
    }
  }

  function closePhotoDetail() {
    if (photoDialog.open && typeof photoDialog.close === 'function') {
      photoDialog.close();
    } else {
      photoDialog.removeAttribute('open');
    }
  }

  function setupGallery(galleryKey, photos, heading) {
    const gallery = document.querySelector(`#${galleryKey}-gallery`);
    const controls = document.querySelector(`#${galleryKey}-gallery-controls`);
    if (!gallery || !controls || !photos.length) return;
    const previous = controls.querySelector('[data-gallery-previous]');
    const next = controls.querySelector('[data-gallery-next]');
    const updateControls = () => {
      const maxScrollLeft = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const hasOverflow = maxScrollLeft > 2;
      controls.hidden = !hasOverflow;
      if (!hasOverflow) return;
      previous.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= maxScrollLeft - 2;
    };
    gallery.addEventListener('click', (event) => {
      const button = event.target.closest(`[data-gallery-photo="${galleryKey}"]`);
      if (!button) return;
      const photo = photos[Number(button.dataset.photoIndex)];
      if (photo) openPhotoDetail(photo, heading);
    });
    gallery.addEventListener('scroll', updateControls, { passive: true });
    previous.addEventListener('click', () => gallery.scrollBy({ left: -gallery.clientWidth * .8, behavior: 'smooth' }));
    next.addEventListener('click', () => gallery.scrollBy({ left: gallery.clientWidth * .8, behavior: 'smooth' }));
    if ('ResizeObserver' in window) {
      new ResizeObserver(updateControls).observe(gallery);
    } else {
      window.addEventListener('resize', updateControls);
    }
    galleryUpdates.push(updateControls);
    requestAnimationFrame(updateControls);
  }

  function setupAdmissionCalendar() {
    const calendar = document.querySelector('[data-admission-calendar]');
    if (!calendar) return;
    const schedules = normalizeAdmissionSchedules();
    const monthLabel = calendar.querySelector('[data-admission-calendar-month]');
    const grid = calendar.querySelector('[data-admission-calendar-grid]');
    const eventList = calendar.querySelector('[data-admission-calendar-events]');
    const previous = calendar.querySelector('[data-admission-calendar-previous]');
    const next = calendar.querySelector('[data-admission-calendar-next]');
    const today = new Date();
    const todayIso = isoDate(today);
    const firstUpcoming = schedules.find((schedule) => schedule.end >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) || schedules[0];
    let month = new Date(firstUpcoming.start.getFullYear(), firstUpcoming.start.getMonth(), 1);
    let selectedDate = isoDate(firstUpcoming.start);

    const scheduleOn = (date) => {
      const target = date.getTime();
      return schedules.filter((schedule) => target >= schedule.start.getTime() && target <= schedule.end.getTime());
    };
    const formatRange = (schedule) => {
      const start = `${schedule.start.getMonth() + 1}.${schedule.start.getDate()}`;
      const end = `${schedule.end.getMonth() + 1}.${schedule.end.getDate()}`;
      return start === end ? start : `${start}–${end}`;
    };
    const renderEvents = () => {
      const selected = dateFromIso(selectedDate);
      const items = selected ? scheduleOn(selected) : [];
      const dateLabel = selected ? `${selected.getMonth() + 1}월 ${selected.getDate()}일` : '선택한 날짜';
      if (!items.length) {
        eventList.innerHTML = `<p class="detail-empty">${dateLabel}에 예정된 입학 일정이 없습니다.</p>`;
        return;
      }
      eventList.innerHTML = `<p class="admission-calendar-selected">${escapeHtml(dateLabel)} 일정</p>${items.map((schedule) => `<article class="admission-calendar-event"><span>${escapeHtml(scheduleTypeLabel(schedule.type))}</span><div><b>${escapeHtml(schedule.title)}</b><small>${escapeHtml(formatRange(schedule))}</small>${schedule.description ? `<p>${escapeHtml(schedule.description)}</p>` : ''}</div></article>`).join('')}`;
    };
    const renderMonth = () => {
      const year = month.getFullYear();
      const monthIndex = month.getMonth();
      const firstDay = new Date(year, monthIndex, 1);
      const leadingDays = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      monthLabel.textContent = `${year}년 ${monthIndex + 1}월`;
      const days = [];
      for (let index = 0; index < leadingDays; index += 1) days.push('<span class="admission-calendar-blank" aria-hidden="true"></span>');
      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, monthIndex, day);
        const key = isoDate(date);
        const count = scheduleOn(date).length;
        const classes = ['admission-calendar-day'];
        if (key === selectedDate) classes.push('is-selected');
        if (key === todayIso) classes.push('is-today');
        if (count) classes.push('has-event');
        const eventSuffix = count ? `, 입학 일정 ${count}개` : '';
        days.push(`<button class="${classes.join(' ')}" type="button" data-admission-calendar-date="${key}" aria-pressed="${key === selectedDate}" aria-label="${monthIndex + 1}월 ${day}일${eventSuffix}"><span>${day}</span>${count ? '<i aria-hidden="true"></i>' : ''}</button>`);
      }
      grid.innerHTML = days.join('');
      renderEvents();
    };
    const selectFirstDateInMonth = () => {
      const firstEvent = schedules.find((schedule) => schedule.start.getFullYear() === month.getFullYear() && schedule.start.getMonth() === month.getMonth());
      selectedDate = firstEvent ? isoDate(firstEvent.start) : isoDate(new Date(month.getFullYear(), month.getMonth(), 1));
    };
    calendar.addEventListener('click', (event) => {
      const dateButton = event.target.closest('[data-admission-calendar-date]');
      if (!dateButton) return;
      selectedDate = dateButton.dataset.admissionCalendarDate;
      renderMonth();
    });
    previous.addEventListener('click', () => {
      month = new Date(month.getFullYear(), month.getMonth() - 1, 1);
      selectFirstDateInMonth();
      renderMonth();
    });
    next.addEventListener('click', () => {
      month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
      selectFirstDateInMonth();
      renderMonth();
    });
    renderMonth();
  }

  const detailTabs = normalizeTabs();
  const tabList = document.querySelector('#detail-tabs');
  const tabPanels = document.querySelector('#detail-tab-panels');
  tabList.innerHTML = detailTabs.length
    ? detailTabs.map((tab, index) => `<button class="${index === 0 ? 'on' : ''}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="detail-panel-${escapeHtml(tab.key)}" id="detail-tab-${escapeHtml(tab.key)}" data-detail-tab="${escapeHtml(tab.key)}" tabindex="${index === 0 ? '0' : '-1'}">${escapeHtml(tab.title)}</button>`).join('')
    : '<span class="detail-tabs-empty">공개된 상세 정보가 없습니다.</span>';
  tabPanels.innerHTML = detailTabs.length
    ? detailTabs.map((tab, index) => `<section class="detail-tab-panel" role="tabpanel" id="detail-panel-${escapeHtml(tab.key)}" aria-labelledby="detail-tab-${escapeHtml(tab.key)}" data-detail-panel="${escapeHtml(tab.key)}"${index === 0 ? '' : ' hidden'}>${tabPanelMarkup(tab)}</section>`).join('')
    : '<section class="detail-tab-panel"><p class="detail-empty">대학이 공개한 상세 정보를 준비하고 있습니다.</p></section>';

  const renderedTabs = Array.from(tabList.querySelectorAll('[data-detail-tab]'));
  const renderedPanels = Array.from(tabPanels.querySelectorAll('[data-detail-panel]'));
  function selectDetailTab(key) {
    renderedTabs.forEach((tab) => {
      const selected = tab.dataset.detailTab === key;
      tab.classList.toggle('on', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    renderedPanels.forEach((panel) => { panel.hidden = panel.dataset.detailPanel !== key; });
    requestAnimationFrame(() => galleryUpdates.forEach((update) => update()));
  }
  renderedTabs.forEach((tab) => {
    tab.addEventListener('click', () => selectDetailTab(tab.dataset.detailTab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = renderedTabs.indexOf(tab);
      const nextIndex = event.key === 'Home' ? 0
        : event.key === 'End' ? renderedTabs.length - 1
          : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + renderedTabs.length) % renderedTabs.length;
      const nextTab = renderedTabs[nextIndex];
      selectDetailTab(nextTab.dataset.detailTab);
      nextTab.focus();
    });
  });

  setupGallery('intro', normalizePhotos(profile.profile.photos), '소개 사진');
  setupGallery('dormitory', normalizePhotos(profile.profile.dormitoryPhotos), '기숙사 사진');
  setupAdmissionCalendar();
  document.querySelector('[data-photo-dialog-close]').addEventListener('click', closePhotoDetail);
  photoDialog.addEventListener('click', (event) => {
    if (event.target === photoDialog) closePhotoDetail();
  });

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
  document.querySelector('#cover-title').textContent = profile.profile.headline || '대학 정보를 준비하고 있습니다.';
  document.querySelector('#cover-subtitle').textContent = `${profile.displayName}에서 공개한 소개입니다.`;
  renderLogo();

  const cover = document.querySelector('.detail-cover');
  if (profile.visual.heroImage) {
    cover.style.backgroundImage = `linear-gradient(117deg, rgba(33,59,98,.88), rgba(57,114,177,.75)), url("${profile.visual.heroImage}")`;
    cover.style.backgroundPosition = 'center';
    cover.style.backgroundSize = 'cover';
  }

  const consultationCopyByStatus = {
    open: { status: '상담 운영 중' },
    offline: { status: '상담 운영시간 외', action: '현재는 상담 운영시간 외입니다' },
    paused: { status: '상담 일시 중지', action: '상담이 일시 중지되었습니다' }
  };
  const consultationCopy = consultationCopyByStatus[consultationStatus] || { status: '상담 준비 중', action: '상담 준비 중입니다' };
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

  window.addEventListener('unichat:gumi-publication-updated', (event) => {
    if (profile.universityId !== 'gumi') return;
    const detail = event.detail && typeof event.detail === 'object' ? event.detail : {};
    const updatedIds = Array.isArray(detail.affiliationIds) ? detail.affiliationIds : [];
    const updatedId = String(detail.affiliationId || '').trim();
    if (updatedId && updatedId !== profile.affiliationId) return;
    if (updatedIds.length && !updatedIds.includes(profile.affiliationId) && !updatedId) return;
    window.location.reload();
  });
}
