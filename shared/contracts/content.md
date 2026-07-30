# Content Contract

## 목적

어드민이 관리하는 콘텐츠를 메인이 목록·상세·관련 대학 탐색 경험으로 제공한다.

현재 구현 전 기획 계약이다. 필드와 상태 변경은 어드민·메인·Product Owner가 함께 확정한다.

## Steward와 소비자

- Steward: 어드민 Product Manager·Developer
- 사업·편집 정책 승인: Product Owner
- 공개 렌더링·분석: 메인

## 기본 데이터

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
└─ seo.title / seo.description
```

## 상태

- `draft`: 작성 중
- `review`: 검토 중
- `scheduled`: 예약 게시
- `published`: 공개 가능
- `hidden`: 공개 중단

## 책임

- 어드민: 작성, 수정, 검토, 예약, 게시, 비공개
- 메인: `published` 콘텐츠 렌더링, 탐색·상세·관련 대학 연결
- Product Owner: 콘텐츠 전략, 유형, 편집 원칙, KPI

## 불변 조건

- `published`가 아닌 콘텐츠는 공개 화면에 표시하지 않는다.
- 예약 콘텐츠는 지정 시각 전 노출하지 않는다.
- 일반 콘텐츠와 광고 콘텐츠를 구분한다.
- 관련 대학 ID가 유효하지 않아도 콘텐츠 본문은 안전하게 표시한다.
- 학생 개인정보와 상담 내용을 콘텐츠 payload에 포함하지 않는다.
- 메인은 CMS 상태를 변경하지 않는다.

## 구체화 필요

- 콘텐츠 유형과 카테고리
- 작성·검토 권한
- 예약 게시 시간대
- 외부 링크 정책
- 다국어 필드
- 광고성 콘텐츠 표기
- 수정·게시 이력
