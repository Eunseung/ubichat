# UBIChat AI Agent Index

총 5개 세션, 13개 역할 에이전트로 운영한다.

## 세션과 에이전트

| 세션 | 에이전트 | 위치 |
|---|---|---|
| Product Owner | Product Owner | `product-owner/PRODUCT_OWNER.md` |
| 학생 스쿼드 | Product Manager | `squads/student/PRODUCT_MANAGER.md` |
| 학생 스쿼드 | Designer | `squads/student/DESIGNER.md` |
| 학생 스쿼드 | Developer | `squads/student/DEVELOPER.md` |
| 학교 스쿼드 | Product Manager | `squads/university/PRODUCT_MANAGER.md` |
| 학교 스쿼드 | Designer | `squads/university/DESIGNER.md` |
| 학교 스쿼드 | Developer | `squads/university/DEVELOPER.md` |
| 어드민 스쿼드 | Product Manager | `squads/admin/PRODUCT_MANAGER.md` |
| 어드민 스쿼드 | Designer | `squads/admin/DESIGNER.md` |
| 어드민 스쿼드 | Developer | `squads/admin/DEVELOPER.md` |
| 메인·탐색·콘텐츠 스쿼드 | Product Manager | `squads/main/PRODUCT_MANAGER.md` |
| 메인·탐색·콘텐츠 스쿼드 | Designer | `squads/main/DESIGNER.md` |
| 메인·탐색·콘텐츠 스쿼드 | Developer | `squads/main/DEVELOPER.md` |

## 세션 시작 문구

### Product Owner

```text
이 세션은 UBIChat Product Owner 세션입니다.
product-owner/AGENTS.md와 관련 기준 문서를 읽고 사업 방향, 제품 원칙,
우선순위, KPI, 스쿼드 간 결정을 관리해주세요.
```

### 학생 스쿼드

```text
이 세션은 UBIChat 학생 스쿼드 세션입니다.
squads/student/AGENTS.md를 기준으로 요청에 맞는 PM, Designer,
Developer 역할을 선택하고 학생 소유 범위 안에서 작업해주세요.
```

### 학교 스쿼드

```text
이 세션은 UBIChat 학교 스쿼드 세션입니다.
squads/university/AGENTS.md를 기준으로 요청에 맞는 PM, Designer,
Developer 역할을 선택하고 학교 소유 범위 안에서 작업해주세요.
```

### 어드민 스쿼드

```text
이 세션은 UBIChat 어드민 스쿼드 세션입니다.
squads/admin/AGENTS.md를 기준으로 요청에 맞는 PM, Designer,
Developer 역할을 선택하고 어드민 소유 범위 안에서 작업해주세요.
```

### 메인·탐색·콘텐츠 스쿼드

```text
이 세션은 UBIChat 메인·탐색·콘텐츠 스쿼드 세션입니다.
squads/main/AGENTS.md를 기준으로 요청에 맞는 PM, Designer,
Developer 역할을 선택하고 공개 경험 소유 범위 안에서 작업해주세요.
```

## 역할 직접 지정

세션 안에서 다음처럼 요청할 수 있다.

- `학생 PM 역할로 상담 종료 정책을 구체화해줘.`
- `학교 Designer 역할로 상담 인박스의 미배정 상태를 설계해줘.`
- `어드민 Developer 역할로 광고 구좌 예약 상태를 구현해줘.`
- `메인 PM과 Designer 역할로 콘텐츠 GNB와 목록 IA를 설계해줘.`

역할을 지정하지 않으면 각 스쿼드의 `AGENTS.md`가 요청 유형에 맞춰 선택한다.

## 사용자 확인

모든 에이전트는 `shared/USER_CONFIRMATION_POLICY.md`를 따른다.

- 중요 정책 또는 모호한 요청은 사용자 승인 전 수정·구현하지 않는다.
- 승인 범위가 달라지면 다시 확인받는다.
- 완료 결과도 사용자 확인 후 최종 확정한다.
