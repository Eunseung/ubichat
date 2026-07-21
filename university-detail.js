const detailQuery = new URLSearchParams(window.location.search);
const requestedUniversity = detailQuery.get('universityId') || detailQuery.get('university');
const profile = UniversityDirectory.resolve(requestedUniversity) || UniversityDirectory.getById('seojeong');
const consultationStatus = String(profile?.consultation?.status || '').trim().toLowerCase();
const consultationOpen = consultationStatus === 'open';

if (profile.publication.status !== 'published') {
  window.location.replace('university-explore.html');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[character]));
}

document.title = `UniChat | ${profile.name.ko} 소개`;
document.querySelector('#university-name').textContent = profile.name.ko;
document.querySelector('#university-meta').textContent = `${profile.location.label} · ${profile.name.en}`;
document.querySelector('#detail-mark').textContent = profile.visual.initials;
document.querySelector('#response-time').textContent = profile.consultation.responseLabel;
document.querySelector('#university-intro').textContent = profile.profile.intro;
document.querySelector('#cover-title').textContent = profile.profile.headline;
document.querySelector('#cover-subtitle').textContent = `${profile.name.ko}에서 공개 대학 탐색에 게시한 소개입니다.`;
document.querySelector('#university-tags').innerHTML = profile.fields.map((field) => `<span class="tag">${escapeHtml(field)}</span>`).join('');

const consultationCopyByStatus = {
  open: {
    status: '상담 운영 중'
  },
  offline: {
    status: '상담 운영시간 외',
    action: '현재는 상담 운영시간 외입니다',
    note: profile.consultation.offlineMessage || '현재는 상담 운영시간이 아닙니다. 운영시간에 다시 상담을 시작해 주세요.'
  },
  paused: {
    status: '상담 일시 중지',
    action: '상담이 일시 중지되었습니다',
    note: profile.consultation.pausedMessage || '현재 신규 상담을 일시 중지했습니다. 잠시 후 다시 확인해 주세요.'
  }
};
const consultationCopy = consultationCopyByStatus[consultationStatus] || {
  status: '상담 준비 중',
  action: '상담 준비 중입니다',
  note: '대학의 상담 운영 정보가 준비되면 상담을 신청할 수 있습니다.'
};

document.querySelector('#consult-status').textContent = consultationCopy.status;
document.querySelector('#consult-hours').textContent = profile.consultation.hours;
document.querySelector('#consult-languages').textContent = profile.consultation.languages.join(' · ');
document.querySelector('#brochure-title').textContent = profile.profile.brochure.title;
document.querySelector('#brochure-description').textContent = profile.profile.brochure.description;
const consultationLink = document.querySelector('#consult-link');
const consultationNote = document.querySelector('.detail-login-note');
const studentSignedIn = Boolean(window.UniChatStudentSession?.isSignedIn());
consultationLink.dataset.consultationStatus = consultationStatus || 'unknown';

if (consultationOpen) {
  consultationLink.href = studentSignedIn
    ? `student-desktop.html?universityId=${encodeURIComponent(profile.id)}`
    : `login.html?role=student&universityId=${encodeURIComponent(profile.id)}`;
  consultationLink.innerHTML = studentSignedIn
    ? '상담 시작하기 <span aria-hidden="true">→</span>'
    : '학생 로그인 후 상담하기 <span aria-hidden="true">→</span>';
  consultationNote.textContent = studentSignedIn
    ? '학생 계정으로 상담을 시작할 수 있습니다.'
    : '상담을 시작하려면 학생 계정으로 로그인해야 합니다.';
} else {
  consultationLink.removeAttribute('href');
  consultationLink.classList.add('is-disabled');
  consultationLink.setAttribute('aria-disabled', 'true');
  consultationLink.setAttribute('tabindex', '-1');
  consultationLink.textContent = consultationCopy.action;
  consultationNote.textContent = consultationCopy.note;
}
