import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Produtos from "./pages/Produtos";
import Finalizacao from './pages/Finalizacao';

function App(){
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {< Produtos/>}/>
        <Route path="/finalizacao" element = {< Finalizacao/>}/>
        <Route path="*" element = {<Navigate to = "/" />}/>
      </Routes>
    </div>
  );
};

export default App;