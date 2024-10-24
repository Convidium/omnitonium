import React from 'react'
import './App.css';

import SidePanel from "../sidePanel/SidePanel.js";
import AddAlbumForm from '../addAlbum/AddAlbumForm.js';

function App() {
  return (
    <div className="App">
      <SidePanel/>
      <AddAlbumForm/>
    </div>
  );
}

export default App;
