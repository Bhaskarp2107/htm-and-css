// AudioPlayer.js
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ playlist }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioRef, setAudioRef] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.src = playlist[currentTrack].url;

    if (localStorage.getItem('lastPlayedTrack')) {
      const lastPlayedTrack = JSON.parse(localStorage.getItem('lastPlayedTrack'));
      if (lastPlayedTrack.trackIndex === currentTrack) {
        audioRef.currentTime = lastPlayedTrack.currentTime;
        if (lastPlayedTrack.isPlaying) {
          audioRef.play();
          setIsPlaying(true);
        }
      }
    }

    return () => {
      // Save current state to localStorage when component unmounts
      const lastPlayedTrack = {
        trackIndex: currentTrack,
        currentTime: audioRef.currentTime,
        isPlaying,
      };
      localStorage.setItem('lastPlayedTrack', JSON.stringify(lastPlayedTrack));
    };
  }, [currentTrack, audioRef, playlist, isPlaying]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrackHandler = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
  };

  const timeUpdateHandler = () => {
    // Add any additional logic based on time update
  };

  return (
    <div>
      <h2>Now Playing: {playlist[currentTrack].title}</h2>
      <audio
        ref={setAudioRef}
        onTimeUpdate={timeUpdateHandler}
        onEnded={nextTrackHandler}
      />
      <div>
        <button onClick={playPauseHandler}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={nextTrackHandler}>Next</button>
      </div>
      <h3>Playlist:</h3>
      <ul>
        {playlist.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;
