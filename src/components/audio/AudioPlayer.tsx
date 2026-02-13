"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
};

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  });

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // if (isPlaying) {
    //   audio.pause();
    // } else {
    //   audio.currentTime = 0;
    //   audio.play();
    // }
    audio.currentTime = 0;
    audio.play();
    // setIsPlaying(!isPlaying);
  };
  return (
    <div>
      <audio ref={audioRef} src={src} autoPlay={false} />

      <button onClick={togglePlay} className="cursor-pointer">
        <Volume2 className="text-[#2b4eff] w-8 h-8 cursor-pointer hover:scale-110 transition-transform" />
        {/*{isPlaying ? "Pause" : "Play"}*/}
      </button>
    </div>
  );
}
