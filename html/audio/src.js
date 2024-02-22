// App.js
import React from 'react';
import AudioPlayer from './AudioPlayer';

const playlist = [
  { title: 'Song 1', url: 'path/to/song1.mp3' },
  { title: 'Song 2', url: 'path/to/song2.mp3' },
  // Add more songs as needed
];

function App() {
  return (
    <div className="App">
      <AudioPlayer playlist={playlist} />
    </div>
  );
}

export default App;
