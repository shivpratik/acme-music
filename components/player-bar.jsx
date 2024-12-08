"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  FastForward,
  Music,
  Pause,
  Play,
  Repeat,
  Rewind,
  Shuffle,
  Volume as Volume0,
  Volume2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { usePlayback } from "@/app/playback-context";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function PlayBackControls() {
  let {
    isPlaying,
    isShuffle,
    setShuffle,
    togglePlayPause,
    currentTrack,
    playNextTrack,
    playPrevTrack,
  } = usePlayback();

  return (
    <div className="flex items-center justify-center order-2 md:order-1">
      <Button
        className="hidden md:inline-flex"
        variant="ghost"
        size="icon"
        onClick={() => setShuffle(!isShuffle)}
      >
        <Shuffle
          className={cn("h-4 w-4", isShuffle ? "" : "text-neutral-400")}
        />
      </Button>
      <Button
        className="hidden md:inline-flex"
        variant="ghost"
        size="icon"
        onClick={playPrevTrack}
        disabled={!currentTrack}
      >
        <Rewind className="h-4 w-4" fill="currentColor" />
      </Button>
      <Button variant="ghost" size="icon" onClick={togglePlayPause}>
        {isPlaying ? (
          <Pause className="h-6 w-6" fill="currentColor" />
        ) : (
          <Play className="h-6 w-6" fill="currentColor" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={playNextTrack}
        disabled={!currentTrack}
      >
        <FastForward className="h-4 w-4" fill="currentColor" />
      </Button>
      <Button className="hidden md:inline-flex" variant="ghost" size="icon">
        <Repeat className="h-4 w-4 text-neutral-400" />
      </Button>
    </div>
  );
}

export function ProgressBar() {
  let { currentTime, duration } = usePlayback();

  let formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative">
      <small className="absolute bottom-0.5 left-0.5 text-xs text-muted-foreground">
        {formatTime(currentTime)}
      </small>
      <Progress
        className="rounded-none h-1"
        value={(currentTime / duration) * 100}
      />
      <small className="absolute bottom-0.5 right-0.5 text-xs text-muted-foreground">
        {formatTime(duration)}
      </small>
    </div>
  );
}

export function TrackInfo() {
  let { currentTrack } = usePlayback();
  return (
    <div className="md:col-start-2 col-span-3 md:col-span-2 flex items-center order-1 md:order-2">
      <div className="shrink">
        {currentTrack?.image?.length > 0 ? (
          <Image
            className="aspect-square w-auto min-w-14 h-14"
            src={currentTrack?.image[1].url}
            alt="Album Cover"
            width={500}
            height={500}
          />
        ) : (
          <div className="flex items-center justify-center aspect-square w-auto min-w-14 h-14 bg-neutral-300">
            <Music className="text-secondary" />
          </div>
        )}
      </div>
      {currentTrack ? (
        <div className="bg-secondary flex flex-col grow h-full truncate">
          <div className="flex flex-col grow justify-center text-center text-sm px-2 pb-2.5 [mask-image:linear-gradient(90deg,transparent_1%,#000_15%,#000_85%,transparent_99%)]">
            <p
              className="font-semibold truncate"
              dangerouslySetInnerHTML={{ __html: currentTrack.name }}
            ></p>
            <p
              className="text-muted-foreground leading-none truncate"
              dangerouslySetInnerHTML={{
                __html: `${currentTrack.artists.primary
                  .map((artist) => artist.name)
                  .join(", ")} - ${currentTrack.album.name}`,
              }}
            ></p>
          </div>
          <ProgressBar />
        </div>
      ) : (
        <div className="bg-secondary flex flex-col grow justify-center items-center h-full">
          <Command className="text-neutral-400" />
        </div>
      )}
    </div>
  );
}

export function Volume() {
  const [volume, setVolume] = useState([50]);

  useEffect(() => {
    Howler.volume(volume[0] / 100);
  }, [volume]);

  let handleVolumeChange = (value) => {
    setVolume([value]);
  };

  return (
    <div className="md:flex flex-row items-center justify-center hidden md:order-3">
      <Volume0
        className="h-4 w-4 cursor-pointer"
        fill="currentColor"
        onClick={() => handleVolumeChange(0)}
      />
      <Slider className="w-20" value={volume} onValueChange={setVolume} />
      <Volume2
        className="ml-2 h-4 w-4 cursor-pointer"
        fill="currentColor"
        onClick={() => handleVolumeChange(100)}
      />
    </div>
  );
}

export function PlayerBar() {
  let { audioRef, isPlaying, setCurrentTime } = usePlayback();
  useEffect(() => {
    let interval;
    if (audioRef && isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.seek());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [audioRef, isPlaying, setCurrentTime]);

  return (
    <header className="grid grid-cols-4 sticky top-0 h-16 shrink-0 gap-2 border-b p-1 z-10 bg-white">
      <PlayBackControls />
      <TrackInfo />
      <Volume />
    </header>
  );
}
