# P1 공개 대학 탐색 분석 이벤트 초안

- 상태: 설계 완료 · 수집 도구 연동 대기
- Owner: 메인·탐색·콘텐츠 Developer
- 기준: D-013, D-014, `SQUAD_BRIEFS.md`
- 목적: 공개 소속구분별 탐색 → 상세 → 상담 CTA 퍼널을 개인정보 없이 측정한다.

## 공통 원칙

- 이벤트는 공개 카드의 `universityId`, `affiliationId`만 식별자로 사용한다.
- 학생 이름·이메일·국가·기기 식별자 등 개인정보는 보내지 않는다.
- 검색어, 문서명, 문서 URL, 브로셔 URL, 메시지 본문, 웰컴 메시지·이미지는 보내지 않는다.
- 카드·상세·CTA는 대학과 소속구분 모두 `published`인 데이터에서만 측정한다.
- 실제 수집 도구가 정해지기 전에는 DOM 이벤트를 임의 저장하거나 외부로 전송하지 않는다.

## 이벤트

| 이벤트 | 발생 시점 | 필수 속성 | 제외 속성 |
|---|---|---|---|
| `university_affiliation_card_impression` | 카드가 화면에 50% 이상 1초 노출됐을 때, 세션당 동일 카드 1회 | `universityId`, `affiliationId`, `surface` (`landing` 또는 `explore`), `position` | 검색어, 카드 문구, 대학 담당자 정보 |
| `university_affiliation_detail_view` | 선택 소속구분 상세 렌더링 완료 | `universityId`, `affiliationId`, `entrySurface` (`landing`, `explore`, `direct`) | 상세 본문, 자산 파일명·URL |
| `university_affiliation_consultation_cta_click` | 상담 CTA 활성 상태에서 클릭 | `universityId`, `affiliationId`, `consultationStatus`, `authState` (`guest`, `student`) | 로그인 계정 정보, 반환 URL, 상담 메시지 |
| `university_affiliation_profile_completeness` | 공개 계약 데이터가 갱신될 때, 소속구분별 집계 | `universityId`, `affiliationId`, `introState`, `logoState`, `photoCountBucket`, `brochureCountBucket`, `consultationState` | 소개 본문, 사진·브로셔 파일명·URL, 상담 내용 |

## 속성 값

- `position`: 해당 화면에 렌더링된 카드의 1부터 시작하는 순서
- `photoCountBucket`, `brochureCountBucket`: `0`, `1`, `2-5`, `6+`
- `introState`, `logoState`: `present`, `empty`
- `consultationStatus`, `consultationState`: `open`, `offline`, `paused`, `unknown`
- `authState`: CTA 클릭 시점의 공개 로그인 상태만 사용하며 학생 식별자는 포함하지 않는다.

## 수용 기준

1. 카드·상세·CTA 이벤트는 같은 `universityId`, `affiliationId`를 사용한다.
2. 비공개 대학·소속구분, 임의 `general` fallback 카드에서는 이벤트가 발생하지 않는다.
3. 브로셔 보기, 공개 상세 본문, 웰컴 메시지·이미지에 대한 본문·파일명·URL 수집은 하지 않는다.
4. 상담 CTA가 비활성(`offline`, `paused`)이면 클릭 이벤트를 보내지 않는다.
5. 실제 분석 SDK 계약이 확정되기 전에는 이벤트를 외부 전송하지 않는다.

## 후속 작업

- 메인 Developer: 분석 SDK·공통 이벤트 함수가 확정되면 위 4개 이벤트를 구현한다.
- 학교 Developer: `university-publication` v2 계약에 소속구분 상태·자산 존재 여부를 제공한다.
- 학생 Developer: 상담 시작 완료 전환을 같은 `universityId`, `affiliationId` 맥락으로 후속 측정할 수 있게 인계한다.
