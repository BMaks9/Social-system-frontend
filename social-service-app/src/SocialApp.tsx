import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatronageDetailPage } from "./pages/PatronageDetail";
import PatronageListPage from "./pages/PatronagesList";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.tsx";
import Header from './components/Header.tsx'
import {dest_root} from './target_config.ts'
import {RegisterPage} from './pages/RegisterPage.tsx'
import DisabilityTablePagePage from './pages/DisabilityTablePage.tsx'
import DisabilityPage from './pages/DisabilityPages.tsx'

function SocialApp() {
  return (
    <BrowserRouter basename={dest_root}> 
      <Header/>
      <Routes>
        <Route path={ROUTES.REGISTER} index element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} index element={<LoginPage />} />
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.SERVICES} element={<PatronageListPage />} />
        <Route path={`${ROUTES.SERVICES}/:id`} element={<PatronageDetailPage />} />
        <Route path={ROUTES.DISABILITY} element={<DisabilityTablePagePage />} />
        <Route path={`${ROUTES.DISABILITY}/:id`} element={<DisabilityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SocialApp;