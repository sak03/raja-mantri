# Raja, Mantri & Sipahi

A browser-based, pass-and-play Indian chits (parchi) game. No backend — everything runs client-side and persists in `localStorage`.

**UI languages:** English (default) · Hindi (top-right `EN | हिं` toggle)  
**Theme:** Light (default) · Dark (top-right `Light | Dark` toggle)

## Setup

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to your live domain
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy / SEO domain

Recommended subdomain: **`raja-mantri.sartajalam.in`** (matches search keywords better than `chits`).

```bash
NEXT_PUBLIC_SITE_URL=https://raja-mantri.sartajalam.in
```

After deploy: submit `https://your-domain/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Run tests

```bash
npm test
# or watch mode
npm run test:watch
```

## Rules

Four roles with fixed points each round:

| Role   | Points |
|--------|--------|
| Raja   | 1000   |
| Mantri | 800    |
| Sipahi | 500    |
| Chor   | 0      |

1. Four chits are shuffled and dealt secretly (one per player).
2. The **Raja** is revealed and orders the **Mantri** to find the **Chor**.
3. The Mantri guesses which of the two hidden players is the Chor.
4. Correct guess → Mantri keeps 800, Chor gets 0. Wrong → they swap (Mantri 0, Chor 800). Raja always 1000, Sipahi always 500.
5. Points accumulate. First to the target score wins (default 5000). Ties at the top are shared wins.

## How to play (on device)

1. Choose how many people are playing (1–4) and enter **unique** names (case-insensitive; empty names blocked). Set a target score up to **20000**.
2. Pass the phone — each person unlocks their turn, peeks at their chit, then taps **I have seen it**.
3. Everyone sees who the Raja is; Mantri picks the Chor.
4. Check the result and keep playing until someone hits the target.

## Modes

Always 4 seats. Choose 1–4 humans; bots fill the rest (`Bot 1`, `Bot 2`, …). Humans share one device (pass-and-play). When a bot is Mantri, it guesses at random (50/50).

## Persistence

Game state is saved to `localStorage` so you can resume after refresh (use **Resume game** on the setup screen). Language and theme preferences are also saved. Use **New game** / Quit to start fresh. Finished matches are kept in a short local history (last 10). If a save is from an older app version and cannot be restored, the setup screen shows a notice and clears that save.

## Project layout

- `lib/` — pure game rules + i18n dictionaries
- `components/` — thin React UI screens
- `hooks/useGame.ts` — client state + localStorage sync
- `__tests__/` — Vitest unit + RTL smoke tests
