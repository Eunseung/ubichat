(function (global) {
  'use strict';

  // 공개 계약 확정 전, CR-2026-07-29-gumi-university-public-content-sync의 검증용 공개 스냅샷입니다.
  // 학교 운영 화면의 상태를 읽지 않으며 계약 데이터가 연결되면 교체합니다.
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
  const gumiProfile = Object.freeze({
    headline: '현장 중심의 전문기술 과정을 안내합니다.',
    intro: '현장 중심의 전문기술 과정을 안내합니다. 입학 요건과 전공별 준비 사항을 상담으로 확인할 수 있습니다.',
    programs: ['컴퓨터공학', '경영학', '한국어연수'],
    benefits: ['기숙사 신청 안내와 성적·국가별 장학금 정보를 제공합니다.'],
    photos: gumiPhotos,
    brochures: gumiBrochures
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

  function generatedHeadline(university) {
    const fields = safeArray(university.fields);
    const subject = fields.includes('요양보호') ? '보건·요양 유학을 준비하세요'
      : fields.includes('육성형전문기술') ? '현장 중심 전문기술 유학을 준비하세요'
        : fields.includes('뿌리산업') ? '산업 현장과 연결된 유학을 준비하세요'
          : '나에게 맞는 한국 유학을 준비하세요';
    return `${university.name?.ko || '이 대학'}에서 ${subject}`;
  }

  const defaultProfile = (university) => ({
    headline: generatedHeadline(university),
    intro: university.profile?.intro || '대학 소개를 준비하고 있습니다.',
    programs: [],
    benefits: [],
    photos: [],
    brochures: university.profile?.brochure ? [university.profile.brochure] : []
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
        brochures: safeArray(profile.brochures)
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
    return universities.flatMap((university) => prototypeAffiliations(university)
      .filter((fixture) => fixture.publication?.status === 'published')
      .map((fixture) => createCard(university, fixture)));
  }

  function resolve(universityId, affiliationId) {
    const cards = listCards();
    const requestedUniversity = normalize(universityId);
    const requestedAffiliation = normalize(affiliationId);
    if (!requestedUniversity || !requestedAffiliation) return null;
    return cards.find((card) => card.universityId === requestedUniversity && card.affiliationId === requestedAffiliation) || null;
  }

  global.UniChatPublicUniversityPrototype = Object.freeze({
    listCards: () => clone(listCards()),
    resolve: (universityId, affiliationId) => {
      const card = resolve(universityId, affiliationId);
      return card ? clone(card) : null;
    }
  });
}(window));
