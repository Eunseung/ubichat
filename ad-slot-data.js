(function () {
  'use strict';

  const STORAGE_KEY = 'unichat.mock.ad-slots.v1';
  const SLOT_TYPES = ['university', 'corporate'];
  const defaults = {
    university: [
      { id: 'sahmyook-health', advertiser: '삼육보건대학교', label: '삼육보건대학교 대학 고객사 배너', asset: 'assets/sahmyook-health-banner.png', status: 'active' },
      { id: 'hanyeong', advertiser: '한영대학교', label: '한영대학교 대학 고객사 배너', asset: 'assets/hanyeong-banner.png', status: 'active' },
      { id: 'sungwoon', advertiser: '성운대학교', label: '성운대학교 대학 고객사 배너', asset: 'assets/sungwoon-banner.png', status: 'active' }
    ],
    corporate: [
      { id: 'finance', category: '금융', advertiser: '금융 제휴사', label: '금융 고객사 배너 이미지', asset: '', template: 'finance', status: 'active' },
      { id: 'housing', category: '주거', advertiser: '주거 제휴사', label: '주거 고객사 배너 이미지', asset: '', template: 'housing', status: 'active' },
      { id: 'telecom', category: '통신', advertiser: '통신 제휴사', label: '통신 고객사 배너 이미지', asset: '', template: 'telecom', status: 'active' }
    ]
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function valid(data) {
    return data && SLOT_TYPES.every((type) => Array.isArray(data[type]));
  }
  function read() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      return valid(parsed) ? parsed : clone(defaults);
    } catch (_) {
      return clone(defaults);
    }
  }
  function write(data) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('unichat:ad-slots-updated', { detail: clone(data) }));
  }
  function requireType(type) {
    if (!SLOT_TYPES.includes(type)) throw new Error('Unsupported ad slot type: ' + type);
  }
  function normalize(slot) {
    return {
      id: String(slot.id || '').trim(),
      advertiser: String(slot.advertiser || '').trim(),
      label: String(slot.label || '').trim(),
      asset: String(slot.asset || '').trim(),
      status: slot.status === 'inactive' ? 'inactive' : 'active',
      category: String(slot.category || '').trim(),
      template: String(slot.template || '').trim()
    };
  }

  window.UniChatAdSlots = {
    specs: { desktop: '1180 × 220px', mobile: '328 × 160px' },
    list(type) {
      requireType(type);
      return clone(read()[type]);
    },
    listActive(type) {
      return this.list(type).filter((slot) => slot.status === 'active');
    },
    get(type, id) {
      return this.list(type).find((slot) => slot.id === id) || null;
    },
    update(type, id, patch) {
      requireType(type);
      const data = read();
      const index = data[type].findIndex((slot) => slot.id === id);
      if (index < 0) return null;
      data[type][index] = { ...data[type][index], ...normalize({ ...data[type][index], ...patch }), id };
      write(data);
      return clone(data[type][index]);
    },
    add(type, slot) {
      requireType(type);
      const next = normalize(slot);
      if (!next.id || !next.advertiser || !next.label) throw new Error('광고 구좌의 식별자·광고주·배너 설명을 입력해 주세요.');
      const data = read();
      if (data[type].some((item) => item.id === next.id)) throw new Error('이미 사용 중인 광고 구좌 ID입니다.');
      data[type].push(next);
      write(data);
      return clone(next);
    },
    move(type, id, direction) {
      requireType(type);
      const data = read();
      const from = data[type].findIndex((slot) => slot.id === id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= data[type].length) return false;
      [data[type][from], data[type][to]] = [data[type][to], data[type][from]];
      write(data);
      return true;
    },
    reset() { write(clone(defaults)); }
  };
}());
