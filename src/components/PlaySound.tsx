import { useEffect, useRef, useState } from "react";

//! Hier sind Features drin die wir nicht behandelt haben, nicht erschrecken.
//! Kommt alles bald :)
// (Also konkret useRef, nicht der Audiokram)

export default function PlaySound({ audioURL }: { audioURL: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume] = useState(0.01)
  useEffect(() => {
    audioRef.current!.volume = volume
    audioRef.current!.play().catch((e) => console.error(e));
  }, [audioURL, volume]);
  return <audio src={audioURL} ref={audioRef} />;
}
