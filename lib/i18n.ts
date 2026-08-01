export type Locale = "en" | "hi";

export type MessageKey =
  | "brand"
  | "brandShort"
  | "loading"
  | "setupSubtitle"
  | "howToPlay"
  | "howStep1"
  | "howStep2"
  | "howStep3"
  | "howStep4"
  | "pointsStrip"
  | "playersLabel"
  | "botsFill"
  | "allHumans"
  | "namesLabel"
  | "playerPlaceholder"
  | "targetLabel"
  | "targetHelp"
  | "startGame"
  | "resumeGame"
  | "resumeHint"
  | "recentMatches"
  | "won"
  | "quit"
  | "roundTarget"
  | "stepChit"
  | "stepRaja"
  | "stepMantri"
  | "stepResult"
  | "handoffTitle"
  | "handoffOnly"
  | "handoffUnlock"
  | "chitHint"
  | "tapReveal"
  | "youAre"
  | "seenPass"
  | "rajaEyebrow"
  | "rajaLine"
  | "rajaCta"
  | "mantriAsk"
  | "botThinking"
  | "resultTitle"
  | "resultCorrect"
  | "resultWrong"
  | "accused"
  | "total"
  | "nextRound"
  | "seeWinner"
  | "wins"
  | "shareWin"
  | "gameOverMeta"
  | "playAgain"
  | "newGame"
  | "langEn"
  | "langHi"
  | "langToggleAria"
  | "themeLight"
  | "themeDark"
  | "themeToggleAria"
  | "navHowToPlay"
  | "navPrivacy"
  | "navTerms"
  | "maintainedBy"
  | "backToGame"
  | "playNow"
  | "legalUpdated"
  | "restoreFailed"
  | "youBadge"
  | "leading"
  | "tiedLeading";

type Dict = Record<MessageKey, string>;

const en: Dict = {
  brand: "Raja, Mantri & Sipahi",
  brandShort: "Raja Mantri",
  loading: "Loading…",
  setupSubtitle: "A 4-player pass-the-phone game. Find the Chor.",
  howToPlay: "How to play?",
  howStep1: "Everyone gets a secret chit (role).",
  howStep2: "Raja is shown to everyone.",
  howStep3: "Mantri guesses who the Chor is.",
  howStep4: "Right → Mantri 800. Wrong → Chor gets 800. Raja 1000, Sipahi 500.",
  pointsStrip: "Raja 1000 · Mantri 800 · Sipahi 500 · Chor 0",
  playersLabel: "How many people are playing?",
  botsFill: "{n} bot(s) will join the others.",
  allHumans: "All 4 seats are people — no bots.",
  namesLabel: "Enter names",
  playerPlaceholder: "Player {n}",
  targetLabel: "Play until score",
  targetHelp: "First to reach this score wins.",
  startGame: "Start game",
  resumeGame: "Resume game",
  resumeHint: "You have an unfinished game.",
  recentMatches: "Recent matches",
  won: "won",
  quit: "Quit",
  roundTarget: "Round {round} · to {target}",
  stepChit: "Chit",
  stepRaja: "Raja",
  stepMantri: "Mantri",
  stepResult: "Result",
  handoffTitle: "Pass the phone to {name}",
  handoffOnly: "Only {name} should look",
  handoffUnlock: "I am {name} — show chit",
  chitHint: "Tap the chit to see your role. Keep it secret!",
  tapReveal: "Tap to reveal",
  youAre: "You are {role} — {points}",
  seenPass: "I have seen it — pass the phone",
  rajaEyebrow: "Everyone can look",
  rajaLine: "{raja} is Raja. {mantri} is Mantri — find the Chor.",
  rajaCta: "Mantri, choose now",
  mantriAsk: "{name}, who is the Chor?",
  botThinking: "{name} is thinking…",
  resultTitle: "Round {round} result",
  resultCorrect: "Caught! That was the Chor.",
  resultWrong: "Wrong — {chor} was the Chor. Points swapped.",
  accused: "{mantri} accused {guess}.",
  total: "total {score}",
  nextRound: "Next round",
  seeWinner: "See who won",
  wins: "{name} wins!",
  shareWin: "{names} share the win!",
  gameOverMeta: "Target {target} · {rounds} rounds",
  playAgain: "Play again",
  newGame: "New game",
  langEn: "EN",
  langHi: "हिं",
  langToggleAria: "Switch language",
  themeLight: "Light",
  themeDark: "Dark",
  themeToggleAria: "Switch color theme",
  navHowToPlay: "How to play",
  navPrivacy: "Privacy Policy",
  navTerms: "Terms & Conditions",
  maintainedBy: "Maintained by",
  backToGame: "Back to game",
  playNow: "Ready to play?",
  legalUpdated: "Last updated: August 2026",
  restoreFailed: "Your previous game couldn't be restored.",
  youBadge: "You",
  leading: "Leading: {names}",
  tiedLeading: "Tied: {names}",
};

