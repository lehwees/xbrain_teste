import { Navigate, Route, Routes } from 'react-router-dom';
import Finalizacao from './pages/Finalizacao';
import Produtos from "./pages/Produtos";

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