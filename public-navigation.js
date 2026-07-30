(() => {
  const noticesDestination = 'student-desktop.html?view=notices';

  const refreshNoticeLinks = () => {
    const signedIn = window.UniChatStudentSession?.isSignedIn?.() === true;
    const href = signedIn
      ? noticesDestination
      : `login.html?returnTo=${encodeURIComponent(noticesDestination)}`;

    document.querySelectorAll('[data-public-notice]').forEach((link) => {
      link.href = href;
    });
  };

  refreshNoticeLinks();
  window.addEventListener('storage', refreshNoticeLinks);
})();
