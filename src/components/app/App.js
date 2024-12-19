import React, { useState } from 'react'
import './App.css';

import SidePanel from "../sidePanel/SidePanel.js";
import ErrorMessage from "../errors/ErrorMessage.js";
import AddAlbumForm from '../addAlbum/AddAlbumForm.js';
import RecordSongs from '../addSong/RecordSongs.js';
import MusicPlayer from '../musicPlayer/MusicPlayer.js';

function App() {
  const [errorState, setErrorState] = useState(false);
  const [errorData, setErrorData] = useState();

  const handleError = (error) => {
    setErrorState(true);
    setErrorData(error);
  }

  const closeError = () => {
    setErrorState(false);
  }
  return (
    <div className="App">
      <SidePanel handleError={handleError} />
      <AddAlbumForm/>
      {errorState ? <ErrorMessage closeError={closeError} errorData={errorData}/> : null}
      {/* <RecordSongs/> */}
      <MusicPlayer/>
    </div>
  );
}

export default App;
