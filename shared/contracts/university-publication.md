# University Publication Contract

## 목적

대학 등록 승인 뒤 학교가 직접 게시한 대학 정보를 메인과 학생 화면이 같은 기준으로 표시한다.

## Steward와 소비자

- Steward: 학교 Developer
- 정책 승인: Product Owner
- 대학 등록 승인·대학계정 발급: 어드민
- 공개정보 생산·게시: 학교
- 공개 렌더링: 메인
- 상담 연결 소비자: 학생

## 현재 공개 데이터

```text
University
├─ id
├─ name.ko / name.en
├─ location.label
├─ fields[]
├─ visual.initials / logo / heroImage
├─ profile.verified / headline / intro / brochure
├─ organization.topOwnerId / affiliations[]
├─ publication.status / reason
├─ consultation.status / responseLabel / hours / languages
├─ account.status
└─ isDemo
```

## 상태

상태는 공개 노출과 대학 조직·계정 상태를 분리한다.

### organization

- 대학별 `top_owner`는 정확히 1명이다. 운영사가 별도 발급하거나 최초 대학 등록 신청 때 발급한다.
- `affiliations[]`는 대학 내 소속구분이다. 각 항목에는 `id`, `name`, `unitOwnerId`, `members[]`가 있다.
- 소속구분별 `unit_owner`는 정확히 1명이다. 운영사 또는 `top_owner`가 발급한다.
- 소속구분별 `member`는 여러 명일 수 있다. 운영사, `unit_owner` 또는 `top_owner`가 발급한다.
- `top_owner`는 대학 전체와 모든 소속구분을 관리한다. `unit_owner`와 `member`의 기본 업무 범위는 자기 소속구분이다.

### publication.status

- `published`: 공개 탐색·상세에 표시
- `hidden`: 공개 화면에 표시하지 않음

학교는 대학 등록 승인 후 공개 정보를 직접 게시·수정·숨김 처리한다. 로고·배경·사진·브로셔에도 별도 어드민 승인 흐름을 두지 않는다.

기존 `profileDraft`는 호환성 전환 기간에만 읽기 전용으로 유지한다. 신규 작성·변경 흐름은 사용하지 않는다.

### consultation.status

- `open`: 신규 상담 가능
- `offline`: 운영시간 외
- `paused`: 신규 상담 일시 중지

### account.status

- `active`: 운영 가능
- 그 외 상태 추가는 Product Owner·어드민 정책 확정 필요

## 책임

- 학교: 공개정보 내용, 자산, `published/hidden` 게시 상태
- 어드민: 대학 등록 승인·반려, 최고관리자·소속구분 관리자·멤버 계정 발급, 플랫폼 계정 상태
- 메인: 상태를 변경하지 않고 필터·렌더링
- 학생: 공개 상태와 상담 가능 상태를 확인한 뒤 상담 연결

## 불변 조건

- `published`가 아닌 대학은 공개 목록·상세에 노출하지 않는다.
- 학생 화면과 메인 화면은 동일한 대학 ID를 사용한다.
- 메인은 학교·어드민 상태를 임의로 보정하지 않는다.
- 공개정보가 없으면 안전한 빈 상태를 제공한다.
- 등록 승인 뒤 공개정보 변경은 어드민 검토·승인을 요구하지 않는다.

## 구미대학교 정적 프로토타입 동기화 — D-026

- 적용 범위: `universityId: gumi`만. 다른 대학은 현재 프로토타입 데이터와 D-017 노출 정책을 유지한다.
- 저장 키: `unichat.mock.gumi-publication.v1`
- 식별 단위: `universityId + affiliationId`
- 생산자: 학교 운영관리의 권한 있는 관계자가 `직접 게시`를 실행할 때 공개 데이터 스냅샷을 저장한다.
- 소비자: 메인 랜딩·대학 탐색·대학 상세·학생 상담 진입은 저장된 구미 소속구분 데이터를 읽는다. 소비자는 데이터를 수정하지 않는다.
- 동기화: 같은 탭은 `unichat:gumi-publication-updated`, 다른 탭은 `storage` 이벤트 뒤 같은 이벤트로 다시 렌더링한다. 정적 배포의 같은 브라우저·같은 origin에서만 보장한다.
- 허용 필드: 공개 표시명, 한 줄 소개, 상세 소개, 학과/지원 과정/기숙사, 공개 탭·순서·활성 상태, 상담 상태·응답 안내·운영 시간·상담 언어, 기존 정적 자산 참조.
- 제외: 새 로컬 이미지·PDF 업로드 파일의 영구 저장·탭 간 공유, 다른 브라우저·기기 실시간 동기화, 어드민 공개정보 승인.
- D-017 유지: 구미대학교를 포함한 현재 프로토타입 대학·소속구분의 전체 `published` 노출 상태는 바꾸지 않는다. 이 동기화에서 활성/비활성은 공개 상세 탭에만 적용한다.
