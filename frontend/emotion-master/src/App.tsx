import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GlobalEmotions } from '@/components/GlobalEmotions';
import { PlayerBar } from '@/components/PlayerBar';
import { SegmentList } from '@/components/SegmentList';
import { UploadCard } from '@/components/UploadCard';
import { usePlayerStore } from '@/store/player';

export default function App() {
  const queryClient = new QueryClient();
  const transcription = usePlayerStore(s => s.transcription);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="mx-auto max-w-6xl p-4 md:p-6">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">
            🎧 Emotion Master
          </h1>

          <div className="grid gap-4 md:grid-cols-[1.7fr_1.2fr]">
            <div className="space-y-4">
              <UploadCard />
              <PlayerBar />
              {transcription ? (
                <div className="rounded-xl border bg-card p-4">
                  <h3 className="mb-2 text-base font-medium">Transcripción</h3>
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">
                    {transcription}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <GlobalEmotions />
              <SegmentList />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}
