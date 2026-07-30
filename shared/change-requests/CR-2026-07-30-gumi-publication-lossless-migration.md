# CR-2026-07-30 — 구미대학교 기존 게시 데이터 무손실 확장

- 상태: 사용자 확정, P1 실행
- 근거: D-027
- 대상: `unichat.mock.gumi-publication.v1`에 이미 저장된 구미대학교 공개 스냅샷
- Owner: 학교 Developer — schema 변환·새 직접 게시 저장
- 소비 Owner: 메인 Developer — 구·신 schema 렌더링
- Required reviewers: 학교 PM·Designer, 메인 PM·Designer, 학생 Developer, 어드민 PM, Product Owner

## 호환 규칙

- 저장값 삭제·초기화·소비자 쓰기 금지
- 구 `dormitory` → `dormitory-intro`/`기숙사 소개`: 본문·순서·활성 상태 보존
- 누락 `dormitory-photos`: `enabled:false`, `dormitoryPhotos:[]`만 보완
- `입학 안내 자료`, `입학 일정` 등 기존 추가 탭: 그대로 보존
- 새 `schemaVersion` 저장: 학교 `직접 게시`에서만 실행

## 검증

- 배포 주소의 기존 구미 본문·탭·상담 정보가 마이그레이션 뒤 남음
- 사진 없는 새 탭이 공개 상세에 노출되지 않음
- 다음 직접 게시가 새 schema 저장·다른 탭 갱신을 수행함
- `gumi + affiliationId` 상담 CTA·로그인 반환 유지
