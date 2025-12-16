import React from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import CountryExplorer from './components/CountryExplorer'

export default function App() {
  return (
    <div className="App">
      <main className="App-main">
        <ContactForm />
        <CountryExplorer />
      </main>
    </div>
  )
}
