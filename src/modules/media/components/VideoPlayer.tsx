import YoutubePlayer from
"react-native-youtube-iframe";

interface Props {
  videoId: string;
}

export default function VideoPlayer({
  videoId,
}: Props) {
  return (
    <YoutubePlayer
      height={220}
      play
      videoId={videoId}
    />
  );
}