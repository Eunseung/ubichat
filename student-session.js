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
    docs: 'student-desktop.html?view=docs',
    my: 'student-desktop.html?view=my'
  };

  function readSession() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? { ...defaultStudent, ...JSON.parse(saved) } : volatileSession;
    } catch (error) {
      return volatileSession;
    }
  }

  function signIn(student = {}) {
    const session = { ...defaultStudent, ...student };
    volatileSession = session;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(session));
    } catch (error) {
      // 목업은 저장소를 사용할 수 없는 환경에서도 현재 화면에서 동작합니다.
    }
    refreshHeaders();
    return session;
  }

  function signOut() {
    volatileSession = null;
    try {
      window.localStorage.removeItem(storageKey);
    } catch (error) {
      // 저장소 접근 실패 시에도 화면 상태는 새로 고칩니다.
    }
    refreshHeaders();
  }

  function currentPath() {
    const file = window.location.pathname.split('/').pop() || '기업용_배너_포함.html';
    return `${file}${window.location.search}${window.location.hash}`;
  }

  function loginHref(destination) {
    return `login.html?returnTo=${encodeURIComponent(destination || currentPath())}`;
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

  function refreshHeaders() {
    const student = readSession();
    const authenticated = Boolean(student);

    document.querySelectorAll('[data-student-nav]').forEach((link) => {
      const destination = destinations[link.dataset.studentNav] || destinations.chats;
      link.href = authenticated ? destination : loginHref(destination);
    });

    document.querySelectorAll('[data-student-login]').forEach((link) => {
      link.href = loginHref(destinations.chats);
      link.hidden = authenticated;
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
      window.location.href = '기업용_배너_포함.html';
      return;
    }

    const mobileTrigger = event.target.closest('[data-mobile-nav-trigger]');
    if (mobileTrigger) {
      const header = mobileTrigger.closest('[data-public-header]');
      const isOpen = header?.classList.toggle('is-mobile-menu-open');
      mobileTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      return;
    }

    if (!event.target.closest('[data-profile-menu]')) closeProfileMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProfileMenus();
      document.querySelectorAll('[data-public-header]').forEach((header) => header.classList.remove('is-mobile-menu-open'));
      document.querySelectorAll('[data-mobile-nav-trigger]').forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
    }
  });

  window.UniChatStudentSession = {
    get: readSession,
    signIn,
    signOut,
    isSignedIn: () => Boolean(readSession()),
    destinations,
    loginHref,
    refreshHeaders
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshHeaders);
  } else {
    refreshHeaders();
  }
}());
