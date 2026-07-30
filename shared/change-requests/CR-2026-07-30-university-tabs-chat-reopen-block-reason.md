# Shared Change Request

- 요청 ID: CR-2026-07-30-university-tabs-chat-reopen-block-reason
- 날짜: 2026-07-30
- 요청 스쿼드: Product Owner
- Owner: 학교 PM·Designer·Developer
- 필수 검토자: 메인·학생·어드민 PM·Developer
- 근거: D-023
- 대상: `university-admin.html`, `university-data.js`, `shared/contracts/university-publication.md`, 상담 상태·감사 형식
- 변경:
  - `입학 안내 자료` PDF 전용 업로드
  - 공개 상세 탭 `id`, `title`, `content`, `order`, `enabled` 및 기숙사 사진 목록
  - 종료 채팅의 학교측 재개 이벤트와 학생 시스템 메시지
  - 차단 사유 `advertising | abuse | other`, `other` 상세 사유 필수
- 공개 렌더링: 메인은 활성 탭만 순서대로 표시한다. `기숙사 사진`은 캐러셀이다.
- 보안·권한: 배정 소속구분 관계자만 재개·차단한다. 학생 문서 원본과 메시지 본문을 공통 데이터·감사 상세에 넣지 않는다.
- 호환성: 기존 `apostille` 문서 값은 학생 화면의 `공증문서` 표기와 연결한다. 기존 종료 채팅·차단 이력은 보존한다.
- 검증: PDF 형식 오류, 탭 활성·비활성·순서, 사진 없음·1장·복수, 종료→재개 동기화, 차단 사유 조건부 검증, 감사 필드 누락, JavaScript 문법
- 사용자 사전 승인: 2026-07-30 내부 보고 수정 지시
- 사용자 최종 확인: 대기
