(function () {
  'use strict';

  const storageKey = 'unichat.student.session';
  const defaultStudent = {
    name: 'NAPAT',
    fullName: 'NAPAT SUKSAI',
    email: 'napat@example.com',
    avatar: '🇹🇭'
  };
  let volatileSession = null;
  const destinations = {
    chats: 'student-desktop.html?view=chats',
    notices: 'student-desktop.html?view=notices',
    docs: 'student-desktop.html?view=docs',
    my: 'student-desktop.html?view=my'
  };

  function availableStorages() {
    return ['localStorage', 'sessionStorage'].map((name) => {
      try {
        return window[name];
      } catch (error) {
        return null;
      }
    }).filter(Boolean);
  }

  function readSession() {
    for (const storage of availableStorages()) {
      try {
        const saved = storage.getItem(storageKey);
        if (saved) return { ...defaultStudent, ...JSON.parse(saved) };
      } catch (error) {
        // 일부 file:// 목업 환경은 localStorage 접근을 제한합니다.
      }
    }
    return volatileSession;
  }

  function signIn(student = {}) {
    const session = { ...defaultStudent, ...student };
    volatileSession = session;
    availableStorages().forEach((storage) => {
      try {
        storage.setItem(storageKey, JSON.stringify(session));
      } catch (error) {
        // 저장소 접근이 제한된 경우에도 현재 화면 세션은 유지합니다.
      }
    });
    refreshHeaders();
    return session;
  }

  function signOut() {
    volatileSession = null;
    availableStorages().forEach((storage) => {
      try {
        storage.removeItem(storageKey);
      } catch (error) {
        // 저장소 접근 실패 시에도 화면 상태는 새로 고칩니다.
      }
    });
    refreshHeaders();
  }

  function currentPath() {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    return `${file}${window.location.search}${window.location.hash}`;
  }

  function loginHref(destination) {
    return `login.html?returnTo=${encodeURIComponent(destination || currentPath())}`;
  }

  function withConsultationContext(destination) {
    const query = new URLSearchParams(window.location.search);
    const universityId = query.get('universityId');
    const affiliationId = query.get('affiliationId');
    if (!universityId || !affiliationId) return destination;
    const url = new URL(destination, window.location.href);
    url.searchParams.set('universityId', universityId);
    url.searchParams.set('affiliationId', affiliationId);
    return `${url.pathname.split('/').pop()}${url.search}${url.hash}`;
  }

  function closeProfileMenus(except) {
    document.querySelectorAll('[data-profile-dropdown]').forEach((menu) => {
      if (menu !== except) menu.hidden = true;
    });
    document.querySelectorAll('[data-profile-trigger]').forEach((trigger) => {
      const target = trigger.closest('[data-profile-menu]')?.querySelector('[data-profile-dropdown]');
      trigger.setAttribute('aria-expanded', target && !target.hidden ? 'true' : 'false');
    });
  }

  function ensureDesktopProfileLinks(menu) {
    const dropdown = menu.querySelector('[data-profile-dropdown]');
    if (!dropdown) return;
    const logout = dropdown.querySelector('[data-student-logout]');
    [...dropdown.querySelectorAll('[data-student-context="chats"], [data-student-context="notices"]')].forEach((item) => item.remove());
    const links = [
      { key: 'docs', label: '문서 보관함' },
      { key: 'my', label: '마이페이지' }
    ];

    links.forEach(({ key, label }) => {
      const href = destinations[key];
      let link = dropdown.querySelector(`[data-student-context="${key}"]`);
      if (!link) {
        link = [...dropdown.querySelectorAll('a')].find((candidate) => candidate.getAttribute('href') === href);
      }
      if (!link) {
        link = document.createElement('a');
        link.textContent = label;
        link.setAttribute('role', 'menuitem');
      }
      link.dataset.studentContext = key;
      link.href = href;
      dropdown.insertBefore(link, logout || null);
    });
  }

  function ensureMobileStudentMenu(header, index) {
    const nav = header.querySelector('.header-nav, .student-header-nav');
    if (!nav) return;
    if (!nav.id) nav.id = `unichat-mobile-menu-${index + 1}`;
    const trigger = header.querySelector('[data-mobile-nav-trigger]');
    trigger?.setAttribute('aria-controls', nav.id);

    let menu = nav.querySelector('[data-mobile-student-menu]');
    if (!menu) {
      menu = document.createElement('section');
      menu.className = 'mobile-student-menu';
      menu.setAttribute('data-mobile-student-menu', '');
      menu.setAttribute('aria-label', '학생 개인 메뉴');
      menu.innerHTML = `
        <div class="mobile-student-profile">
          <span class="mobile-student-avatar" data-profile-avatar aria-hidden="true">🇹🇭</span>
          <span class="mobile-student-identity">
            <strong data-profile-full-name>NAPAT SUKSAI</strong>
            <small data-profile-email>napat@example.com</small>
          </span>
        </div>
        <div class="mobile-student-links">
          <a data-student-context="docs" href="${destinations.docs}">문서 보관함</a>
          <a data-student-context="my" href="${destinations.my}">마이페이지</a>
          <button type="button" data-student-logout>로그아웃</button>
        </div>
      `;
    }
    menu.querySelectorAll('[data-student-context="notices"]').forEach((item) => item.remove());
    const mobileLanguage = nav.querySelector('[data-language-selector-placement="mobile"]');
    nav.insertBefore(menu, mobileLanguage || null);
  }

  function setActiveNavigation(key = '') {
    document.querySelectorAll('[data-student-page-nav]').forEach((link) => {
      const active = link.dataset.studentPageNav === key;
      link.toggleAttribute('aria-current', active);
      if (active) link.setAttribute('aria-current', 'page');
    });
  }

  function currentStudentNavigation() {
    const file = window.location.pathname.split('/').pop();
    if (file !== 'student-desktop.html') return '';
    const query = new URLSearchParams(window.location.search);
    const view = query.get('view');
    if (view === 'notices') return 'notices';
    if (view === 'chats' || (!view && query.get('universityId') && query.get('affiliationId'))) return 'chats';
    return '';
  }

  function closeMobileMenus() {
    document.querySelectorAll('[data-public-header]').forEach((header) => {
      header.classList.remove('is-mobile-menu-open');
    });
    document.querySelectorAll('[data-mobile-nav-trigger]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', '주 메뉴 열기');
    });
  }

  function refreshHeaders() {
    const student = readSession();
    const authenticated = Boolean(student);

    document.querySelectorAll('[data-public-header]').forEach((header, index) => {
      ensureMobileStudentMenu(header, index);
      header.classList.toggle('is-student-authenticated', authenticated);
    });

    document.querySelectorAll('[data-profile-menu]').forEach(ensureDesktopProfileLinks);

    document.querySelectorAll('[data-student-nav]').forEach((link) => {
      const destination = withConsultationContext(destinations[link.dataset.studentNav] || destinations.chats);
      link.href = authenticated ? destination : loginHref(destination);
      link.textContent = authenticated ? '내 상담' : '상담하기';
    });

    document.querySelectorAll('[data-student-login]').forEach((link) => {
      link.href = loginHref(destinations.chats);
      link.hidden = authenticated;
    });

    document.querySelectorAll('[data-student-context]').forEach((link) => {
      const destination = destinations[link.dataset.studentContext] || destinations.chats;
      link.href = withConsultationContext(destination);
    });

    document.querySelectorAll('[data-university-service]').forEach((link) => {
      link.hidden = authenticated;
    });

    document.querySelectorAll('[data-profile-menu]').forEach((menu) => {
      menu.hidden = !authenticated;
      const dropdown = menu.querySelector('[data-profile-dropdown]');
      if (dropdown) dropdown.hidden = true;
    });

    if (authenticated) {
      document.querySelectorAll('[data-profile-name]').forEach((node) => { node.textContent = student.name; });
      document.querySelectorAll('[data-profile-full-name]').forEach((node) => { node.textContent = student.fullName; });
      document.querySelectorAll('[data-profile-email]').forEach((node) => { node.textContent = student.email; });
      document.querySelectorAll('[data-profile-avatar]').forEach((node) => { node.textContent = student.avatar; });
    }

    document.querySelectorAll('[data-mobile-student-menu]').forEach((menu) => {
      menu.hidden = !authenticated;
    });

    setActiveNavigation(currentStudentNavigation());

    if (!authenticated) closeMobileMenus();
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-profile-trigger]');
    if (trigger) {
      const wrapper = trigger.closest('[data-profile-menu]');
      const dropdown = wrapper?.querySelector('[data-profile-dropdown]');
      if (!dropdown) return;
      const open = dropdown.hidden;
      closeProfileMenus(open ? dropdown : null);
      dropdown.hidden = !open;
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }

    const logout = event.target.closest('[data-student-logout]');
    if (logout) {
      event.preventDefault();
      signOut();
      window.location.href = 'index.html';
      return;
    }

    const mobileTrigger = event.target.closest('[data-mobile-nav-trigger]');
    if (mobileTrigger) {
      const header = mobileTrigger.closest('[data-public-header]');
      const isOpen = header?.classList.toggle('is-mobile-menu-open');
      mobileTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileTrigger.setAttribute('aria-label', isOpen ? '주 메뉴 닫기' : '주 메뉴 열기');
      return;
    }

    if (!event.target.closest('[data-profile-menu]')) closeProfileMenus();
    if (!event.target.closest('[data-public-header]')) closeMobileMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProfileMenus();
      closeMobileMenus();
    }
  });

  window.UniChatStudentSession = {
    get: readSession,
    signIn,
    signOut,
    isSignedIn: () => Boolean(readSession()),
    destinations,
    loginHref,
    setActiveNavigation,
    refreshHeaders
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshHeaders);
  } else {
    refreshHeaders();
  }
}());
