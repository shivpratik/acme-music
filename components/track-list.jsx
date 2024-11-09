"use client";
import { usePlayback } from "@/app/playback-context";
import { MoreHorizontal, Pause, Play } from "lucide-react";
import { useEffect } from "react";

function TrackRow({ track, index }) {
  let { currentTrack, playTrack, togglePlayPause, isPlaying } = usePlayback();
  let isCurrentTrack = currentTrack?.name === track.name;

  let formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  function handlePlayPause(e) {
    e.preventDefault();
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  }

  return (
    <div className="flex flex-row items-center justify-between space-x-2 bg-secondary rounded-md py-2 px-4 text-sm group">
      <div className="flex flex-row items-center justify-start space-x-2">
        {isCurrentTrack && isPlaying ? (
          <div className="relative flex items-center justify-center h-6 w-6">
            <div className="flex items-center justify-center space-x-[2px] h-6 w-6 mx-auto group-hover:hidden">
              <div className="w-1 bg-neutral-600 animate-now-playing-1"></div>
              <div className="w-1 bg-neutral-600 animate-now-playing-2 [animation-delay:0.2s]"></div>
              <div className="w-1 bg-neutral-600 animate-now-playing-3 [animation-delay:0.4s]"></div>
            </div>
            <Pause
              className="absolute h-5 w-5 hidden group-hover:block cursor-pointer"
              fill="currentColor"
              onClick={handlePlayPause}
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center h-6 w-6">
            <div className="group-hover:hidden">{index + 1}</div>
            <Play
              className="absolute h-5 w-5 hidden group-hover:block cursor-pointer"
              fill="currentColor"
              onClick={handlePlayPause}
            />
          </div>
        )}
        <div className="flex flex-col leading-none space-y-1 truncate">
          <div dangerouslySetInnerHTML={{ __html: track.name }}></div>
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: track.artists.primary
                .map((artist) => artist.name)
                .join(", "),
            }}
          >
            {track.artist}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start space-x-2">
        <div>{formatTime(track.duration)}</div>
        <MoreHorizontal className="h-5 w-5" />
      </div>
    </div>
  );
}

export function TrackList({ playlist }) {
  const { setPlaylist } = usePlayback();

  useEffect(() => {
    setPlaylist(playlist.songs);
  }, [playlist.songs, setPlaylist]);

  return playlist?.songs.length > 0 ? (
    playlist?.songs?.map((track, index) => (
      <TrackRow key={track.id} track={track} index={index} />
    ))
  ) : (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">No Audio Tracks</h3>
        <p className="text-sm text-muted-foreground">
          There are no audio tracks available in this album or playlist
        </p>
      </div>
    </div>
  );
}
