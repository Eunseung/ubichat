# Shared Change Request

- 요청 ID: CR-2026-07-29-university-publication-v2
- 날짜: 2026-07-29
- 요청 스쿼드: Product Owner
- 담당 역할: 학교 Developer (Steward)
- 대상 파일·계약: `shared/contracts/university-publication.md`
- 문제: 현행 계약은 대학 단위 공개 필드와 소속구분별 단일 `unitOwnerId`만 정의한다. D-013의 소속구분별 카드·상세·상담 맥락과 D-008의 복수 소속 배정·직접 게시를 안전하게 생산·소비할 필드가 없다.
- 제안 변경:
  1. 대학 단위 `publication.status`를 유지하고 각 `affiliations[]` 항목에 `publication.status`와 `publication.displayName`을 둔다. 두 상태가 모두 `published`일 때만 공개 카드·상세를 허용한다.
  2. 각 공개 소속구분에 `profile.headline`, `profile.intro`, `profile.fields[]`, `profile.programs[]`, `profile.benefits[]`, `visual.logo`, `visual.heroImage`, `profile.photos[]`, `profile.brochures[]`, `consultation.status`, `consultation.responseLabel`, `consultation.hours`, `consultation.languages[]`를 둔다. 사진은 `id`, `src`, `alt`, `isRepresentative`를, 브로셔는 `id`, `title`, `href`, `description`을 사용한다.
  3. `unitOwnerId`를 `unitOwnerIds[]`로 전환한다. `members[]`는 유지하며 한 계정의 여러 소속구분 배정을 허용한다. 대학별 `topOwnerId`의 정확히 1명 조건은 유지한다.
  4. 기존 대학 단위 `profile`·`visual`·`consultation`과 `profileDraft`는 읽기 호환 필드로만 유지한다. 신규 소속구분 카드 생성, 공개 상세, 직접 게시 흐름에는 사용하지 않는다.
  5. 메인은 학교 내부 `operatingProfiles`를 읽지 않고 확정 계약만 소비한다. 학생 상담 진입은 `universityId`, `affiliationId`를 모두 전달한다.
  6. 학생 상담 채널은 `studentId + universityId + affiliationId`별로 독립한다. 학생 목록과 학교 인박스는 같은 식별자로 별도 항목·별도 이력을 표시하며, 관계자는 배정 소속구분의 채널만 열람한다.
- 변경하지 않을 범위: 대학 등록 승인, 소속구분별 별도 대학 운영 페이지, 웰컴 메시지·이미지의 공개 상세 노출 금지, 자산 파일 저장·보존 정책, 분석 이벤트 본문
- 영향받는 스쿼드: 학교, 메인·탐색·콘텐츠, 학생, 어드민
- 호환성 위험: 대학 단위 소비자가 기존 공개 필드를 읽는다. `unitOwnerId`를 참조하는 목업은 배열 전환 전 안전한 읽기 호환이 필요하다. 소속구분 데이터가 없는 대학으로 임의 `general` 카드를 만들면 D-013을 위반한다.
- 마이그레이션: 기존 대학 단위 공개 데이터는 읽기 호환으로만 유지한다. 학교가 공개 소속구분을 지정·게시한 뒤 해당 값으로 공개 카드·상세를 생산한다. 더미 데이터는 실서비스 연동 완료로 표기하지 않는다.
- 검증 방법: 대학·소속구분 양쪽의 `published` 조건, 소속구분 3개 카드, 선택 소속구분별 자산·상담 설정 분리, 자산 빈 상태, 복수 소속구분 관리자 배정, `affiliationId`의 로그인·가입·소속구분별 독립 학생 채널 전달을 확인한다.
- Owner 승인: D-014, D-015, 사용자 승인 (2026-07-29)
- 필수 검토자 확인: 학교 Developer, 메인 Developer, 학생 Developer, 어드민 Developer 확인 대기
- Product Owner 결정 ID: D-014, D-015 (선행 D-008, D-013)
- 사용자 사전 승인: 있음 (2026-07-29)
- 사용자 승인 범위: 직접 게시 기준의 구 승인 흐름 제거, 대학·소속구분 공개 상태·표시명·상세·자산·상담 설정을 포함한 공개 계약 v2, 소속구분별 독립 상담 채널·독립 이력 확정
- 작업 완료 보고: PO 결정·변경 제안 기록 완료. 계약 본문 변경은 필수 검토 확인 뒤 진행한다.
- 사용자 최종 확인: 대기
