import { cn } from '@/lib/utils';
import { useTranscribeStore } from '@/store/useTranscribeStore';

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function SegmentList({ onSeek }: { onSeek: (t: number) => void }) {
  const data = useTranscribeStore(s => s.data);
  const cur = useTranscribeStore(s => s.currentTime);
  const segments = data?.segments ?? [];

  return (
    <div className="space-y-2 overflow-y-auto max-h-[58vh] pr-2">
      <div className="font-medium">Subtítulos por segmentos</div>
      {segments.map((s, i) => {
        const isActive = cur >= s.start && cur < s.end;
        const chip = s.top_emotion
          ? `${s.top_emotion.label} (${s.top_emotion.score.toFixed(2)})`
          : '—';
        return (
          <button
            key={`${s.start}-${i}`}
            onClick={() => onSeek(s.start + 0.01)}
            className={cn(
              'w-full text-left rounded-lg border px-3 py-2 hover:bg-accent',
              isActive && 'bg-accent'
            )}
          >
            <div className="text-[11px] text-muted-foreground">
              {fmt(s.start)} - {fmt(s.end)}
            </div>
            <div className="truncate">{s.text}</div>
            <div className="mt-1 inline-flex text-[11px] px-1.5 py-0.5 rounded bg-muted">
              {chip}
            </div>
          </button>
        );
      })}
    </div>
  );
}
