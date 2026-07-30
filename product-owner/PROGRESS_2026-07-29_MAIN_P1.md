# 메인·탐색·콘텐츠 P1 진행 보고

- 보고일: 2026-07-29
- 작성: 메인·탐색·콘텐츠 스쿼드
- 성격: 구현 현황 보고. Product Owner 정책 결정을 추가하거나 변경하지 않는다.
- 기준: D-008, D-010, D-013, D-015, D-016, D-017, `SQUAD_BRIEFS.md`, `CR-2026-07-29-university-public-detail-affiliation-assets.md`

## 완료한 공개 경험 구현

### GNB

- 비로그인은 `학교 서비스`, `학생 로그인`을 함께 표시한다.
- D-021에 따라 학생 로그인 상태에서는 `학교 서비스`를 숨기며, `학생 로그인`은 프로필 메뉴로 전환한다.
- 축소 화면은 햄버거에 `대학 탐색·내 상담·콘텐츠`, 학생 프로필, `공지사항·문서 보관함·마이페이지·로그아웃`, 언어 선택을 통합한다.
- 데스크톱 프로필 메뉴에 `내 상담`과 개인 메뉴 바로가기를 제공한다.
- 공개 화면 GNB에 `대학 탐색`, `내 상담`, `콘텐츠`를 통일했다.
- 언어 선택은 닫힌 상태에서 `KO`, `ID`, `EN`, `RU`, `KY`, `TG`만 표시한다.
- 선택 목록에서만 전체 언어명을 표시하며, 인도네시아어는 `Bahasa Indonesia (ID)`로 표기한다.

### 대학 탐색·상세 프로토타입

- 카드·상세 식별자는 `universityId + affiliationId`를 사용한다.
- D-017에 따라 현재 대학 21개를 모두 공개하고, 카드 URL과 상세 URL에 선택 `affiliationId`를 유지한다.
- 구미대학교는 아래 3개 공개 소속구분 카드를 구성했다. 나머지 대학은 프로토타입 `undergraduate` 기본 카드 1개를 사용한다.
  - `구미대학교` — `undergraduate`
  - `구미대학교 언어교육원` — `language-center`
  - `구미대학교 대학원` — `graduate-school`
- 상세에는 선택 소속구분의 한 줄 소개, 소개, 학과·지원 과정, 기숙사·장학금, 모집 안내를 표시한다.
- 로고가 없으면 이니셜을 기본 이미지로 표시하고, 사진·브로셔·필드가 없으면 빈 상태를 표시한다.
- 공개 상세에 웰컴 메시지·웰컴 이미지는 표시하지 않는다.
- 상담 CTA는 `universityId`, `affiliationId`를 학생의 소속구분별 독립 상담 채널로 전달한다.

### 공개 상세 UI

- 커버의 한 줄 소개는 데스크톱에서 가로폭을 모두 사용한다.
- 모바일에서는 화면 폭에 따라 자연스럽게 줄바꿈한다.
- 상세의 상담 카드·본문·빈 상태·브로셔 보기 상태를 데스크톱·모바일 레이아웃으로 처리했다.

## 현재 데이터 연결 방식

- `university-data.js`의 공개 대학 목록만 소비한다.
- 소속구분 공개정보 계약이 아직 확정되지 않았으므로 학교 운영 화면의 내부 `operatingProfiles`를 읽지 않는다.
- `university-public-prototype.js`의 구미대학교 3개 소속구분 데이터와 나머지 대학의 `undergraduate` 기본 카드는 공개 화면 동작 검증용 더미다.
- D-017의 기본 카드는 프로토타입 전용이다. 실서비스에서는 D-014에 따라 학교가 직접 게시한 소속구분만 카드로 만든다.

## 검증

- `university-public-prototype.js`, `university-detail.js`, `language-selector.js` JavaScript 문법 검사 통과
- 공개 목록에서 현재 대학 21개의 23개 카드와 구미대학교 3개 소속구분 카드의 식별자·한 줄 소개를 확인
- 카드→상세 URL 및 상담 CTA의 `affiliationId` 전달 확인
- 변경 파일 공백·패치 충돌 검사 통과

## 미완료·PO 확인 필요

1. `shared/contracts/university-publication.md`에 소속구분별 `published` 상태, 공개 표시명, 상세 정보, 자산, 상담 설정이 아직 없다. 필수 검토 후 계약을 확정하면 프로토타입 더미를 계약 데이터 소비로 교체한다. 그 전까지 명시적 더미 이외의 대학은 공개 카드로 만들지 않는다.
2. 학생 스쿼드는 로그인·가입 반환 뒤에도 `studentId + universityId + affiliationId`별 독립 상담 채널·목록을 유지해야 한다. 인계는 `CR-2026-07-29-student-consultation-affiliation-context.md`에 기록했다.
3. 분석 수집은 아직 구현하지 않았다. 이벤트 초안은 `squads/main/P1_ANALYTICS_EVENT_SPEC.md`에 기록했으며, `affiliationId`별 카드 노출·상세 진입·상담 CTA 클릭·공개 프로필 완성도를 개인정보·문서명·URL·메시지 본문 없이 측정한다.
4. 학생 유치 홍보 페이지와 `등록 문의`는 D-010 보류 상태에 따라 구현하지 않았다.

## 영향 파일

- 메인: `landing.css`, `landing.js`, `language-selector.js`, `university-explore.html`, `university-explore.js`, `university-detail.html`, `university-detail.js`, `university-public-prototype.js`, 공개 랜딩 HTML 2종
- 협업 문서: `CR-2026-07-29-university-public-detail-affiliation-assets.md`, `CR-2026-07-29-student-consultation-affiliation-context.md`
