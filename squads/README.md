# UBIChat 실행 스쿼드

| 폴더 | 세션명 | 담당 |
|---|---|---|
| `student/` | 학생 스쿼드 | 인증, 내 상담, 채팅, 문서, 프로필 |
| `university/` | 학교 스쿼드 | 대학 상담 운영, 멤버, 공개정보 입력·게시 |
| `admin/` | 어드민 스쿼드 | 승인, 계정, 감사, 콘텐츠·광고 운영 |
| `main/` | 메인·탐색·콘텐츠 스쿼드 | 랜딩, GNB, 대학 탐색·상세, 콘텐츠, 광고 노출 |

각 스쿼드는 `PRODUCT_MANAGER.md`, `DESIGNER.md`, `DEVELOPER.md` 역할을 가진다. 세션 시작 시 해당 폴더의 `AGENTS.md`가 요청을 역할로 라우팅한다.

사업 방향·우선순위·공통 정책은 `product-owner/`에서 결정한다.

모든 스쿼드는 `shared/USER_CONFIRMATION_POLICY.md`를 따른다. 중요 정책과 모호한 요청은 사용자 승인 전 실행하지 않는다.
