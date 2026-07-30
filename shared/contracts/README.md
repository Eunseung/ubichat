# Shared Contracts

스쿼드 간 데이터와 동작의 공개 인터페이스다.

중요 계약 변경 또는 모호한 요청은 `../USER_CONFIRMATION_POLICY.md`에 따라 사용자 확인 후 진행한다.

| 계약 | Steward | 소비자 |
|---|---|---|
| `university-publication.md` | 학교 | 어드민, 메인, 학생 |
| `content.md` | 어드민 | 메인 |
| `ad-slot.md` | 어드민 | 메인 |
| `navigation-auth.md` | 학생 | 메인 |
| `analytics-events.md` | 메인 | 어드민, Product Owner |
| `platform-notices.md` | 어드민 | 학생, 학교 |

## 변경 규칙

1. `shared/change-requests/TEMPLATE.md`로 변경 이유와 영향을 기록한다.
2. Steward가 schema와 호환성을 검토한다.
3. 모든 소비 스쿼드가 영향을 확인한다.
4. 사업 규칙·권한·KPI 변경은 Product Owner가 결정한다.
5. 계약과 구현을 같은 작업에서 동기화한다.
6. 기존 필드 삭제보다 단계적 추가·폐기를 우선한다.
