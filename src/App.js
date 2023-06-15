import React from 'react';
import './App.css';
import MiApi from './components/MiApi';
import Input from './components/Input';
import 'bootstrap/dist/css/bootstrap.min.css'
import DesdeyHasta from './components/DesdeyHasta';


function App() {
  return (
    <div className="App">
      <header className="header bg-dark text-white py-1">
        <div className="container text-center">
          <h1 className="display-3">¡Bienvenido!</h1>
          <p className="lead">Explora el cosmos con nuestra aplicación.</p>
        </div>
      </header>

      <section className="py-1">
        <div className="container">
        <MiApi />     
        <Input />     
        <DesdeyHasta />     
        </div>
      </section>

      

      <footer className="footer bg-dark text-white py-3">
        <div className="container text-center">
          <p>&copy; 2023 AngélicaCortés. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
