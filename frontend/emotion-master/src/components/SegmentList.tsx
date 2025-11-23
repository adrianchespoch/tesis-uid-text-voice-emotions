import { useMemo, useState } from 'react';
import { usePlayerStore } from '@/store/player';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function fmtRange(a: number, b: number) {
  const f = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  return `${f(a)} – ${f(b)}`;
}

export function SegmentList() {
  const segments = usePlayerStore(s => s.segments);
  const currentTime = usePlayerStore(s => s.currentTime);
  const audioUrl = usePlayerStore(s => s.audioUrl);

  const [filter, setFilter] = useState<string>('');

  const filtered = useMemo(() => {
    if (!filter) return segments;
    return segments.filter(s => s.top_emotion.label === filter);
  }, [segments, filter]);

  const seekTo = (t: number) => {
    const el = document.querySelector('audio') as HTMLAudioElement | null;
    if (el) el.currentTime = t;
  };

  if (!audioUrl || segments.length === 0) return null;

  const uniqueEmos = Array.from(
    new Set(segments.map(s => s.top_emotion.label))
  );

  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Subtítulos por segmentos</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filtro:</span>
          <select
            className="rounded-md border bg-background px-2 py-1 text-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">Todos</option>
            {uniqueEmos.map(e => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[520px] pr-3">
          <div className="space-y-3">
            {filtered.map((s, i) => {
              const active = currentTime >= s.start && currentTime < s.end;
              return (
                <div
                  key={i}
                  role="button"
                  onClick={() => seekTo(s.start)}
                  className={cn(
                    'rounded-xl border p-3 transition-colors',
                    active
                      ? 'border-primary/60 bg-muted/40'
                      : 'border-border hover:bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {fmtRange(s.start, s.end)}
                    </div>
                    <Badge variant="outline">
                      {s.top_emotion.label} ({s.top_emotion.score.toFixed(2)})
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm leading-relaxed">{s.text}</div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
