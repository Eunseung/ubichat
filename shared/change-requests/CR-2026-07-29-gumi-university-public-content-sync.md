# Shared Change Request

- 요청 ID: CR-2026-07-29-gumi-university-public-content-sync
- 날짜: 2026-07-29
- 요청 스쿼드: 학교
- 담당 역할: 학교 PM
- 대상 파일·계약: 메인·탐색·콘텐츠 소유 `university-public-prototype.js`, `university-explore.js`, `university-detail.js`; 소비 계약 `shared/contracts/university-publication.md`
- 문제: 학교 프로토타입의 샘플 대학이 구미대학교로 전환됐다. 메인 공개 프로토타입도 같은 대학·소속구분 식별자와 공개 문구를 유지해야 하나, 학교 내부 `operatingProfiles`는 브라우저 실행 중 상태여서 외부 화면이 직접 읽을 수 없다.

## 확정 공개용 스냅샷

### 대학 공통

| 필드 | 값 |
| --- | --- |
| `universityId` | `gumi` |
| 대학명 | 구미대학교 / Gumi University |
| 지역 | 경북 구미 |
| 분야 | 육성형전문기술 |
| 기본 상담 상태 | `open` |
| 응답 안내 | 보통 2시간 내 응답 |
| 운영시간 | 평일 09:00–18:00 KST |
| 상담 언어 | 한국어, English |

### 공개 소속구분 카드

| `affiliationId` | 공개 표시명 | 분야 | 게시 상태 |
| --- | --- | --- | --- |
| `undergraduate` | 구미대학교 | 육성형전문기술 | `published` |
| `language-center` | 구미대학교 언어교육원 | 기타 | `published` |
| `graduate-school` | 구미대학교 대학원 | 육성형전문기술 | `published` |

### 상세 기본 문구

- 한 줄 소개: `현장 중심의 전문기술 과정을 안내합니다.`
- 상세 소개:
  - 구미대학교는 경상북도 구미시에 위치한 전문대학으로, 현장 중심의 전문기술 과정을 핵심 교육 방향으로 삼는다. 이론보다 실습과 현장 적용 능력을 중시하는 육성형 전문기술 교육이 특징이며, 입학 요건과 전공별 준비 사항은 상담을 통해 안내한다.
  - 교육 성과: 교육부 선정 세계적 수준의 전문대학(WCC) 등 국고지원사업 10관왕, 2010~2021년 평균 취업률 80.5%(전문대학 평균 68.2%), 취업자의 50% 이상 대기업·공기업 취업(한국교육개발원 취업통계 기준), 재학생 약 95% 장학 혜택 및 한 학기 평균 실납부 등록금 25만 원 이하 수준.
  - 교육 분야: 공학정보분야, 군사협약분야, 간호보건분야, 자연과학분야, 인문사회분야.
- 학과·지원 과정: 컴퓨터공학, 경영학, 한국어연수
- 기숙사·장학금: 기숙사 신청 안내와 성적·국가별 장학금 정보를 제공합니다.

## 콘텐츠 스쿼드 작업 범위

1. `university-public-prototype.js`의 구미대학교 3개 fixture가 위 `universityId`, `affiliationId`, 공개 표시명, 지역, 문구를 사용하도록 확인·갱신한다.
2. 카드 → 상세 → 상담 CTA에서 선택한 `affiliationId`를 바꾸지 않는다.
3. 아래 학교 프로토타입 자산을 구미대학교 fixture에만 임시 참조할 수 있다. 공개 계약 연결 뒤에는 계약이 제공하는 자산 URL로 교체한다.

| 용도 | 임시 경로 | 비고 |
| --- | --- | --- |
| 배경 이미지 | `squads/university/prototype-assets/gumi/gumi-campus-hero.jpeg` | 구미대학교 캠퍼스 |
| 로고 | `squads/university/prototype-assets/gumi/gumi-logo.svg` | 구미대학교 로고 |
| 대표 소개 사진 | `squads/university/prototype-assets/gumi/gumi-campus-cover.jpg` | 대표 사진 |
| 소개 사진 | `gumi-campus-01.jpeg` ~ `gumi-campus-04.jpeg` | 대표 사진 외 4장 |
| 모집 브로셔 | `squads/university/prototype-assets/gumi/gumi-brochure.pdf` | 미리보기 제공 |

