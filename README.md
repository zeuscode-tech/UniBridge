# UniBridge

**Digital assistant for international students** · HUSS Global Capstone Design project concept

> **Status (23 Nov 2026):** desk research and a working web prototype. **Live:** <https://zeuscode-tech.github.io/UniBridge/> · Life Translator: <https://zeuscode-tech.github.io/UniBridge/#/life>. No interviews, surveys or usability tests have been done yet, and there is no AI assistant.

## Problem

New international students need clear, current information for their first weeks: taxi, transport card, bank, SIM, registration, insurance, emergency numbers. In both Korea and Kyrgyzstan this information is scattered, often not in a language the newcomer reads, and changes every few months. In Korea, 50.1% of international students are below the recommended language level ([Korea JoongAng Daily](https://www.koreajoongangdaily.com/korea/korean-universities-race-to-attract-international-students-but-fail-to-retain-them/12529877)) and university dropout rose to 7.1% in 2024 ([Korea Times](https://www.koreatimes.co.kr/amp/southkorea/education/20250722/do-korean-universities-really-understand-what-international-students-need)); in Kyrgyzstan, student visas fell about fourfold in 2025 ([24.kg](https://24.kg/english/347565_Foreign_students_leaving_Kyrgyzstan_Number_of_visas_drops_fourfold)). Details and sources: [problem statement](docs/research/PROBLEM_STATEMENT.md).

## What exists now

**Life Translator / 생활 번역기** translates everyday life, not words. Pick the app you use at home and see what replaces it in the other country, what you need to start, and where the barriers are:

- 19 everyday needs, both directions (KG → KR and KR → KG), search in English, Russian and Hangul.
- Every card has a status, a check date (23 Nov 2026) and its sources. Where no equivalent exists, the card is marked as a **barrier**; these feed the comparison matrix.
- Interface in English, Russian and Korean. The Korean texts have not yet been proofread by a native speaker.
- University catalogue led by Salymbekov University and the Korean HUSS and MoU partner universities; a first-weeks checklist saved in the browser; QR code and share link for phones.

The web prototype is static (Vite + React + TypeScript, hash routing) and deploys to GitHub Pages on every push to `main`. See [web/README.md](web/README.md).

## Research

- [Problem statement](docs/research/PROBLEM_STATEMENT.md): who, what barrier, evidence, limitations.
- [Comparison matrix](docs/research/COMPARISON_MATRIX.md): five criteria (findability, clarity, language accessibility, completeness, actionability), scored only where there is evidence.
- [Fact-check of 23 Nov 2026](docs/research/FACT_CHECK_2026-11-23.md): what we got wrong and corrected.
- [Competitors](docs/research/COMPETITORS.md): nothing maps apps in both directions between Korea and Kyrgyzstan.
- [Sources](docs/research/SOURCES.md): every link we used.

All of this is desk research. Interviews and usability tests are planned, not done ([roadmap](docs/ROADMAP.md)).

## Milestones

| Date | Deliverable | Status |
| --- | --- | --- |
| 24 Nov 2026 | Problem statement, sources, draft comparison, web prototype, 5-minute interim talk | Done, except interviews |
| Dec 2026 | Interviews, usability test, MVP decision (web or Expo) | Planned |
| 25–29 Jan 2027 | Final presentation with findings and recommendations | Planned |

## Technology

- **Now:** static web app, Vite + React 18 + TypeScript, GitHub Pages
- **Mobile (later, if interviews support it):** React Native + Expo
- **Backend (if needed):** Python + FastAPI
- **Database (if needed):** PostgreSQL
- **Design:** Figma
- **AI (stretch goal):** LLM API with retrieval from vetted sources, not uncontrolled generation

The stack and MVP scope may change after user discovery. No production systems or services are currently represented by this repository.

## Documentation

- [Web prototype](web/README.md)
- [Research](docs/research/)
- [Project brief](docs/PROJECT_BRIEF.md)
- [Research plan](docs/RESEARCH_PLAN.md)
- [MVP scope](docs/MVP_SCOPE.md)
- [User flows](docs/USER_FLOWS.md)
- [Proposed architecture](docs/ARCHITECTURE.md)
- [Roadmap and backlog](docs/ROADMAP.md)
- [Interim presentation: 5-minute script](docs/PRESENTATION_OUTLINE.md)
- [Privacy and safety](docs/PRIVACY_AND_SECURITY.md)
- [Decisions and open questions](docs/DECISIONS.md)
- [Русская версия](README.ru.md)

## Contributing

Before submitting code, documentation, screenshots, test data, or design exports, read [CONTRIBUTING.md](CONTRIBUTING.md) and [privacy guidance](docs/PRIVACY_AND_SECURITY.md). Do not commit personal data or copies of team rosters / submitted forms.

## License

No open-source license has been selected yet. Until a license is explicitly added, the presence of source files in a public repository does not grant broad reuse rights.
