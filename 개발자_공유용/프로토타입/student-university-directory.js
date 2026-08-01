(function (global) {
  'use strict';

  const storageKey = 'unichat.mock.university-directory.v1';

  const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  };

  const getDirectory = () => global.UniversityDirectory || null;
  const getPublicUniversities = () => {
    const directory = getDirectory();
    if (!directory) return [];
    if (typeof directory.listPublic === 'function') return directory.listPublic();
    return (directory.all || []).filter((university) => university.publication?.status === 'published');
  };

  const normalize = (value) => String(value || '').trim().toLocaleLowerCase('ko');
  const matchesUniversity = (university, field, query) => {
    const matchesField = field === '전체' || (university.fields || []).includes(field);
    if (!matchesField) return false;

    const keyword = normalize(query);
    if (!keyword) return true;
    return [
      university.name?.ko,
      university.name?.en,
      university.location?.label,
      ...(university.fields || [])
    ].some((value) => normalize(value).includes(keyword));
  };

  const conversationStatus = (university, getStatus) => {
    if (typeof getStatus === 'function') return getStatus(university);
    return '대기';
  };

  // 공개 대학 정보는 언제나 볼 수 있지만, 새 상담은 대학이 운영 중일 때만
  // 시작합니다. 카드의 상태 도트는 현재 정책상 노출하지 않습니다.
  const getConsultationAvailability = (university) => {
    const consultation = university?.consultation || {};
    const status = String(consultation.status || '').trim().toLowerCase();
    if (status === 'open') {
      return { open: true, status: '상담 운영 중' };
    }
    if (status === 'offline') {
      return {
        open: false,
        status: '상담 운영시간 외',
        actionLabel: '현재는 상담 운영시간 외입니다',
        message: consultation.offlineMessage || '현재는 상담 운영시간이 아닙니다. 운영시간에 다시 상담을 시작해 주세요.'
      };
    }
    if (status === 'paused') {
      return {
        open: false,
        status: '상담 일시 중지',
        actionLabel: '상담이 일시 중지되었습니다',
        message: consultation.pausedMessage || '현재 신규 상담을 일시 중지했습니다. 잠시 후 다시 확인해 주세요.'
      };
    }
    return {
      open: false,
      status: '상담 준비 중',
      actionLabel: '상담 준비 중입니다',
      message: '대학의 상담 운영 정보가 준비되면 상담을 신청할 수 있습니다.'
    };
  };

  const createCard = (university, layout, status, onSelect) => {
    const card = createElement('article', 'ucard');
    card.dataset.universityId = university.id;
    card.dataset.field = (university.fields || []).join(' ');

    const logo = createElement('div', 'ulogo', university.visual?.initials || 'UC');
    const name = createElement('div', 'un', university.name?.ko || '대학명 미정');
    const meta = createElement('div', 'um', [university.location?.label, university.name?.en].filter(Boolean).join(' · '));
    const badges = createElement('div', 'badges');
    const response = createElement(
      'span',
      `rbadge${String(university.consultation?.responseLabel || '').includes('1일') ? ' slow' : ''}`,
      university.consultation?.responseLabel || '응답 시간 설정 필요'
    );
    badges.appendChild(response);
    (university.fields || []).forEach((field) => badges.appendChild(createElement('span', 'tbadge', field)));

    const detailButton = createElement('button', 'cta', '상세 보기');
    detailButton.type = 'button';
    const select = () => onSelect(university, status);
    card.addEventListener('click', select);
    detailButton.addEventListener('click', (event) => {
      event.stopPropagation();
      select();
    });

    if (layout === 'desktop') {
      const top = createElement('div', 'top');
      const identity = createElement('div');
      identity.append(name, meta);
      top.append(logo, identity);
      card.append(top, badges, detailButton);
    } else {
      const body = createElement('div', 'ub');
      body.append(name, meta, badges);
      card.append(logo, body, detailButton);
    }

    return card;
  };

  const mount = ({ container, layout, searchInput, chips, getConversationStatus, onSelect }) => {
    if (!container || typeof onSelect !== 'function') return null;

    let activeField = '전체';
    let keyword = '';

    const render = () => {
      const universities = getPublicUniversities().filter((university) => matchesUniversity(university, activeField, keyword));
      container.replaceChildren();
      universities.forEach((university) => {
        const status = conversationStatus(university, getConversationStatus);
        container.appendChild(createCard(university, layout, status, onSelect));
      });
    };

    (chips || []).forEach((chip) => {
      chip.addEventListener('click', () => {
        activeField = chip.dataset.field || '전체';
        (chips || []).forEach((item) => item.classList.toggle('on', item === chip));
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        keyword = searchInput.value;
        render();
      });
    }

    global.addEventListener('storage', (event) => {
      const directory = getDirectory();
      if (event.key === (directory?.storageKey || storageKey)) {
        directory?.reload?.();
        render();
      }
    });
    global.addEventListener('unichat:universities-updated', render);

    render();
    return Object.freeze({ refresh: render });
  };

  const renderDetail = (target, universityId, options = {}) => {
    const university = getDirectory()?.getById?.(universityId);
    if (!target || !university) return false;
    const availability = getConsultationAvailability(university);

    target.replaceChildren();
    const banner = createElement('div', null, university.profile?.headline || '대학 소개');
    banner.style.cssText = options.compact
      ? 'height:116px;border-radius:10px;background:linear-gradient(135deg,#b9c8d8,#e8edf3);display:grid;place-items:center;color:#52606d;font-size:11px;text-align:center;padding:0 20px;'
      : 'height:165px;border-radius:10px;background:linear-gradient(135deg,#b9c8d8,#e8edf3);display:grid;place-items:center;color:#52606d;font-size:12px;text-align:center;padding:0 24px;';

    const identity = createElement('div');
    identity.style.cssText = options.compact
      ? 'display:flex;gap:10px;align-items:center;margin-top:-21px;padding:0 12px;'
      : 'display:flex;gap:12px;align-items:center;margin-top:-26px;padding:0 16px;';
    const logo = createElement('div', 'ulogo', university.visual?.initials || 'UC');
    logo.style.cssText = options.compact
      ? 'width:46px;height:46px;border:1px solid var(--line2);background:#fff;border-radius:12px;display:grid;place-items:center;font-size:21px;'
      : 'width:54px;height:54px;border:1px solid var(--line2);background:#fff;border-radius:13px;display:grid;place-items:center;font-size:24px;';
    const labels = createElement('div');
    const title = createElement('b', null, university.name?.ko || '대학명 미정');
    title.style.fontSize = options.compact ? '16px' : '19px';
    const meta = createElement('div', null, `${[university.location?.label, university.name?.en].filter(Boolean).join(' · ')} · 인증 대학`);
    meta.style.cssText = `font-size:${options.compact ? '11px' : '12px'};color:var(--ink2);`;
    labels.append(title, meta);
    identity.append(logo, labels);

    const intro = createElement('p', null, university.profile?.intro || '대학 소개 정보를 준비하고 있습니다.');
    intro.style.cssText = `font-size:${options.compact ? '12px' : '13px'};line-height:${options.compact ? '1.6' : '1.65'};`;
    const brochure = createElement('div', 'pickitem');
    brochure.style.cursor = 'default';
    brochure.append(createElement('span', 'di', '▤'));
    const brochureCopy = createElement('div');
    brochureCopy.append(
      createElement('div', 'dn', university.profile?.brochure?.title || '모집 브로셔'),
      createElement('div', 'dm', university.profile?.brochure?.description || (options.compact ? 'PDF · 모바일에서 바로 보기' : 'PDF · PC와 모바일에서 바로 보기'))
    );
    brochure.appendChild(brochureCopy);
    const notice = createElement(
      'p',
      null,
      availability.open
        ? '대학 카드를 눌러도 상담은 시작되지 않습니다. 내용을 확인한 뒤 상담을 신청하세요.'
        : availability.message
    );
    notice.style.cssText = `font-size:${options.compact ? '10.5px' : '11px'};color:var(--ink2);`;
    const action = createElement(
      'button',
      options.actionClass || 'btn btn-primary',
      availability.open ? (options.actionLabel || '상담하기') : availability.actionLabel
    );
    action.type = 'button';
    if (options.actionStyle) action.style.cssText = options.actionStyle;
    if (!availability.open) {
      action.disabled = true;
      action.setAttribute('aria-disabled', 'true');
      action.title = availability.message;
    }
    action.addEventListener('click', () => {
      if (availability.open) options.onAction?.(university);
    });

    target.append(banner, identity, intro, brochure, notice, action);
    return true;
  };

  global.UniChatStudentUniversityDirectory = Object.freeze({ mount, renderDetail, getConsultationAvailability });
})(window);
