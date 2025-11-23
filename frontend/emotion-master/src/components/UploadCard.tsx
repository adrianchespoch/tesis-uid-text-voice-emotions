import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { TranscribeResponse } from '@/types';
import { usePlayerStore } from '@/store/player';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function UploadCard() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const setAudioUrl = usePlayerStore(s => s.setAudioUrl);
  const setFromResponse = usePlayerStore(s => s.setFromResponse);
  const clear = usePlayerStore(s => s.clear);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append('file', file);
      const { data } = await api.post<TranscribeResponse>(
        '/transcribe/emotion-es-master',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return { data, file };
    },
    onSuccess: ({ data, file }) => {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setFromResponse(data);
    },
  });

  const onSelectFile = (f?: File) => {
    if (!f) return;
    setFileName(f.name);
    clear();
    mutation.mutate(f);
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Subir audio y transcribir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={e => onSelectFile(e.target.files?.[0])}
          />
          <Button variant="secondary" onClick={() => inputRef.current?.click()}>
            Elegir archivo
          </Button>
          {fileName ? <Badge variant="outline">{fileName}</Badge> : null}
        </div>

        {mutation.isPending ? (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Procesando (Whisper + emociones)…
            </div>
            <Progress value={45} />
          </div>
        ) : null}

        {mutation.isError ? (
          <div className="text-sm text-destructive">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'Error procesando el audio'}
          </div>
        ) : null}

        {mutation.isSuccess ? (
          <div className="text-sm text-green-500">Listo ✅</div>
        ) : null}
      </CardContent>
    </Card>
  );
}