const hi: Dict = {
  brand: "राजा, मंत्री और सिपाही",
  brandShort: "राजा मंत्री",
  loading: "लोड हो रहा है…",
  setupSubtitle: "४ खिलाड़ियों का खेल। फ़ोन घुमाओ। चोर पकड़ो।",
  howToPlay: "कैसे खेलें?",
  howStep1: "हर किसी को एक गुप्त चिट (भूमिका) मिलती है।",
  howStep2: "राजा सबको दिखाया जाता है।",
  howStep3: "मंत्री अनुमान लगाता है कि चोर कौन है।",
  howStep4: "सही → मंत्री ८००। गलत → चोर को ८००। राजा १०००, सिपाही ५००।",
  pointsStrip: "राजा १००० · मंत्री ८०० · सिपाही ५०० · चोर ०",
  playersLabel: "कितने लोग खेलेंगे?",
  botsFill: "{n} बॉट बाकी सीटें भरेंगे।",
  allHumans: "सभी ४ सीटें लोग — कोई बॉट नहीं।",
  namesLabel: "नाम लिखें",
  playerPlaceholder: "खिलाड़ी {n}",
  targetLabel: "कितने अंक तक?",
  targetHelp: "पहले इस अंक तक पहुँचने वाला जीतता है।",
  startGame: "खेल शुरू",
  resumeGame: "पिछला खेल जारी रखो",
  resumeHint: "एक अधूरा खेल बचा है।",
  recentMatches: "पिछले मैच",
  won: "जीते",
  quit: "छोड़ें",
  roundTarget: "राउंड {round} · लक्ष्य {target}",
  stepChit: "चिट",
  stepRaja: "राजा",
  stepMantri: "मंत्री",
  stepResult: "नतीजा",
  handoffTitle: "फ़ोन {name} को दो",
  handoffOnly: "सिर्फ {name} देखें",
  handoffUnlock: "मैं {name} हूँ — चिट दिखाओ",
  chitHint: "चिट पर टैप करो। अपनी भूमिका गुप्त रखो!",
  tapReveal: "टैप करके देखो",
  youAre: "आप {role} हैं — {points}",
  seenPass: "मैंने देख लिया — फ़ोन आगे दो",
  rajaEyebrow: "अब सब देख सकते हैं",
  rajaLine: "{raja} राजा हैं। {mantri} मंत्री हैं — चोर ढूँढो।",
  rajaCta: "मंत्री, अब चुनो",
  mantriAsk: "{name}, चोर कौन है?",
  botThinking: "{name} सोच रहा है…",
  resultTitle: "राउंड {round} का नतीजा",
  resultCorrect: "पकड़ लिया! वही चोर था।",
  resultWrong: "गलत — {chor} चोर था। अंक बदल गए।",
  accused: "{mantri} ने {guess} पर आरोप लगाया।",
  total: "कुल {score}",
  nextRound: "अगला राउंड",
  seeWinner: "देखो कौन जीता",
  wins: "{name} जीत गए!",
  shareWin: "{names} बराबर जीते!",
  gameOverMeta: "लक्ष्य {target} · {rounds} राउंड",
  playAgain: "फिर से खेलो",
  newGame: "नया खेल",
  langEn: "EN",
  langHi: "हिं",
  langToggleAria: "भाषा बदलें",
  themeLight: "लाइट",
  themeDark: "डार्क",
  themeToggleAria: "थीम बदलें",
  navHowToPlay: "कैसे खेलें",
  navPrivacy: "गोपनीयता नीति",
  navTerms: "नियम और शर्तें",
  maintainedBy: "संचालन",
  backToGame: "खेल पर वापस",
  playNow: "खेलने के लिए तैयार?",
  legalUpdated: "अंतिम अपडेट: अगस्त २०२६",
  restoreFailed: "पिछला खेल बहाल नहीं हो सका।",
  youBadge: "आप",
  leading: "आगे: {names}",
  tiedLeading: "बराबर: {names}",
};

const dictionaries: Record<Locale, Dict> = { en, hi };

export function t(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let text = dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "hi";
}
