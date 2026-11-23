# Decisions and open questions

## Decision log

| Date | Decision | Rationale | Status |
| --- | --- | --- | --- |
| Nov 2026 | Use UniBridge as the working project name | Agreed in team planning | Adopted |
| Nov 2026 | Validate onboarding needs before building AI features | Reduce scope and misinformation risk | Adopted |
| 22 Nov 2026 | Build the interim prototype as a static web app (Vite + React + TypeScript) on GitHub Pages, not yet as an Expo app | A link and a QR code work on any phone during a Zoom call; no install, no backend, no accounts | Adopted |
| 23 Nov 2026 | Make **Life Translator** (생활 번역기) the main feature and the first thing on the home page | The organisers' topic is adaptation in the first weeks ("Cultural Inclusion for International Students"), not admission. The prototype previously led with university search | Adopted |
| 23 Nov 2026 | Every Life Translator card shows a status, a check date and its sources | More than ten facts changed in the twelve months before our check ([FACT_CHECK_2026-11-23.md](research/FACT_CHECK_2026-11-23.md)); the date is what makes the cards trustworthy | Adopted |
| 23 Nov 2026 | Universities: Salymbekov University (KG) against the HUSS consortium universities and Salymbekov's Korean MoU partners (Inha University, Inha Technical College) | Own university gives access to students; HUSS partners can help with Korean data. Inha's capstone role is still to be confirmed with the organisers | Adopted, to confirm |
| 23 Nov 2026 | Interface languages EN / RU / KO. Russian, not Kyrgyz, is the working language for help in Korea | No official Korean channel we checked supports Kyrgyz; 1345 and Papago support Russian ([COMPARISON_MATRIX.md](research/COMPARISON_MATRIX.md)) | Adopted. Korean texts still need a native speaker's proofreading |
| 23 Nov 2026 | Visual identity "two flags, one bridge": ink #0E1B33, taegeuk blue #1F3C88, Kyrgyz red #C8102E as a rare KG accent, gold #E8A317 as a tiny accent; Pretendard (+ Inter for Cyrillic) and Unbounded for large headings | Replace the default template look with something tied to both countries. Every text colour pair is checked against WCAG AA in `web/src/styles/tokens.css` | Adopted |
| 23 Nov 2026 | Position UniBridge as a connecting layer to official services (HiKorea, 1345, Danuri, e-Visa), not a replacement | See [COMPETITORS.md](research/COMPETITORS.md) | Adopted |
| 23 Nov 2026 | The KR → KG direction is the mirror half of the product, not the main market | Nobody counts Korean students in Kyrgyzstan; the same structure can later serve English-speaking medical students in Bishkek | Adopted |

## Open questions

- What do new students themselves find hardest in the first weeks? Only interviews can answer this; none have been done.
- Which Korean partner team can help arrange 3–5 short interviews with international students, and who can proofread the Korean texts?
- What role do Inha University and Inha Technical College play in the capstone? Is Pukyong National University part of it?
- Does the September 2026 Kyrgyz registration procedure apply to students (Resolution No. 600 vs the 21 Nov 2026 ministry statement)?
- Who will re-check every card once a semester, and how?
- Is a chatbot useful, or is structured, dated guidance more reliable?
