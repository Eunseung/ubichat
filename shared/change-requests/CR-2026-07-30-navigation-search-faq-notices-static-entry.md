# Shared Change Request

- 요청 ID: CR-2026-07-30-navigation-search-faq-notices-static-entry
- 날짜: 2026-07-30
- 요청 스쿼드: Product Owner
- Owner: 메인 PM·Designer·Developer
- 필수 검토자: 학생 PM·Developer, 어드민 PM·Developer
- 근거: D-023
- 대상: `index.html`, 공개 GNB HTML, `landing.css`, `landing.js`, `university-explore.js`, `student-session.js`, `language-selector.js`, `faq.html`, `navigation-auth.md`
- 변경: 메인 검색, FAQ 페이지·미리보기, 공지 GNB 로그인 반환, `로그인/회원가입` 버튼명, `index.html` 실제 랜딩 진입점을 추가한다.
- 공지 접근: GNB 진입은 공개, 본문은 로그인 후 대상별로만 표시한다. 비로그인은 `student-desktop.html?view=notices` 반환 경로를 유지한 로그인으로 보낸다.
- 정적 배포: `index.html`이 랜딩을 직접 렌더링한다. `기업용_배너_포함.html`은 기존 URL 호환을 유지한다.
- 변경하지 않을 범위: 공지 대상·어드민 단독 작성 권한, 공개 공지 본문, 학생 포털 내부 IA, 학교·어드민 업무 화면
- 검증: 검색 쿼리 유지, FAQ 공개 열람, 공지 로그인 반환, 데스크톱·모바일 GNB, `index.html` 정적 단독 실행, 로컬 링크·JavaScript 문법
- 사용자 사전 승인: 2026-07-30 내부 보고 수정·정적 HTML 배포 지시
- 사용자 최종 확인: 대기
