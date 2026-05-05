# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 사이트 실행하기

이것은 빌드 과정이 필요 없는 정적 HTML/CSS/JavaScript 사이트입니다. `index.html`을 브라우저에서 열기만 하면 됩니다.

- **브라우저에서**: `index.html`을 직접 열기 (file:// 프로토콜 작동)
- **로컬 서버** (선택): `python -m http.server` 또는 유사한 도구로 디버깅 향상
- **의존성**: Tailwind CSS는 CDN에서 로드되며, 나머지는 모두 바닐라 JavaScript

## 프로젝트 구조

의도적으로 단순하게 설계됨 - 단일 HTML 파일과 두 개의 폴더:

- **index.html**: 모든 마크업. Tailwind CSS(CDN) + 커스텀 `css/styles.css` 사용
- **css/styles.css**: 대화형 UI를 위한 커스텀 스타일 (편집 모드 테두리, 모달, 애니메이션, 호버 효과)
- **js/script.js**: 모든 애플리케이션 로직 - 외부 프레임워크 미사용

**데이터 흐름:**
1. `DEFAULT_DATA` (JS에 하드코딩됨)는 초기 포트폴리오 콘텐츠 포함
2. 로드 시 `loadData()`가 localStorage에서 데이터 가져옴. 첫 방문 시 기본값 사용
3. `renderPage(data)`가 데이터 객체에서 모든 요소 채움
4. 편집 모드는 인라인 `contentEditable` + 복잡한 필드용 모달 사용
5. 저장 시 `collectEditableText()`로 데이터 객체에 변경사항 동기화, `saveData()`로 localStorage에 저장

## 편집 모드 & 비밀번호

- 비밀번호는 localStorage (`portfolio_password` 키)에 저장됨
- 편집 모드는 플로팅 편집 버튼 클릭으로 활성화되며, 비밀번호 모달 표시
- 편집 모드 진입 후:
  - 모든 `[data-editable]` 요소가 `contentEditable`로 활성화됨
  - 스킬 태그는 삭제 버튼과 추가 버튼 표시
  - 프로젝트 카드는 구조화된 필드(제목, 설명, 태그, 링크) 편집용 모달 표시
  - GitHub/LinkedIn URL은 별도 입력 필드 제공
- 저장하지 않고 편집 모드 종료 시 변경사항 폐기 (`snapshotData`에 저장된 스냅샷으로 복구)

## 주요 구현 세부사항

**편집 가능 요소**: 인라인 편집 가능하게 하려면 `data-editable` 속성으로 요소 표시. 편집 모드 코드가 자동으로 이 요소들을 찾아 `contentEditable` 활성화

**스킬**: 프론트엔드/백엔드 스킬 목록은 동적 렌더링 + 편집 제어(삭제 버튼, 추가) 사용. 변경사항은 저장할 때만 반영

**프로젝트**: 프로젝트 배열을 카드로 렌더링. 편집 시 복잡한 필드의 인라인 편집을 피하기 위해 모달 다이얼로그 사용. 태그는 `modalTags`에서 별도 관리

**연락처 링크**: 이메일, GitHub, LinkedIn은 편집 가능. GitHub와 LinkedIn은 표시 텍스트와 URL이 분리되어 있으므로 URL 입력 필드도 제공

**모달 시스템**: 커스텀 모달(비밀번호, 프로젝트 편집, 비밀번호 변경)은 CSS 오버레이 + `.hidden` 클래스 토글 사용. 외부 라이브러리 미사용

## 스타일링 주의사항

- Tailwind CSS가 모든 유틸리티 클래스 제공. `css/styles.css`의 커스텀 CSS는:
  - `.edit-mode` 클래스를 body에 토글하여 편집 모드 스타일 표시 (점선 테두리, 호버 상태)
  - 네비게이션 링크 언더라인 애니메이션 (`.nav-link::after`)
  - 프로젝트 카드 호버 효과 (약간의 상승 + 그림자)
  - 스킬 태그 스케일 및 호버 시 발광
  - 편집 툴바 및 플로팅 버튼 스타일
  - 모달 및 폼 스타일
