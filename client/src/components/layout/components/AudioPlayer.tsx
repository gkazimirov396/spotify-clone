import useAudioPlayer from '@/hooks/useAudioPlayer';

export default function AudioPlayer() {
  const audioRef = useAudioPlayer();

  return <audio ref={audioRef} />;
}
