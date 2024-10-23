import { useEffect, useRef } from "react";

//! Hier sind Features drin die wir nicht behandelt haben, nicht erschrecken.
//! Kommt alles bald :)
// (Also konkret useRef, nicht der Audiokram)

export default function PlaySound({ audioURL }: { audioURL: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    audioRef.current!.play().catch((e) => console.error(e));
  }, [audioURL]);
  return <audio src={audioURL} ref={audioRef} />;
}
