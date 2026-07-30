(function (global) {
  'use strict';

  // D-026의 기본 공개 fixture입니다. 구미 직접 게시 스냅샷은 읽기 시점에 이 값보다 우선합니다.
  // 학교 운영 UI 상태는 읽지 않고, 계약상 허용된 게시 스냅샷만 소비합니다.
  const gumiAssetBase = 'squads/university/prototype-assets/gumi/';
  const gumiVisual = Object.freeze({
    logo: `${gumiAssetBase}gumi-logo.svg`,
    heroImage: `${gumiAssetBase}gumi-campus-hero.jpeg`
  });
  const gumiPhotos = Object.freeze([
    { src: `${gumiAssetBase}gumi-campus-cover.jpg`, alt: '구미대학교 캠퍼스 전경' },
    { src: `${gumiAssetBase}gumi-campus-01.jpeg`, alt: '구미대학교 캠퍼스' },
    { src: `${gumiAssetBase}gumi-campus-02.jpeg`, alt: '구미대학교 교육 시설' },
    { src: `${gumiAssetBase}gumi-campus-03.jpeg`, alt: '구미대학교 캠퍼스 생활' },
    { src: `${gumiAssetBase}gumi-campus-04.jpeg`, alt: '구미대학교 캠퍼스 안내' }
  ]);
  const gumiBrochures = Object.freeze([
    {
      title: '2027 외국인 유학생 모집 브로셔',
      description: 'PDF · PC와 모바일에서 바로 보기',
      href: `${gumiAssetBase}gumi-brochure.pdf`
    }
  ]);
  const gumiPublicInfo = Object.freeze({
    website: {
      url: 'https://www.gumi.ac.kr/',
      label: '구미대학교 홈페이지'
    },
    location: {
      address: '경북 구미 · 구미대학교 캠퍼스',
      mapQuery: '구미대학교 경북 구미'
    },
    admissionSchedules: [
      {
        id: 'gumi-2027-application',
        type: 'application',
        startAt: '2026-08-10',
        endAt: '2026-08-23',
        title: '2027학년도 외국인 유학생 원서 접수',
        description: '온라인 원서와 기본 제출 서류를 접수합니다.'
      },
      {
        id: 'gumi-2027-documents',
        type: 'documents',
        startAt: '2026-08-28',
        title: '1차 서류 제출 마감',
        description: '번역본을 포함한 입학 서류를 제출해 주세요.'
      },
      {
        id: 'gumi-2027-session',
        type: 'info-session',
        startAt: '2026-09-03',
        title: '외국인 유학생 온라인 입학설명회',
        description: '지원 절차와 학과 선택을 안내합니다.'
      },
      {
        id: 'gumi-2027-result',
        type: 'result',
        startAt: '2026-09-18',
        title: '1차 합격자 발표',
        description: '합격자에게 등록 절차를 개별 안내합니다.'
      }
    ]
  });
  // 저장값이 없거나 올바르지 않을 때 사용하는 구미 공개 탭 기본값입니다.
  const gumiPublicDetailTabs = Object.freeze([
    {
      id: 'detail-intro',
      title: '상세 소개',
      content: '<p><strong>1. 학교소개</strong></p><p>구미대학교는 경상북도 구미시에 위치한 전문대학으로, &quot;현장 중심의 전문기술 과정&quot;을 핵심 교육 방향으로 삼고 있습니다. 이론보다 실습과 현장 적용 능력을 중시하는 육성형 전문기술 교육이 특징이며, 입학 요건과 전공별 준비 사항은 상담을 통해 확인할 수 있도록 안내하고 있습니다.</p><p><strong>교육 성과</strong></p><ul><li>교육부 선정 세계적 수준의 전문대학(WCC) 등 국고지원사업 10관왕 달성</li><li>2010~2021년 평균 취업률 80.5% (전문대학 평균 68.2%), 취업자의 50% 이상이 대기업·공기업 취업 (한국교육개발원 취업통계 기준)</li><li>전국 최고 수준의 장학 지원 — 재학생의 약 95%가 장학 혜택을 받고 있으며, 한 학기 평균 실납부 등록금이 25만 원 이하 수준</li></ul><p><strong>교육 분야 구성</strong></p><p>구미대학교의 학과는 크게 5개 분야로 나뉩니다.</p><ul><li>공학정보분야</li><li>군사협약분야</li><li>간호보건분야</li><li>자연과학분야</li><li>인문사회분야</li></ul>',
      order: 1,
      enabled: true,
      basic: true
    },
    {
      id: 'departments',
      title: '학과 정보',
      content: '<ul><li>컴퓨터공학</li><li>경영학</li><li>한국어연수</li></ul>',
      order: 2,
      enabled: true,
      basic: true
    },
    {
      id: 'admission-process',
      title: '지원 과정',
      content: '<p>전공별 입학 요건과 준비 서류는 상담을 통해 안내합니다.</p>',
      order: 3,
      enabled: true,
      basic: true
    },
    {
      id: 'dormitory-intro',
      title: '기숙사',
      content: '<p>기숙사 신청 안내와 성적·국가별 장학금 정보를 제공합니다.</p>',
      order: 6,
      enabled: true,
      basic: true,
      kind: 'dormitory'
    },
    {
      id: 'admission-materials',
      title: '입학 안내 자료',
      content: '<p>외국인 유학생 모집과 지원에 필요한 안내 자료를 확인하세요.</p>',
      order: 4,
      enabled: true,
      basic: true,
      kind: 'admission-materials'
    },
    {
      id: 'admission-calendar',
      title: '입학 일정',
      content: '<p>외국인 유학생 모집과 입학 절차의 주요 일정을 확인하세요.</p>',
      order: 5,
      enabled: true,
      basic: true,
      kind: 'admission-calendar'
    }
  ]);
  const gumiProfile = Object.freeze({
    headline: '현장 중심의 전문기술 과정을 안내합니다.',
    intro: '현장 중심의 전문기술 과정을 안내합니다. 입학 요건과 전공별 준비 사항을 상담으로 확인할 수 있습니다.',
    programs: ['컴퓨터공학', '경영학', '한국어연수'],
    benefits: ['기숙사 신청 안내와 성적·국가별 장학금 정보를 제공합니다.'],
    photos: gumiPhotos,
    brochures: gumiBrochures,
    tabs: gumiPublicDetailTabs,
    dormitoryPhotos: [],
    publicInfo: gumiPublicInfo
  });
  const affiliationFixtures = Object.freeze({
    gumi: [
      {
        id: 'undergraduate',
        publication: { status: 'published' },
        displayName: '구미대학교',
        fields: ['육성형전문기술'],
        visual: gumiVisual,
        profile: gumiProfile
      },
      {
        id: 'language-center',
        publication: { status: 'published' },
        displayName: '구미대학교 언어교육원',
        fields: ['기타'],
        visual: gumiVisual,
        profile: gumiProfile,
        consultation: {
          status: 'open',
          responseLabel: '보통 2시간 내 응답',
          hours: '평일 09:00–18:00 KST',
          languages: ['한국어', 'English']
        }
      },
      {
        id: 'graduate-school',
        publication: { status: 'published' },
        displayName: '구미대학교 대학원',
        fields: ['육성형전문기술'],
        visual: gumiVisual,
        profile: gumiProfile,
        consultation: {
          status: 'open',
          responseLabel: '보통 2시간 내 응답',
          hours: '평일 09:00–18:00 KST',
          languages: ['한국어', 'English']
        }
      }
    ]
  });

  const clone = (value) => JSON.parse(JSON.stringify(value));
  const normalize = (value) => String(value || '').trim();
  const safeArray = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
  const GUMI_PUBLICATION_STORAGE_KEY = 'unichat.mock.gumi-publication.v1';
  const GUMI_PUBLICATION_UPDATED_EVENT = 'unichat:gumi-publication-updated';
  const GUMI_AFFILIATION_IDS = new Set(['undergraduate', 'language-center', 'graduate-school']);
  const GUMI_AFFILIATION_ALIASES = Object.freeze({
    '학부·학사': 'undergraduate',
    '언어교육원': 'language-center',
    '대학원': 'graduate-school'
  });

  function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function hasOwn(value, key) {
    return isRecord(value) && Object.prototype.hasOwnProperty.call(value, key);
  }

  function normalizedGumiAffiliationId(value) {
    const id = normalize(value);
    return GUMI_AFFILIATION_ALIASES[id] || id;
  }

  function readPublishedGumiData() {
    try {
      const raw = global.localStorage?.getItem(GUMI_PUBLICATION_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return isRecord(parsed) || Array.isArray(parsed) ? parsed : null;
    } catch (error) {
      return null;
    }
  }

  function publicationRecords(value) {
    if (Array.isArray(value)) return value.filter(isRecord);
    if (!isRecord(value)) return [];
    if (value.affiliationId || value.id) return [value];
    return Object.entries(value)
      .filter(([, record]) => isRecord(record))
      .map(([affiliationId, record]) => ({ ...record, affiliationId: record.affiliationId || affiliationId }));
  }

  function publishedGumiSnapshots() {
    const saved = readPublishedGumiData();
    if (!saved) return new Map();
    const root = isRecord(saved) && isRecord(saved.gumi) ? saved.gumi : saved;
    const recordsSource = isRecord(root)
      ? root.snapshots || root.affiliations || root.publications || root.records || root
      : root;
    const rootUniversityId = isRecord(root) ? normalize(root.universityId) : '';
    const snapshots = new Map();

    publicationRecords(recordsSource).forEach((record) => {
      const universityId = normalize(record.universityId || rootUniversityId || 'gumi');
      const affiliationId = normalizedGumiAffiliationId(record.affiliationId || record.id);
      if (universityId !== 'gumi' || !GUMI_AFFILIATION_IDS.has(affiliationId)) return;
      snapshots.set(affiliationId, record);
    });
    return snapshots;
  }

  function firstPublishedValue(snapshot, keys) {
    const profile = isRecord(snapshot.profile) ? snapshot.profile : {};
    for (const key of keys) {
      if (hasOwn(profile, key)) return profile[key];
      if (hasOwn(snapshot, key)) return snapshot[key];
    }
    return undefined;
  }

  function publishedText(snapshot, keys) {
    const value = firstPublishedValue(snapshot, keys);
    return typeof value === 'string' && value.trim() ? value.trim() : '';
  }

  function publishedStringList(snapshot, keys) {
    const value = firstPublishedValue(snapshot, keys);
    return safeArray(value).map((item) => String(item || '').trim()).filter(Boolean);
  }

  function existingGumiAsset(value) {
    const path = normalize(value);
    return path.startsWith(gumiAssetBase) ? path : '';
  }

  function publishedPhotos(snapshot, keys) {
    const value = firstPublishedValue(snapshot, keys);
    if (!Array.isArray(value)) return undefined;
    return value.map((photo) => {
      const source = existingGumiAsset(isRecord(photo) ? photo.src || photo.url : '');
      if (!source) return null;
      return {
        src: source,
        alt: normalize(isRecord(photo) ? photo.alt || photo.name : '') || '구미대학교 대학 사진'
      };
    }).filter(Boolean);
  }

  function publishedBrochures(snapshot) {
    const value = firstPublishedValue(snapshot, ['brochures']);
    if (!Array.isArray(value)) return undefined;
    return value.map((brochure) => {
      const href = existingGumiAsset(isRecord(brochure) ? brochure.href || brochure.url : '');
      if (!href) return null;
      return {
        title: normalize(isRecord(brochure) ? brochure.title || brochure.name : '') || '입학 안내 자료',
        description: normalize(isRecord(brochure) ? brochure.description : '') || 'PDF · PC와 모바일에서 바로 보기',
        href
      };
    }).filter(Boolean);
  }

  function publishedTabs(snapshot) {
    const profile = isRecord(snapshot.profile) ? snapshot.profile : {};
    const hasTabs = hasOwn(profile, 'tabs') || hasOwn(profile, 'publicDetailTabs') || hasOwn(snapshot, 'tabs') || hasOwn(snapshot, 'publicDetailTabs');
    if (!hasTabs) return undefined;
    const source = profile.tabs || profile.publicDetailTabs || snapshot.tabs || snapshot.publicDetailTabs;
    return safeArray(source).filter(isRecord).map((tab, index) => ({
      id: normalize(tab.id) || `tab-${index + 1}`,
      title: normalize(tab.title) || '상세 정보',
      content: typeof tab.content === 'string' ? tab.content : '',
      order: Number(tab.order) || index + 1,
      enabled: tab.enabled !== false,
      kind: normalize(tab.kind)
    }));
  }

  function publishedConsultation(snapshot) {
    const source = isRecord(snapshot.consultation) ? snapshot.consultation : snapshot;
    const result = {};
    ['status', 'responseLabel', 'hours', 'offlineMessage', 'pausedMessage'].forEach((key) => {
      if (typeof source[key] === 'string' && source[key].trim()) result[key] = source[key].trim();
    });
    if (Array.isArray(source.languages)) {
      result.languages = source.languages.map((language) => String(language || '').trim()).filter(Boolean);
    }
    return result;
  }

  function publishedVisual(snapshot) {
    const profile = isRecord(snapshot.profile) ? snapshot.profile : {};
    const source = isRecord(snapshot.visual) ? snapshot.visual : isRecord(profile.visual) ? profile.visual : {};
    const visual = {};
    const logo = existingGumiAsset(source.logo || source.logoPreview);
    const heroImage = existingGumiAsset(source.heroImage || source.heroPreview);
    if (logo) visual.logo = logo;
    if (heroImage) visual.heroImage = heroImage;
    return visual;
  }

  function mergePublishedGumiFixture(fixture, snapshot) {
    if (!snapshot) return fixture;
    const profile = { ...(fixture.profile || {}) };
    const headline = publishedText(snapshot, ['headline']);
    const intro = publishedText(snapshot, ['intro']);
    const programs = publishedStringList(snapshot, ['programs']);
    const benefits = publishedStringList(snapshot, ['benefits']);
    const tabs = publishedTabs(snapshot);
    const photos = publishedPhotos(snapshot, ['photos', 'photoPreviews']);
    const dormitoryPhotos = publishedPhotos(snapshot, ['dormitoryPhotos']);
    const brochures = publishedBrochures(snapshot);
    if (headline) profile.headline = headline;
    if (intro) profile.intro = intro;
    if (programs.length) profile.programs = programs;
    if (benefits.length) profile.benefits = benefits;
    if (tabs !== undefined) profile.tabs = tabs;
    if (photos !== undefined) profile.photos = photos;
    if (dormitoryPhotos !== undefined) profile.dormitoryPhotos = dormitoryPhotos;
    if (brochures !== undefined) profile.brochures = brochures;

    return {
      ...fixture,
      displayName: publishedText(snapshot, ['displayName', 'publicDisplayName']) || fixture.displayName,
      fields: publishedStringList(snapshot, ['fields']).length ? publishedStringList(snapshot, ['fields']) : fixture.fields,
      visual: { ...(fixture.visual || {}), ...publishedVisual(snapshot) },
      profile,
      consultation: { ...(fixture.consultation || {}), ...publishedConsultation(snapshot) }
    };
  }

  function generatedHeadline(university) {
    const fields = safeArray(university.fields);
    const subject = fields.includes('요양보호') ? '보건·요양 유학을 준비하세요'
      : fields.includes('육성형전문기술') ? '현장 중심 전문기술 유학을 준비하세요'
        : fields.includes('뿌리산업') ? '산업 현장과 연결된 유학을 준비하세요'
          : '나에게 맞는 한국 유학을 준비하세요';
    return `${university.name?.ko || '이 대학'}에서 ${subject}`;
  }

  const defaultAdmissionSchedules = (university) => ([
    {
      id: `${university.id}-application`,
      type: 'application',
      startAt: '2026-08-11',
      endAt: '2026-08-24',
      title: '2027학년도 외국인 유학생 원서 접수',
      description: '입학 지원 일정과 제출 서류를 확인해 주세요.'
    },
    {
      id: `${university.id}-documents`,
      type: 'documents',
      startAt: '2026-08-29',
      title: '서류 제출 마감',
      description: '지원에 필요한 서류를 마감일 전까지 제출해 주세요.'
    },
    {
      id: `${university.id}-session`,
      type: 'info-session',
      startAt: '2026-09-05',
      title: '외국인 유학생 입학설명회',
      description: '지원 절차와 학과 정보를 온라인으로 안내합니다.'
    }
  ]);

  const defaultPublicInfo = (university) => {
    const universityName = university.name?.ko || '대학';
    const region = university.location?.label || '지역 정보 준비 중';
    return {
      website: { url: '', label: '홈페이지 정보 준비 중' },
      location: {
        address: `${region} · ${universityName} 캠퍼스`,
        mapQuery: `${universityName} ${region}`
      },
      admissionSchedules: defaultAdmissionSchedules(university)
    };
  };

  const defaultProfile = (university) => ({
    headline: generatedHeadline(university),
    intro: university.profile?.intro || '대학 소개를 준비하고 있습니다.',
    programs: [],
    benefits: [],
    photos: [],
    brochures: university.profile?.brochure ? [university.profile.brochure] : [],
    tabs: [],
    dormitoryPhotos: [],
    publicInfo: defaultPublicInfo(university)
  });

  function prototypeAffiliations(university) {
    const configured = safeArray(affiliationFixtures[university.id]);
    if (configured.length) return configured;
    // D-017 프로토타입 전용 기본 카드. 실서비스 공통 계약에는 저장하지 않는다.
    return [{
      id: 'undergraduate',
      publication: { status: 'published' },
      displayName: university.name?.ko || '대학 정보 준비 중',
      fields: safeArray(university.fields)
    }];
  }

  function createCard(university, fixture) {
    const consultation = { ...(university.consultation || {}), ...(fixture.consultation || {}) };
    const profile = { ...defaultProfile(university), ...(fixture.profile || {}) };
    const visual = { ...(university.visual || {}), ...(fixture.visual || {}) };
    const id = normalize(fixture.id);
    const defaultInfo = defaultPublicInfo(university);
    const fixtureInfo = fixture.profile?.publicInfo || {};
    const publicInfo = {
      ...defaultInfo,
      ...fixtureInfo,
      website: { ...defaultInfo.website, ...(fixtureInfo.website || {}) },
      location: { ...defaultInfo.location, ...(fixtureInfo.location || {}) },
      admissionSchedules: safeArray(fixtureInfo.admissionSchedules).length
        ? safeArray(fixtureInfo.admissionSchedules)
        : safeArray(profile.publicInfo?.admissionSchedules).length
          ? safeArray(profile.publicInfo.admissionSchedules)
          : defaultInfo.admissionSchedules
    };

    return {
      universityId: university.id,
      affiliationId: id,
      displayName: fixture.displayName || university.name?.ko || '대학 정보 준비 중',
      universityName: university.name?.ko || '대학 정보 준비 중',
      universityNameEn: university.name?.en || '',
      location: university.location?.label || '지역 정보 준비 중',
      fields: safeArray(fixture.fields).length ? safeArray(fixture.fields) : safeArray(university.fields),
      visual: {
        initials: visual.initials || university.name?.ko?.slice(0, 2) || 'UC',
        logo: visual.logo || null,
        heroImage: visual.heroImage || null
      },
      profile: {
        headline: profile.headline,
        intro: profile.intro,
        programs: safeArray(profile.programs),
        benefits: safeArray(profile.benefits),
        photos: safeArray(profile.photos),
        brochures: safeArray(profile.brochures),
        tabs: safeArray(profile.tabs),
        dormitoryPhotos: safeArray(profile.dormitoryPhotos),
        publicInfo: {
          website: { ...publicInfo.website },
          location: { ...publicInfo.location },
          admissionSchedules: safeArray(publicInfo.admissionSchedules)
        }
      },
      consultation: {
        status: consultation.status || 'offline',
        responseLabel: consultation.responseLabel || '응답 시간 준비 중',
        hours: consultation.hours || '운영시간 준비 중',
        languages: safeArray(consultation.languages),
        offlineMessage: consultation.offlineMessage || '',
        pausedMessage: consultation.pausedMessage || ''
      }
    };
  }

  function listCards() {
    const universities = global.UniversityDirectory?.listPublic?.() || [];
    const publishedGumi = publishedGumiSnapshots();
    return universities.flatMap((university) => prototypeAffiliations(university)
      .filter((fixture) => fixture.publication?.status === 'published')
      .map((fixture) => {
        const snapshot = university.id === 'gumi'
          ? publishedGumi.get(normalizedGumiAffiliationId(fixture.id))
          : null;
        return createCard(university, mergePublishedGumiFixture(fixture, snapshot));
      }));
  }

  function resolve(universityId, affiliationId) {
    const cards = listCards();
    const requestedUniversity = normalize(universityId);
    const requestedAffiliation = normalize(affiliationId);
    if (!requestedUniversity || !requestedAffiliation) return null;
    return cards.find((card) => card.universityId === requestedUniversity && card.affiliationId === requestedAffiliation) || null;
  }

  function dispatchUpdate(name, detail) {
    if (typeof global.dispatchEvent !== 'function' || typeof global.CustomEvent !== 'function') return;
    global.dispatchEvent(new global.CustomEvent(name, { detail }));
  }

  function publicationUpdateDetail(source) {
    return {
      source,
      universityId: 'gumi',
      affiliationIds: Array.from(publishedGumiSnapshots().keys())
    };
  }

  if (typeof global.addEventListener === 'function') {
    global.addEventListener(GUMI_PUBLICATION_UPDATED_EVENT, (event) => {
      const detail = isRecord(event.detail) ? event.detail : {};
      dispatchUpdate('unichat:universities-updated', {
        ...publicationUpdateDetail(detail.source || 'direct'),
        ...detail,
        universityId: 'gumi'
      });
    });
    global.addEventListener('storage', (event) => {
      if (event.key !== GUMI_PUBLICATION_STORAGE_KEY) return;
      dispatchUpdate(GUMI_PUBLICATION_UPDATED_EVENT, publicationUpdateDetail('storage'));
    });
  }

  global.UniChatPublicUniversityPrototype = Object.freeze({
    publicationStorageKey: GUMI_PUBLICATION_STORAGE_KEY,
    publicationUpdatedEvent: GUMI_PUBLICATION_UPDATED_EVENT,
    listCards: () => clone(listCards()),
    resolve: (universityId, affiliationId) => {
      const card = resolve(universityId, affiliationId);
      return card ? clone(card) : null;
    }
  });
}(window));
