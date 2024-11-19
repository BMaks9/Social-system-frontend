import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialApp from './SocialApp.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    <SocialApp />
  </React.StrictMode>,
)