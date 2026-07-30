# Shared Change Request

- 요청 ID: CR-2026-07-29-content-cms-public-rendering
- 날짜: 2026-07-29
- 요청 스쿼드: 어드민
- 담당 역할: 어드민 PM·Designer·Developer
- 대상 파일·계약: 어드민 소유 `platform-admin.html`; 메인·탐색·콘텐츠 소유 `content.html`; 공통 `shared/contracts/content.md`; 신규 공개 소비 데이터 어댑터 `content-data.js`
- 문제: 어드민 CMS 목업과 공개 `content.html`이 분리돼 있다. CMS에서 만든 게시글·첨부가 공개 콘텐츠 화면에 표시되지 않고, `content.html`은 빈 상태만 렌더링한다.

## 확정 정책

1. 어드민 CMS가 게시글의 작성·수정·검토·게시·비공개 상태를 관리한다.
2. 메인은 `status=published` 게시글만 목록·본문·첨부로 렌더링한다. `draft`, `review`, `scheduled`, `hidden`은 공개 화면에 표시하지 않는다.
3. CMS 첨부는 모든 파일 형식을 허용하며, 파일당 최대 100MB다.
4. 게시 전 첨부는 플랫폼 관리자만 미리보기할 수 있다. 게시 뒤 첨부는 해당 공개 게시글에서 열람할 수 있다.
5. 게시 뒤 첨부의 교체·삭제는 공개본에 즉시 반영한다. 이전 첨부는 보관·복구하지 않는다.
6. HTTPS 외부 링크 첨부를 허용한다.
7. CMS 게시글·첨부의 생성·수정·교체·삭제는 감사 로그에 기록하지 않는다.

## 제안 공개 소비 계약

```text
Content
├─ id
├─ type
├─ title
├─ summary
├─ body
├─ thumbnail
├─ category
├─ tags[]
├─ status
├─ author
├─ publishedAt
├─ relatedUniversityIds[]
├─ seo.title / seo.description
└─ attachments[]
   ├─ id
   ├─ source: file | external_link
   ├─ name
   ├─ url
   └─ bytes: number | null
```

- `file` 첨부는 CMS가 제공한 공개 URL을 사용한다.
- `external_link`는 HTTPS URL만 사용한다. `bytes`는 `null`일 수 있다.
- 메인은 CMS 상태·첨부를 수정하지 않는다.
- 공개 본문·첨부에는 학생 개인정보·상담 내용·관리자 내부 메모를 포함하지 않는다.

## 메인 스쿼드 구현 범위

1. `content.html`의 빈 상태를 공개 게시글 목록으로 교체한다.
2. 목록에서 게시글 제목·요약·게시일·첨부 수를 표시한다.
3. 선택한 게시글은 본문과 첨부 목록을 표시한다. 첨부는 새 창에서 안전하게 연다.
4. 게시글이 없을 때만 현재 빈 상태를 표시한다.
5. 모바일·데스크톱, 첨부 없음, 잘못된 첨부 URL, 비공개 상태를 검증한다.

## 어드민 스쿼드 구현 범위

1. CMS 편집 화면에서 파일·HTTPS 외부 링크 첨부을 추가·교체·삭제한다.
2. 파일 형식 제한 없이 100MB 초과 파일을 차단한다.
3. 게시 전에는 관리자 미리보기만 제공한다.
4. 게시 뒤 교체·삭제는 이전 첨부 보관 없이 즉시 반영한다.
5. CMS·첨부 동작의 감사 로그 생성은 하지 않는다.

## 변경하지 않을 범위

- 일반 콘텐츠와 광고 콘텐츠의 분류 정책
- 콘텐츠 유형·카테고리·검토 권한·예약 시간대·다국어·광고성 표기
- 공개 콘텐츠 분석 이벤트
- 학생·대학 화면, 상담·문서·계정 데이터
- 광고 구좌 운영

## 영향받는 스쿼드

- 어드민: CMS·첨부 데이터 생산과 게시 상태 관리
- 메인·탐색·콘텐츠: 공개 게시글·본문·첨부 렌더링
- Product Owner: 콘텐츠 분류·검토·예약·다국어 정책 후속 결정

## 호환성 위험·마이그레이션

- 현재 `content.html`은 빈 상태만 제공한다. `content-data.js`가 없거나 `published` 항목이 없으면 기존 빈 상태를 유지한다.
- 기존 CMS 목업의 브라우저 메모리 데이터는 공개 소비 데이터가 아니다. 새 어댑터로 일회성 fixture를 제공한 뒤 실제 저장소로 교체한다.
- `external_link` URL이 HTTPS가 아니거나 파일 URL이 없으면 메인은 첨부를 숨기고 안전한 안내를 표시한다.

## 인수 조건

1. CMS에서 `published` 게시글을 만들면 `content.html`에 표시된다.
2. `draft`, `review`, `scheduled`, `hidden` 게시글과 첨부는 공개 `content.html`에 표시되지 않는다.
3. 게시글 상세에서 파일·외부 링크 첨부를 열 수 있다.
4. 첨부 교체·삭제 뒤 공개 페이지가 최신 첨부만 표시한다.
5. 100MB 초과 파일 첨부는 CMS에서 저장되지 않는다.
6. CMS 게시글·첨부 작업이 감사 로그에 새 항목을 만들지 않는다.

- 검증 방법: 어드민은 상태·파일 크기·첨부 교체·삭제를 검증한다. 메인은 공개 목록·상세·첨부·빈 상태를 데스크톱·모바일에서 검증한다.
- Owner 승인: 어드민 PM·Designer·Developer 승인, 메인 PM·Designer·Developer 검토 대기
- 필수 검토자 확인: 메인 PM·Designer·Developer, Product Owner
- Product Owner 결정 ID: 사용자 승인 2026-07-29; 콘텐츠 분류·검토·예약 정책은 별도 결정 필요
- 사용자 사전 승인: 있음 (2026-07-29)
- 사용자 승인 범위: 어드민 CMS의 게시글·첨부를 공통 공개 소비 데이터로 연결하고, 메인 `content.html`에서 `published` 게시글만 렌더링한다.
- 작업 완료 보고: 어드민은 첨부 정책·공개 소비 계약·인수 조건을 기록했다. 메인 소유 `content.html`은 이 어드민 세션에서 수정하지 않는다.
- 사용자 최종 확인: 대기
