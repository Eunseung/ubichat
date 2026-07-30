# Platform Notice Contract

## 목적

플랫폼 관리자가 로그인한 학생·학교 사용자에게 운영 공지를 전달한다. 공개 콘텐츠 CMS와 대학 자체 안내는 이 계약에 포함하지 않는다.

## Steward와 소비자

- Steward: 어드민 PM·Developer
- 사업·노출 정책 승인: Product Owner
- 소비자: 학생·학교 PM·Designer·Developer

## 데이터

```text
PlatformNotice
├─ id
├─ title
├─ summary
├─ body
├─ audience: all | student | university
├─ status: draft | published | hidden
├─ important: boolean
├─ author
├─ publishedAt
└─ updatedAt
```

## 상태

- `draft`: 게시 예정. 학생·학교 화면에 노출하지 않는다.
- `published`: 게시 중. 지정 대상에게 노출한다.
- `hidden`: 종료. 학생·학교 화면에 노출하지 않는다.

## 노출

- `all`: 로그인 학생과 로그인 학교 구성원
- `student`: 로그인 학생만
- `university`: 로그인 학교 구성원만
- `important=true`: 대상 화면의 최상단에 우선 노출
- 학생: 프로필 메뉴의 `공지사항` 페이지
- 학교: 홈 공지 위젯과 `전체 보기` 페이지

## 책임

- 플랫폼 어드민: 작성, 수정, 대상 지정, 중요 표시, 게시, 종료
- 학생·학교: 게시 중인 자기 대상 공지를 읽기 전용으로 표시
- 대학 구성원: 공지 작성·수정·게시 불가

## 불변 조건

- 로그인하지 않은 사용자는 플랫폼 공지를 볼 수 없다.
- 대상이 아닌 역할에는 공지를 노출하지 않는다.
- 공개 콘텐츠 CMS의 게시 상태와 플랫폼 공지 상태를 혼용하지 않는다.
- 학생 개인정보, 상담 원문, 학생 문서 정보는 공지 payload에 포함하지 않는다.
- 공지 종료는 레코드를 삭제하지 않고 `hidden`으로 전환한다.
