# CR-2026-07-30 — 구미대학교 직접 게시 공개정보 실시간 반영

- 상태: 사용자 확정, P1 실행
- 근거: D-026
- 적용 범위: 구미대학교(`gumi`)의 소속구분별 공개정보만. 다른 대학·실서비스 백엔드·임의 신규 파일 업로드는 제외한다.
- Owner: 학교 Developer — 생산·저장 어댑터
- 소비 Owner: 메인 Developer — 공개 렌더링·탭 간 갱신
- Required reviewers: 학교 PM·Designer, 메인 PM·Designer, 학생 Developer, 어드민 PM, Product Owner

## 인터페이스

- 저장 키: `unichat.mock.gumi-publication.v1`
- 이벤트: `unichat:gumi-publication-updated`
- 키: `universityId + affiliationId`
- 필드: 공개 표시명, 한 줄/상세 소개, 학과·지원 과정·기숙사, 공개 탭·순서·활성 상태, 상담 상태·응답 안내·운영 시간·상담 언어, 기존 정적 자산 참조
- 제외: 원본 이미지·PDF 파일 또는 객체 URL, 학생 문서·메시지·개인정보

## 호환·검증

- 기존 `UniversityDirectory`와 다른 대학 fixture를 변경하지 않는다.
- 같은 탭은 직접 이벤트, 다른 탭은 `storage` 이벤트 뒤 동일 이벤트로 렌더링한다.
- 학부·언어교육원·대학원 각각의 게시, 새로고침, 다른 탭, 공개 상세→상담 CTA의 `affiliationId` 보존을 검증한다.

## 학교 구현 인계 — 2026-07-30

- 학교가 `shared/prototype/gumi-publication-sync.js`를 추가했다. 전역 API는 `window.UniChatGumiPublicationSync`이며, `publish(snapshot)`, `readPublication()`, `readAffiliation(affiliationId)`를 제공한다.
- `university-admin.html`의 `직접 게시`는 구미대학교의 활성 소속구분을 `undergraduate | language-center | graduate-school` 식별자로 저장하고, 저장 성공 뒤에만 `unichat:gumi-publication-updated`를 발생시킨다.
- 스냅샷은 공개 텍스트·탭·상담 상태와 기존 정적 자산 참조만 포함한다. 새로 선택한 이미지·입학 안내 자료의 객체 URL은 제외한다.
- 메인 소비자는 기본 구미 카드에 선택 소속구분 스냅샷만 덮어쓴다. `publicInfo`, 입학 일정, 다른 대학 fixture와 전체 `published` 상태는 기존 값을 유지한다.
- `storage` 수신 시 어댑터가 같은 이벤트를 다시 발생시킨다. 메인 화면은 어댑터를 로드한 뒤 해당 이벤트에서 현재 URL의 `universityId + affiliationId`를 다시 조회해 렌더링한다.