4. 학교 내부 `operatingProfiles`, 웰컴 메시지·이미지, 멤버·학생 정보, 브라우저 `File` 객체를 읽거나 노출하지 않는다.
5. `university-publication` v2 확정 뒤에만 fixture를 계약 소비로 교체한다. 이 요청으로 공통 계약 본문을 변경하지 않는다.

## 변경하지 않을 범위

- 대학 등록·계정 발급·공개 승인 정책
- 웰컴 메시지와 상담 운영 화면
- 학생 채팅, 차단·차단 해제, 자료 요청
- 공개 자산 승인 큐
- `shared/contracts/university-publication.md` 본문

## 영향받는 스쿼드

- 메인·탐색·콘텐츠: 공개 카드·상세 fixture 반영
- 학생: 상담 CTA가 전달한 `universityId + affiliationId`를 독립 채널에 유지
- 학교: 계약 확정 뒤 실제 게시 데이터를 생산
- Product Owner: 계약 v2 필수 검토 완료 여부 관리

## 호환성 위험·마이그레이션

- 현재 fixture는 프로토타입 전용이다. 학교 내부 실행 상태를 읽으면 비공개 데이터 노출과 새로고침 후 불일치가 발생한다.
- 계약 연결 전에는 이 문서의 공개 스냅샷만 사용한다. 계약 확정 후에는 기존 fixture를 한 번에 계약 데이터 소비로 교체하고, 소속구분별 `published` 상태와 빈 자산을 그대로 존중한다.

## 인수 조건

1. 공개 탐색에 구미대학교 3개 소속구분 카드가 각각 표시된다. 다른 현재 대학은 D-017 프로토타입 기본 카드로 함께 표시될 수 있다.
2. 각 카드·상세의 지역은 `경북 구미`이며 `경기 양주` 등 이전 샘플 값이 남지 않는다.
3. 세 상세는 위 공개 문구를 표시하고, 소속구분별 자산이 없으면 안전한 빈 상태를 보인다.
4. 웰컴 메시지·이미지, 멤버·학생 정보, 내부 메모는 공개 화면에 표시되지 않는다.
5. 상담 CTA는 동일한 `universityId=gumi`와 선택 `affiliationId`를 전달한다.

- 검증 방법: 메인 스쿼드가 3개 카드, 상세 URL, 상담 CTA 파라미터, 데스크톱·모바일 빈 자산 상태를 확인한다.
- Owner 승인: 메인·탐색·콘텐츠 PM·Designer·Developer 확인 대기
- 필수 검토자 확인: 학교 PM·Developer, 학생 Developer(CTA 식별자)
- Product Owner 결정 ID: D-013, D-014, D-015
- 사용자 사전 승인: 있음 (2026-07-29)
- 사용자 승인 범위: 학교 HTML의 구미대학교 샘플을 콘텐츠 스쿼드가 같은 공개 프로토타입 데이터로 반영하도록 인계한다.
- 작업 완료 보고: 학교 스쿼드가 공개 스냅샷·범위·인수 조건을 등록했다. 메인 소유 파일과 공통 계약 본문은 수정하지 않았다.
- 사용자 최종 확인: 대기

## 메인·탐색·콘텐츠 완료 검토 — 2026-07-29

- PM: 공개 스냅샷의 카드 단위·표시명·선택 `affiliationId` 유지 조건을 수용했다.
- Designer: 선택 소속구분 상세, 로고 이니셜, 자산 없는 빈 상태, 데스크톱·모바일 상담 CTA 상태를 수용했다.
- Developer: `university-public-prototype.js`에 `gumi`의 `undergraduate`, `language-center`, `graduate-school` fixture와 각각의 `published` 상태를 반영했다. 허용된 구미대 프로토타입 로고·배경·소개 사진 5장·브로셔만 세 fixture에 임시 연결했다. 임의 `general` 카드와 학교 내부 `operatingProfiles` 소비는 없다.
- 검증: 3개 카드의 `universityId`, `affiliationId`, 공개 표시명, `경북 구미`, 분야, 한 줄 소개, 상담 상태·응답 안내를 확인했다. 카드→상세→CTA URL의 두 식별자 보존, 허용된 구미대 자산 경로와 브로셔 보기 링크를 확인했다.
- 대기: `university-publication` v2 필수 검토·확정 뒤에만 fixture를 실제 계약 데이터 소비로 교체한다.
