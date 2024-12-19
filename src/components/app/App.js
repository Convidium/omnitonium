import React, { useState } from 'react'
import './App.css';

import SidePanel from "../sidePanel/SidePanel.js";
import ErrorMessage from "../errors/ErrorMessage.js";
import AddRecord from '../addRecord/addRecord.js';

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
      <AddRecord/>
      {/* <MusicPlayer/> */}
      {errorState ? <ErrorMessage closeError={closeError} errorData={errorData} /> : null}
    </div>
  );
}

export default App;
