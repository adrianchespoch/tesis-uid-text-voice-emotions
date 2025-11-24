import { EmotionBars } from '@/components/EmotionBars';
import {
  PlayerWithLyrics,
  useSeekFromSegments,
} from '@/components/PlayerWithLyrics';
import { SegmentList } from '@/components/SegmentList';
import { UploadBar } from '@/components/UploadBar';
import { useTranscribeStore } from '@/store/useTranscribeStore';

export default function App() {
  const data = useTranscribeStore(s => s.data);
  const seek = useSeekFromSegments();

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <span>🎧</span> Emotion Master
      </h1>

      <div className="rounded-xl border p-4">
        <UploadBar />
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-4">
            <PlayerWithLyrics />
            {/* Transcripción completa  */}
            {/* <div className="rounded-xl border p-4">
              <div className="font-medium mb-2">Transcripción</div>
              <p className="text-sm leading-7">{data.transcription}</p>
            </div> */}
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-xl border p-4">
              <EmotionBars items={data.global_emotions} />
            </div>
            <div className="rounded-xl border p-2">
              <SegmentList onSeek={seek} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
