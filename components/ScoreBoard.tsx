import type { Player } from "@/lib/types";

interface ScoreBoardProps {
  players: Player[];
  highlightIds?: string[];
  compact?: boolean;
}

const RANK_COLORS = [
  "var(--score-1)", // max — green
  "var(--score-2)", // blue
  "var(--score-3)", // yellow
  "var(--score-4)", // red
] as const;

function rankColor(players: Player[], score: number): string {
  const unique = [...new Set(players.map((p) => p.score))].sort(
    (a, b) => b - a,
  );
  const rank = unique.indexOf(score);
  return RANK_COLORS[Math.min(Math.max(rank, 0), RANK_COLORS.length - 1)];
}

export function ScoreBoard({
  players,
  highlightIds = [],
  compact = false,
}: ScoreBoardProps) {
  const ranked = [...players].sort((a, b) => b.score - a.score);
  const highlight = new Set(highlightIds);

  if (compact) {
    return (
      <ul className="score-compact" aria-label="Scores">
        {ranked.map((player, index) => (
          <li
            key={player.id}
            className="score-compact-item"
            style={{ color: rankColor(players, player.score) }}
          >
            <span className="score-compact-name">{player.name}</span>
            <span aria-hidden>: </span>
            <span className="score-compact-points tabular-nums">
              {player.score}
            </span>
            {index < ranked.length - 1 ? (
              <span className="score-compact-sep" aria-hidden>
                ,
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol className="flex flex-col gap-2 w-full">
      {ranked.map((player, index) => (
        <li
          key={player.id}
          className={[
            "flex items-center justify-between gap-3 px-3 py-2 rounded-lg",
            highlight.has(player.id)
              ? "bg-[var(--accent-soft)] text-[var(--ink)]"
              : "bg-[var(--surface)] text-[var(--ink)]",
          ].join(" ")}
        >
          <span className="text-[var(--ink-muted)] text-sm w-5">
            {index + 1}
          </span>
          <span className="font-medium flex-1 truncate">{player.name}</span>
          <span
            className="tabular-nums font-semibold"
            style={{ color: rankColor(players, player.score) }}
          >
            {player.score}
          </span>
        </li>
      ))}
    </ol>
  );
}
