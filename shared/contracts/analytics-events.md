# Analytics Events Contract

## 목적

유입·탐색·상담·콘텐츠·광고 퍼널을 스쿼드 간 같은 이름으로 측정한다.

## 명명 규칙

```text
domain.object.action
```

예:

- `main.landing.view`
- `discovery.university.list_view`
- `discovery.university.detail_view`
- `student.consultation.start_click`
- `content.article.list_view`
- `content.article.detail_view`
- `ad.slot.impression`
- `ad.slot.click`

## 공통 속성

- `timestamp`
- `sessionId`
- `authState`
- `sourcePage`
- `deviceType`
- 대상이 있으면 `universityId`, `contentId`, `slotId`

개인정보와 메시지 본문은 이벤트 속성에 포함하지 않는다.

## 책임

- 메인: 랜딩·탐색·콘텐츠·광고 이벤트
- 학생: 인증·상담 퍼널 이벤트
- 학교: 상담 운영 상태 이벤트
- 어드민: 승인·게시·구좌 운영 이벤트
- Product Owner: KPI와 이벤트의 연결 승인

## 변경 조건

- KPI 정의 변경
- 이벤트 이름 삭제·대체
- 개인정보가 포함될 가능성
- 여러 스쿼드가 같은 행동을 다른 이름으로 기록하는 경우
