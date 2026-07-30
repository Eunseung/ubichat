# 어드민 스쿼드

플랫폼 운영자가 유학상담시스템을 안전하고 일관되게 운영하도록 만드는 스쿼드다.

## 소유 영역

- 대학 등록 신청 승인, 반려
- 플랫폼 계정과 권한 관리
- 운영 감사 로그 조회
- 콘텐츠 CMS의 작성, 검수, 예약, 게시, 비공개
- 광고 구좌의 생성, 수정, 기간, 순서, 노출 상태 관리
- 운영 상태와 예외 처리

핵심 구현 파일:

- `platform-admin.html`
- `audit-log-data.js`

## 경계

어드민 스쿼드는 대학 등록과 대학계정, 콘텐츠·광고 운영 상태를 관리한다. 학교 공개정보·자산의 게시 상태는 학교 스쿼드가 직접 관리한다.

다음 영역은 탐색·콘텐츠 스쿼드 소유다.

- 공개 콘텐츠와 광고의 화면 렌더링
- 광고 구좌의 공개 페이지 배치와 반응형 표현
- 대학 찾기, 검색, 필터, 정렬, 대학 상세 UX
- 콘텐츠 목록·상세·추천 UX

학생 상담 UX는 학생 스쿼드, 대학 담당자 운영 UX는 학교 스쿼드가 소유한다.

대학의 서류 요청, 학생 등록 문서 즉시 전송, 미등록 문서 업로드 후 전달은 학생·학교 스쿼드 범위다. 어드민은 학생 문서를 열람하거나 이 전송 화면을 만들지 않는다.

## 공통 계약

스쿼드 간 연동은 `shared/` 계약을 기준으로 한다.

- `shared/contracts/content.md`
- `shared/contracts/ad-slot.md`
- `shared/contracts/university-publication.md`
- `shared/contracts/analytics-events.md`
- `shared/contracts/navigation-auth.md`

계약 파일이 아직 없다면 임의 구현으로 대체하지 않는다. 필요한 필드, 상태, 이벤트, 권한을 변경 제안서로 작성하고 Product Owner 승인 후 공통 계약에 반영한다.

## AI 어시스턴트

- [AGENTS.md](./AGENTS.md): 역할 선택과 공통 행동 규칙
- [PRODUCT_MANAGER.md](./PRODUCT_MANAGER.md): 정책, 요구사항, 우선순위
- [DESIGNER.md](./DESIGNER.md): 운영자 경험과 UI 설계
- [DEVELOPER.md](./DEVELOPER.md): 구현, 데이터 처리, 검증
- [2026-07-29 P1 즉시 실행](./IMMEDIATE_ACTIONS_2026-07-29.md): 최신 작업 기준

## 세션 운영

1. 세션 시작 시 `README.md`, `AGENTS.md`, 담당 역할 문서를 읽는다.
2. 요청을 단일 역할 또는 역할 조합으로 분류한다.
3. 핵심 파일과 `shared/` 계약의 현재 상태를 확인한다.
4. 스쿼드 경계를 넘는 결정은 상대 스쿼드에 인계하거나 Product Owner에게 에스컬레이션한다.
5. 결정, 변경, 검증 결과를 해당 작업 기록에 남긴다.
