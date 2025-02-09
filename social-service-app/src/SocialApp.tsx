import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatronageDetailPage } from "./pages/PatronageDetail";
import PatronageListPage from "./pages/PatronagesList";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.tsx";
import Header from "./components/Header.tsx";
import { dest_root } from "./target_config.ts";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import DisabilityTablePage from "./pages/DisabilityTablePage.tsx";
import DisabilityPage from "./pages/DisabilityPages.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PatronageEditPage } from "./pages/PatronageEditPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ForbiddenPage from "./pages/ForbiddenPage.tsx";

function SocialApp() {
  return (
    <BrowserRouter basename={dest_root}>
      <ToastContainer aria-label="Notifications" />
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SERVICES} element={<PatronageListPage />} />
        <Route
          path={`${ROUTES.SERVICES}/:id`}
          element={<PatronageDetailPage />}
        />
        <Route path={ROUTES.DISABILITY} element={<DisabilityTablePage />} />
        <Route path={`${ROUTES.DISABILITY}/:id`} element={<DisabilityPage />} />
        <Route path={ROUTES.PROFILE} element={<UserProfilePage />} />
        <Route
          path={`${ROUTES.SERVICES}/:id/edit`}
          element={<PatronageEditPage />}
        />
        <Route
          path={`${ROUTES.SERVICES}/add-service`}
          element={<PatronageEditPage />}
        />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SocialApp;
