import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatronageDetailPage } from "./pages/PatronageDetail";
import PatronageListPage from "./pages/PatronagesList";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import Header from './components/Header.tsx'
// basename="/Social-system-frontend"
function SocialApp() {
  return (
    <BrowserRouter> 
      <Header/>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.SERVICES} element={<PatronageListPage />} />
        <Route path={`${ROUTES.SERVICES}/:id`} element={<PatronageDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SocialApp;