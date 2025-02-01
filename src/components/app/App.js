import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import SidePanel from "../sidePanel/SidePanel.js";
import ErrorMessage from "../errors/ErrorMessage.js";
import AddRecordForm from '../addRecordForm/addRecordForm.js';

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
      <BrowserRouter>
      <SidePanel handleError={handleError} />
        <Routes>
            <Route path='/' element={<div>Nothing Here</div>}/>
            <Route path='/new-album' element={<AddRecordForm/>}/>
        </Routes>
      </BrowserRouter>
      {/* <MusicPlayer/> */}
      {errorState ? <ErrorMessage closeError={closeError} errorData={errorData} /> : null}
    </div>
  );
}

export default App;
