import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialApp from './SocialApp.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {registerSW} from "virtual:pwa-register"
import store from "./store.tsx"
import { Provider } from "react-redux"
import { invoke } from "@tauri-apps/api/core";

function App() {
  useEffect(()=>{
    invoke('tauri', {cmd:'create'})
      .then(() =>{console.log("Tauri launched")})
      .catch(() =>{console.log("Tauri not launched")})
    return () =>{
      invoke('tauri', {cmd:'close'})
        .then(() =>{console.log("Tauri launched")})
        .catch(() =>{console.log("Tauri not launched")})
    }
  }, [])
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocialApp />
    </Provider>
  </React.StrictMode>,
)
if ("serviceWorker" in navigator) {
  registerSW()
}

export default App;
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
//     navigator.serviceWorker
//       .register("../Social-system-frontend/serviceWorker.js")
//       .then(res => console.log("service worker registered", res))
//       .catch(err => console.log("service worker not registered", err))
//   })
// }