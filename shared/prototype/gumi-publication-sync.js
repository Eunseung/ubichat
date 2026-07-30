(function (global) {
  'use strict';

  if (global.UniChatGumiPublicationSync) return;

  const STORAGE_KEY = 'unichat.mock.gumi-publication.v1';
  const EVENT_NAME = 'unichat:gumi-publication-updated';
  const UNIVERSITY_ID = 'gumi';
  const VERSION = 1;

  const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  const clone = (value) => JSON.parse(JSON.stringify(value));

  function emptyPublication() {
    return {
      version: VERSION,
      universityId: UNIVERSITY_ID,
      updatedAt: null,
      affiliations: {}
    };
  }

  function storage() {
    try {
      return global.localStorage || null;
    } catch (error) {
      return null;
    }
  }

  function normalizePublication(value) {
    if (!isObject(value) || value.universityId !== UNIVERSITY_ID || !isObject(value.affiliations)) {
      return null;
    }
    return {
      version: VERSION,
      universityId: UNIVERSITY_ID,
      updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null,
      affiliations: value.affiliations
    };
  }

  function readPublication() {
    const store = storage();
    if (!store) return { ok: false, code: 'storage-unavailable' };

    try {
      const raw = store.getItem(STORAGE_KEY);
      if (!raw) return { ok: true, publication: emptyPublication() };
      const publication = normalizePublication(JSON.parse(raw));
      if (!publication) return { ok: false, code: 'storage-invalid' };
      return { ok: true, publication: clone(publication) };
    } catch (error) {
      return { ok: false, code: 'storage-unavailable' };
    }
  }

  function readAffiliation(affiliationId) {
    const result = readPublication();
    if (!result.ok) return result;
    const id = String(affiliationId || '').trim();
    const snapshot = id ? result.publication.affiliations[id] || null : null;
    return { ok: true, snapshot: snapshot ? clone(snapshot) : null, publication: result.publication };
  }

  function dispatchUpdate(detail) {
    global.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: clone(detail) }));
  }

  function publish(snapshot) {
    if (!isObject(snapshot) || snapshot.universityId !== UNIVERSITY_ID) {
      return { ok: false, code: 'invalid-snapshot' };
    }
    const affiliationId = String(snapshot.affiliationId || '').trim();
    if (!affiliationId) return { ok: false, code: 'invalid-snapshot' };

    const current = readPublication();
    if (!current.ok) return current;

    const now = new Date().toISOString();
    const nextSnapshot = { ...clone(snapshot), universityId: UNIVERSITY_ID, affiliationId, updatedAt: now };
    const publication = {
      ...current.publication,
      version: VERSION,
      universityId: UNIVERSITY_ID,
      updatedAt: now,
      affiliations: {
        ...current.publication.affiliations,
        [affiliationId]: nextSnapshot
      }
    };
    const store = storage();
    if (!store) return { ok: false, code: 'storage-unavailable' };

    try {
      store.setItem(STORAGE_KEY, JSON.stringify(publication));
    } catch (error) {
      return { ok: false, code: 'storage-unavailable' };
    }

    dispatchUpdate({
      source: 'publish',
      universityId: UNIVERSITY_ID,
      affiliationId,
      updatedAt: now,
      snapshot: nextSnapshot
    });
    return { ok: true, publication: clone(publication), snapshot: clone(nextSnapshot) };
  }

  global.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    const result = readPublication();
    if (!result.ok) return;
    dispatchUpdate({
      source: 'storage',
      universityId: UNIVERSITY_ID,
      affiliationId: null,
      updatedAt: result.publication.updatedAt,
      publication: result.publication
    });
  });

  global.UniChatGumiPublicationSync = Object.freeze({
    STORAGE_KEY,
    EVENT_NAME,
    readPublication,
    readAffiliation,
    publish
  });
}(window));
