import React from 'react';
import './App.css';
import CountryExplorer from './components/CountryExplorer';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <ContactForm />
        <CountryExplorer />
      </main>
    </div>
  );
}

export default App;
