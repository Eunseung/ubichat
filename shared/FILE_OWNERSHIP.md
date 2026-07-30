# File Ownership

## 운영 원칙

- Owner: 파일 변경과 품질을 최종 책임지는 역할
- Required reviewers: 변경 전 반드시 영향을 확인할 역할
- 소비자는 Owner 승인 없이 공통 schema와 공개 인터페이스를 변경하지 않는다.
- 한 기능 때문에 여러 소유 파일을 바꿔야 하면 Product Manager가 인계 순서를 정한다.

## Product Owner·공통 기획

| 파일 | Owner | Required reviewers |
|---|---|---|
| `AGENTS.md` | Product Owner | 4개 스쿼드 PM |
| `README.md` | Product Owner | 관련 스쿼드 PM |
| `00_프로젝트_버전_안내.md` | Product Owner | 없음 |
| `UniChat_IA_플로우_정책_개선안.md` | Product Owner | 4개 스쿼드 PM |
| `회원_스쿼드별_IA_플로우_정책.md` | Product Owner | 4개 스쿼드 PM |
| `product-owner/**` | Product Owner | 관련 스쿼드 PM |
| `shared/contracts/**` | Product Owner | 계약별 Owner·소비 스쿼드 |

## 학생 스쿼드

| 파일 | Owner | Required reviewers |
|---|---|---|
| `login.html` | 학생 Developer | 메인 Developer |
| `signup.html` | 학생 Developer | 학생 PM·Designer |
| `student-desktop.html` | 학생 Developer | 학생 PM·Designer |
| `student-mobile.html` | 학생 Developer | 학생 PM·Designer |
| `student-session.js` | 학생 Developer | 메인 Developer |
| `student-university-directory.js` | 학생 Developer | 메인 Developer·학교 Developer |

## 학교 스쿼드

| 파일 | Owner | Required reviewers |
|---|---|---|
| `university-admin.html` | 학교 Developer | 학교 PM·Designer |
| 대학 공개정보 입력·게시 정책 | 학교 PM | 어드민 PM·메인 PM |

## 어드민 스쿼드

| 파일 | Owner | Required reviewers |
|---|---|---|
| `platform-admin.html` | 어드민 Developer | 어드민 PM·Designer |
| `audit-log-data.js` | 어드민 Developer | Product Owner |
| `shared/contracts/content.md` | 어드민 PM·Developer | 메인 PM·Developer |
| 콘텐츠 CMS·게시 상태 | 어드민 PM | 메인 PM |
| 광고 구좌 운영 정책 | 어드민 PM | 메인 PM·Product Owner |

## 메인·탐색·콘텐츠 스쿼드

| 파일 | Owner | Required reviewers |
|---|---|---|
| `index.html` | 메인 Developer | 메인 PM |
| `기업용_배너_포함.html` | 메인 Developer | 메인 PM·Designer |
| `기업용_배너_미포함.html` | 메인 Developer | 메인 PM·Designer |
| `landing.css` | 메인 Developer | 메인 Designer |
| `landing.js` | 메인 Developer | 메인 PM |
| `university-explore.html` | 메인 Developer | 메인 PM·Designer |
| `university-explore.js` | 메인 Developer | 학교 Developer |
| `university-detail.html` | 메인 Developer | 메인 PM·Designer |
| `university-detail.js` | 메인 Developer | 학교 Developer·학생 Developer |
| `assets/**` | 메인 Developer | 메인 Designer |

## 공동 계약 파일

| 파일 | Steward | Required reviewers |
|---|---|---|
| `university-data.js` | 학교 Developer | 어드민 Developer·메인 Developer |
| `ad-slot-data.js` | 어드민 Developer | 메인 Developer |
| `notice-data.js` | 어드민 Developer | 학생·학교 Developer |
| `unichat-brand.css` | 메인 Designer·Developer | 학생·학교·어드민 Designer |

`Steward`는 계약 구현을 관리한다. 사업 규칙 변경은 Product Owner 승인이 추가로 필요하다.
