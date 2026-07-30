# Shared

여러 스쿼드가 함께 사용하는 파일 소유권과 데이터 계약을 관리한다.

- `FILE_OWNERSHIP.md`: 파일별 소유자와 필수 검토자
- `USER_CONFIRMATION_POLICY.md`: 중요 정책·모호한 요청의 사용자 확인 게이트
- `contracts/`: 스쿼드 간 데이터·상태·이벤트 계약
- `change-requests/`: 공통 파일 변경 요청
- `HANDOFF_2026-07-29_CONFIRMED_POLICIES.md`: 2026-07-29 사용자 확정 정책과 스쿼드별 실행 인계

공통 파일도 단일 소유자를 둔다. 소비 스쿼드는 계약을 통해 사용하며 소유자 승인 없이 schema를 바꾸지 않는다.
