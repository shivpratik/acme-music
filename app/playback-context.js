"use client";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";

const PlaybackContext = createContext(undefined);

export function PlaybackProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const audioRef = useRef();

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const playTrack = useCallback((track) => {
    if (audioRef.current) {
      Howler.stop();
    }

    const url = getAudioSrc(track.downloadUrl[2].url);

    audioRef.current = new Howl({
      src: url,
      html5: true,
      onload: () => {
        setCurrentTrack(track);
        setDuration(audioRef.current.duration());
      },
      onplay: () => {
        setIsPlaying(true);
      },
      onend: () => {
        setCurrentTrack(null);
        setCurrentTime(0);
        setIsPlaying(false);
      },
    });
    audioRef.current.play();
  }, []);

  const playNextTrack = useCallback(() => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack.id
      );
      const nextIndex = (currentIndex + 1) % playlist.length;
      playTrack(playlist[nextIndex]);
    }
  }, [currentTrack, playlist, playTrack]);

  const playPrevTrack = useCallback(() => {
    if (currentTrack && playlist.length > 0) {
      const currentIndex = playlist.findIndex(
        (track) => track.id === currentTrack.id
      );
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playTrack(playlist[prevIndex]);
    }
  }, [currentTrack, playlist, playTrack]);

  const getAudioSrc = (url) => {
    if (url.startsWith("file://")) {
      const filename = url.split("/").pop();
      return `http://localhost:3000/api/audio/${encodeURIComponent(
        filename || ""
      )}`;
    }
    return url;
  };

  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        isShuffle,
        currentTrack,
        currentTime,
        duration,
        togglePlayPause,
        playTrack,
        playNextTrack,
        playPrevTrack,
        setShuffle,
        setCurrentTime,
        setDuration,
        setPlaylist,
        audioRef,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = useContext(PlaybackContext);
  if (context === undefined) {
    throw new Error("usePlayback must be used within a Playback Provider");
  }
  return context;
}
