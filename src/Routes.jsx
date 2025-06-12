import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import LoginScreen from "pages/login-screen";
import NewsDashboard from "pages/news-dashboard";
import SearchResults from "pages/search-results";
import UserProfileSettings from "pages/user-profile-settings";
import AdminDashboard from "pages/admin-dashboard";
import PayoutManagement from "pages/payout-management";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<NewsDashboard />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/news-dashboard" element={<NewsDashboard />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/user-profile-settings" element={<UserProfileSettings />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/payout-management" element={<PayoutManagement />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;