# Shared Change Request

- 요청 ID: CR-2026-07-29-student-consultation-affiliation-context
- 날짜: 2026-07-29
- 요청 스쿼드: 메인·탐색·콘텐츠
- 담당 역할: 메인 Developer
- 대상 소비자: 학생 PM·Developer
- 근거: D-013, D-015 (D-015 우선)
- 상태: D-015 기준으로 갱신

## 요청

공개 대학 카드·상세에서 전달한 `universityId`와 `affiliationId`를 학생 인증·가입 반환 경로와 `studentId + universityId + affiliationId` 독립 상담 채널에 보존한다.

## 불변 조건

1. 상담 채널과 이력은 `studentId + universityId + affiliationId`별로 독립한다. 학교는 한 운영 화면에서 배정 소속구분 채널을 관리한다.
2. 인증 전후 `universityId`와 `affiliationId`를 모두 유지한다.
3. 선택 소속구분은 독립 채널의 식별값이다. 공개 상세의 다른 소속구분으로 대체하지 않는다.
4. 메시지 본문·문서명·문서 URL은 분석 이벤트와 전달 로그에 넣지 않는다.

## 메인 전달 형식

```text
student-desktop.html?universityId={universityId}&affiliationId={affiliationId}
login.html?returnTo={encoded student-desktop URL}&universityId={universityId}&affiliationId={affiliationId}
```

## 학생 스쿼드 수용 기준

- 로그인·가입 뒤 반환된 학생 화면이 두 식별자를 유지한다.
- 같은 대학의 다른 `affiliationId`는 별도 채널·별도 목록 항목을 연다.
- 재상담은 같은 `studentId + universityId + affiliationId` 채널의 새 회차로 남는다.
- `affiliationId`가 없거나 유효하지 않으면 새 소속구분을 추정하지 않고 기존 안전 상태를 사용한다.

## 검토

- 학생 PM·Developer: 상담 맥락 저장 위치와 오류 상태 확정
- 메인 Developer: CTA URL 보존 확인
- 학교 Developer: 공개 소속구분 식별자 유효성 확인
