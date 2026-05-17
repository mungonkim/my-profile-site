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
- **css/styles.css**: 포트폴리오 디스플레이 스타일 (네비게이션 애니메이션, 카드 호버 효과 등)
- **js/script.js**: 렌더링 로직 - 외부 프레임워크 미사용

**데이터 흐름:**
1. `DEFAULT_DATA` (js/script.js에 하드코딩됨)가 포트폴리오 콘텐츠 제공
2. 초기화 시 `renderPage(data)`가 DEFAULT_DATA를 DOM에 채움
3. 이것이 전부 — localStorage나 편집 기능 없음 (정적 포트폴리오)

## 콘텐츠 업데이트

포트폴리오 내용을 수정하려면 `js/script.js`의 `DEFAULT_DATA` 객체를 직접 편집하세요:

```javascript
const DEFAULT_DATA = {
    hero: { /* 수정 */ },
    about: { /* 수정 */ },
    skills: { /* 수정 */ },
    projects: [ /* 수정 */ ],
    contact: { /* 수정 */ }
};
```

변경 후 파일을 저장하면 브라우저 새로고침 시 업데이트됨.

## 스타일링 주의사항

- Tailwind CSS가 모든 유틸리티 클래스 제공
- `css/styles.css`의 커스텀 CSS:
  - 네비게이션 링크 언더라인 애니메이션 (`.nav-link::after`)
  - 프로젝트 카드 호버 효과 (상승 + 그림자)
  - 스킬 태그 스케일 및 호버 발광
  - 부드러운 스크롤 및 섹션 여백

## 코드 스타일

- **주석**: 모든 코드 주석(HTML, CSS, JavaScript)은 **한글**로 작성하세요
  - 예: `// 프로필 사진 로드` (O)
  - 예: `// Load profile image` (X)
- 의미 있는 변수명과 함수명으로 작성하여 주석의 필요성을 최소화하세요
