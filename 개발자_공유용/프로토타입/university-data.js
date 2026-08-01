(function (global) {
  const defaultBrochure = {
    title: '2027 외국인 유학생 모집 브로셔',
    description: 'PDF · PC와 모바일에서 바로 보기',
    href: '#'
  };

  const createUniversity = ({
    id, ko, en, region, initials, fields, responseLabel,
    consultationStatus = 'open', publicationStatus = 'published', publicationReason = '', accountStatus = 'active', isDemo = false,
    headline, intro
  }) => ({
    id,
    name: { ko, en },
    location: { label: region },
    fields,
    visual: { initials, logo: null, heroImage: null },
    profile: {
      verified: true,
      headline,
      intro,
      brochure: { ...defaultBrochure }
    },
    publication: { status: publicationStatus, reason: publicationReason },
    consultation: {
      status: consultationStatus,
      responseLabel,
      hours: '평일 09:00–18:00 KST',
      languages: ['한국어', 'English'],
      offlineMessage: '현재는 상담 운영시간이 아닙니다. 운영시간에 다시 상담을 시작해 주세요.',
      pausedMessage: '현재 신규 상담을 일시 중지했습니다. 잠시 후 다시 확인해 주세요.'
    },
    account: { status: accountStatus },
    isDemo
  });

  const seedUniversities = [
    createUniversity({
      id: 'seojeong', ko: '서정대학교', en: 'Seojeong University', region: '경기 양주', initials: 'SJ',
      fields: ['요양보호', '육성형전문기술'], responseLabel: '보통 1시간 내 응답',
      headline: '외국인 유학생의 새로운 시작을 함께합니다',
      intro: '외국인 유학생의 한국 유학 준비를 입학부터 생활 안내까지 상담으로 돕습니다. 관심 분야와 입학 준비 과정이 궁금하다면 대학 담당자에게 직접 문의해 보세요.'
    }),
    createUniversity({
      id: 'hanyang-womens', ko: '한양여자대학교', en: 'Hanyang Women’s University', region: '서울', initials: 'HY',
      fields: ['기타'], responseLabel: '보통 30분 내 응답',
      headline: '전공 탐색부터 한국 생활까지 함께 준비합니다',
      intro: '학생의 전공 탐색과 한국 생활 적응을 돕는 상담을 운영합니다. 입학 준비부터 전공 선택까지 궁금한 점을 직접 문의해 보세요.'
    }),
    createUniversity({
      id: 'gumi', ko: '구미대학교', en: 'Gumi University', region: '경북 구미', initials: 'GM',
      fields: ['육성형전문기술'], responseLabel: '보통 2시간 내 응답',
      headline: '현장 중심의 전문기술 과정을 안내합니다',
      intro: '현장 중심의 전문기술 과정을 안내합니다. 입학 요건과 전공별 준비 사항을 상담으로 확인할 수 있습니다.'
    }),
    createUniversity({
      id: 'daegu-health', ko: '대구보건대학교', en: 'Daegu Health College', region: '대구', initials: 'DH',
      fields: ['요양보호'], responseLabel: '보통 1시간 내 응답',
      headline: '보건·요양 분야 유학을 준비하세요',
      intro: '보건·요양 분야 진학을 준비하는 유학생을 위해 입학과 학업 준비를 안내합니다.'
    }),
    createUniversity({
      id: 'donggang', ko: '동강대학교', en: 'Donggang University', region: '광주', initials: 'DG',
      fields: ['육성형전문기술'], responseLabel: '보통 3시간 내 응답',
      headline: '전문기술 분야 진학을 함께 준비합니다',
      intro: '전문기술 분야 진학을 위한 대학 과정과 입학 준비 정보를 상담으로 제공합니다.'
    }),
    createUniversity({
      id: 'dong-eui', ko: '동의과학대학교', en: 'Dong-Eui Institute of Technology', region: '부산', initials: 'DI',
      fields: ['요양보호', '육성형전문기술'], responseLabel: '보통 2시간 내 응답',
      headline: '다양한 전문기술과 보건 계열 과정을 소개합니다',
      intro: '다양한 전문기술과 보건 계열 과정에 관한 유학생 상담을 운영합니다.'
    }),
    createUniversity({
      id: 'yeonsung', ko: '연성대학교', en: 'Yeonsung University', region: '경기 안양', initials: 'YS',
      fields: ['기타'], responseLabel: '보통 1일 내 응답', consultationStatus: 'offline',
      headline: '다양한 전공과 한국 생활을 함께 준비합니다',
      intro: '다양한 전공 탐색과 한국 생활 적응을 위한 유학생 안내를 제공합니다.'
    }),
    createUniversity({
      id: 'mokpo-science', ko: '목포과학대학교', en: 'Mokpo Science University', region: '전남 목포', initials: 'MS',
      fields: ['기타'], responseLabel: '보통 1일 내 응답', consultationStatus: 'offline',
      headline: '유학생의 새로운 학업 여정을 안내합니다',
      intro: '전공 선택과 입학 준비, 한국 생활 정보를 유학생에게 안내합니다.'
    }),
    createUniversity({
      id: 'busan-womens', ko: '부산여자대학교', en: 'Busan Women’s College', region: '부산', initials: 'BW',
      fields: ['기타'], responseLabel: '보통 2시간 내 응답',
      headline: '부산에서 시작하는 유학 생활을 준비하세요',
      intro: '입학 준비부터 전공 탐색과 대학 생활까지 필요한 정보를 안내합니다.'
    }),
    createUniversity({
      id: 'busan-health', ko: '부산보건대학교', en: 'Busan Health College', region: '부산', initials: 'BH',
      fields: ['기타'], responseLabel: '보통 1시간 내 응답',
      headline: '보건 계열 유학 준비를 함께합니다',
      intro: '보건 분야에 관심 있는 유학생을 위해 학업과 입학 준비 정보를 제공합니다.'
    }),
    createUniversity({
      id: 'sahmyook-health', ko: '삼육보건대학교', en: 'Sahmyook Health University', region: '서울', initials: 'SH',
      fields: ['요양보호'], responseLabel: '보통 1시간 내 응답',
      headline: '보건·요양 분야의 진학 정보를 안내합니다',
      intro: '요양과 보건 계열에 관심 있는 유학생을 위해 전공과 입학 준비를 안내합니다.'
    }),
    createUniversity({
      id: 'sungwoon', ko: '성운대학교', en: 'SungWoon University', region: '경북 영천', initials: 'SW',
      fields: ['요양보호'], responseLabel: '보통 1일 내 응답', consultationStatus: 'offline',
      headline: '요양·보건 분야의 진학을 준비하세요',
      intro: '요양·보건 분야 진학을 준비하는 유학생을 위한 대학 과정과 입학 정보를 안내합니다.'
    }),
    createUniversity({
      id: 'jeonju-vision', ko: '전주비전대학교', en: 'Vision College of Jeonju', region: '전북 전주', initials: 'VJ',
      fields: ['뿌리산업'], responseLabel: '보통 2시간 내 응답',
      headline: '산업 현장과 연결된 전문교육 과정을 소개합니다',
      intro: '산업 현장과 연결된 전문교육 과정을 유학생에게 소개하고 상담합니다.'
    }),
    createUniversity({
      id: 'chunnam-techno', ko: '전남과학대학교', en: 'Chunnam Techno University', region: '전남 곡성', initials: 'CT',
      fields: ['육성형전문기술', '기타'], responseLabel: '보통 3시간 내 응답',
      headline: '현장 중심 전문기술 과정으로 진로를 준비하세요',
      intro: '산업과 연결된 전공 과정, 입학 준비, 유학 생활 정보를 안내합니다.'
    }),
    createUniversity({
      id: 'cheongam', ko: '청암대학교', en: 'Cheongam University', region: '전남 순천', initials: 'CA',
      fields: ['요양보호'], responseLabel: '보통 2시간 내 응답',
      headline: '요양·보건 분야의 유학을 함께 준비합니다',
      intro: '요양·보건 분야에 관심 있는 유학생을 위해 입학 준비와 대학 생활을 안내합니다.'
    }),
    createUniversity({
      id: 'korea-lift', ko: '한국승강기대학교', en: 'Korea Lift College', region: '경남 거창', initials: 'KL',
      fields: ['육성형전문기술'], responseLabel: '보통 1시간 내 응답',
      headline: '승강기와 전문기술 분야의 현장 교육을 소개합니다',
      intro: '승강기와 전문기술 분야의 현장 중심 교육과 입학 준비 과정을 안내합니다.'
    }),
    createUniversity({
      id: 'hanyeong', ko: '한영대학교', en: 'Hanyeong University', region: '전남 여수', initials: 'HY',
      fields: ['기타'], responseLabel: '보통 1일 내 응답', consultationStatus: 'offline',
      headline: '유학생의 학업과 진로 탐색을 지원합니다',
      intro: '입학 준비, 전공 탐색, 한국 생활 적응을 위한 정보를 유학생에게 제공합니다.'
    }),
    createUniversity({
      id: 'demo-garam-health', ko: '가람보건전문대학', en: 'Garam Health College', region: '경기 수원', initials: 'GH',
      fields: ['요양보호'], responseLabel: '응답 시간 설정 필요', consultationStatus: 'offline',
      publicationStatus: 'published', isDemo: true,
      headline: '보건 분야 유학 정보를 안내합니다',
      intro: '시연용 대학 데이터입니다. 보건 분야 유학과 상담 운영 정보를 안내합니다.'
    }),
    createUniversity({
      id: 'demo-daon-technology', ko: '다온기술전문대학', en: 'Daon Technology College', region: '충남 아산', initials: 'DT',
      fields: ['육성형전문기술'], responseLabel: '응답 시간 설정 필요', consultationStatus: 'offline',
      publicationStatus: 'published', isDemo: true,
      headline: '현장 중심 기술교육 과정을 준비하고 있습니다',
      intro: '시연용 대학 데이터입니다. 현장 중심 기술교육과 상담 운영 정보를 안내합니다.'
    }),
    createUniversity({
      id: 'demo-nuri-tourism', ko: '누리관광전문대학', en: 'Nuri Tourism College', region: '강원 춘천', initials: 'NT',
      fields: ['기타'], responseLabel: '응답 시간 설정 필요', consultationStatus: 'offline',
      publicationStatus: 'published', isDemo: true,
      headline: '관광 분야 유학 정보를 준비하고 있습니다',
      intro: '시연용 대학 데이터입니다. 관광 분야 유학과 상담 운영 정보를 안내합니다.'
    }),
    createUniversity({
      id: 'suncheon-jeil', ko: '순천제일대학교', en: 'Suncheon Jeil College', region: '전남 순천', initials: 'SJ',
      fields: ['뿌리산업', '기타'], responseLabel: '보통 2시간 내 응답',
      headline: '전문기술과 다양한 진로를 함께 탐색합니다',
      intro: '현장과 연결된 전문기술 과정과 다양한 진로 정보를 유학생에게 소개합니다.'
    })
  ].sort((first, second) => first.name.ko.localeCompare(second.name.ko, 'ko'));

  const STORAGE_KEY = 'unichat.mock.university-directory.v1';
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const normalize = (value) => String(value || '').trim().toLocaleLowerCase('ko');
  const sortUniversities = (records) => records.sort((first, second) => first.name.ko.localeCompare(second.name.ko, 'ko'));

  // Keep the mock data structurally complete even when a university is added from
  // the approval screen. In production this adapter will be replaced by the API.
  const hydrateUniversity = (value) => {
    const source = value && typeof value === 'object' ? clone(value) : {};
    const initial = createUniversity({
      id: String(source.id || `university-${Date.now()}`),
      ko: String(source.name?.ko || '대학 정보 준비 중'),
      en: String(source.name?.en || 'University information pending'),
      region: String(source.location?.label || '지역 정보 준비 중'),
      initials: String(source.visual?.initials || source.name?.ko?.slice(0, 2) || 'UC'),
      fields: Array.isArray(source.fields) && source.fields.length ? source.fields : ['기타'],
      responseLabel: String(source.consultation?.responseLabel || '응답 시간 설정 필요'),
      consultationStatus: source.consultation?.status || 'offline',
      publicationStatus: source.publication?.status || 'hidden',
      publicationReason: source.publication?.reason || '',
      accountStatus: source.account?.status || 'active',
      isDemo: Boolean(source.isDemo),
      headline: String(source.profile?.headline || '대학 소개를 준비하고 있습니다'),
      intro: String(source.profile?.intro || '대학 소개와 상담 운영 정보를 준비하고 있습니다.')
    });

    return {
      ...initial,
      ...source,
      id: initial.id,
      name: { ...initial.name, ...(source.name || {}) },
      location: { ...initial.location, ...(source.location || {}) },
      fields: Array.isArray(source.fields) && source.fields.length ? [...source.fields] : initial.fields,
      visual: { ...initial.visual, ...(source.visual || {}) },
      profile: {
        ...initial.profile,
        ...(source.profile || {}),
        brochure: { ...initial.profile.brochure, ...(source.profile?.brochure || {}) }
      },
      publication: { ...initial.publication, ...(source.publication || {}) },
      consultation: {
        ...initial.consultation,
        ...(source.consultation || {}),
        languages: Array.isArray(source.consultation?.languages) && source.consultation.languages.length
          ? [...source.consultation.languages]
          : initial.consultation.languages
      },
      account: { ...initial.account, ...(source.account || {}) }
    };
  };

  // D-017: 프로토타입에서는 모든 현재 대학을 공개한다. 실서비스에서는
  // 학교가 직접 정한 대학·소속구분의 published 상태만 사용한다.
  const publishForPrototype = (value) => {
    const university = hydrateUniversity(value);
    return {
      ...university,
      publication: { ...university.publication, status: 'published', reason: '' }
    };
  };

  const readStoredUniversities = () => {
    try {
      const stored = global.localStorage?.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : null;
      if (Array.isArray(parsed) && parsed.length) return sortUniversities(parsed.map(publishForPrototype));
    } catch (error) {
      // Local file previews can block storage. The seeded data remains usable.
    }
    return sortUniversities(seedUniversities.map(publishForPrototype));
  };

  let universities = readStoredUniversities();

  const emitUpdated = (detail) => {
    if (typeof global.dispatchEvent !== 'function' || typeof global.CustomEvent !== 'function') return;
    global.dispatchEvent(new global.CustomEvent('unichat:universities-updated', { detail }));
  };
  const persist = (detail) => {
    try {
      global.localStorage?.setItem(STORAGE_KEY, JSON.stringify(universities));
    } catch (error) {
      // The in-memory directory still supports a single preview session.
    }
    emitUpdated(detail);
  };
  const getById = (id) => {
    const university = universities.find((item) => item.id === String(id || ''));
    return university ? clone(university) : null;
  };
  const resolve = (value) => {
    const normalized = normalize(value);
    const university = universities.find((item) => (
      item.id === normalized ||
      normalize(item.name.ko) === normalized ||
      normalize(item.name.en) === normalized
    ));
    return university ? clone(university) : null;
  };
  const listAll = () => clone(universities);
  const listPublic = () => universities
    .filter((university) => university.publication.status === 'published')
    .map(clone);
  const update = (id, patch = {}) => {
    const index = universities.findIndex((university) => university.id === String(id || ''));
    if (index < 0) return null;
    const current = universities[index];
    const safePatch = patch && typeof patch === 'object' ? clone(patch) : {};
    universities[index] = publishForPrototype({
      ...current,
      ...safePatch,
      id: current.id,
      name: { ...current.name, ...(safePatch.name || {}) },
      location: { ...current.location, ...(safePatch.location || {}) },
      visual: { ...current.visual, ...(safePatch.visual || {}) },
      profile: {
        ...current.profile,
        ...(safePatch.profile || {}),
        brochure: { ...current.profile.brochure, ...(safePatch.profile?.brochure || {}) }
      },
      publication: { ...current.publication, ...(safePatch.publication || {}) },
      consultation: { ...current.consultation, ...(safePatch.consultation || {}) },
      account: { ...current.account, ...(safePatch.account || {}) }
    });
    sortUniversities(universities);
    persist({ type: 'update', id: current.id });
    return getById(current.id);
  };
  const add = (record) => {
    const university = publishForPrototype(record);
    if (!university.id || universities.some((item) => item.id === university.id)) return null;
    universities.push(university);
    sortUniversities(universities);
    persist({ type: 'add', id: university.id });
    return getById(university.id);
  };
  const reset = () => {
    universities = sortUniversities(seedUniversities.map(publishForPrototype));
    try {
      global.localStorage?.removeItem(STORAGE_KEY);
    } catch (error) {
      // Storage is optional for the static preview.
    }
    emitUpdated({ type: 'reset' });
    return listAll();
  };

  // A different preview tab can update localStorage. Refresh the in-memory view
  // so open public/operations screens redraw from the same mock source.
  if (typeof global.addEventListener === 'function') {
    global.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEY) return;
      universities = readStoredUniversities();
      emitUpdated({ type: 'storage-sync' });
    });
  }

  global.UniversityDirectory = Object.freeze({
    get all() { return listAll(); },
    listAll,
    getById,
    resolve,
    listPublic,
    update,
    add,
    reset,
    isConsultationOpen: (university) => university?.consultation?.status === 'open'
  });
})(window);
