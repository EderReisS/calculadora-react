import React from 'react';
import './App.css';
import Conversor from './components/Conversor';

function App() {
  return (
    <div className="App">
      <h1>Calculadora Pitágoras</h1>
      <div className="linha">
        <Conversor moedaA="USD" moedaB="BRL"></Conversor>
      </div>
    </div>
  );
}

export default App;
