import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuthStore } from "./store/authStore.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";
import Layout from "./components/layout/Layout.tsx";
import NonPrivateRoute from "./components/protected-routes/NonPrivateRoute.tsx";
import PrivateRoute from "./components/protected-routes/PrivateRoute.tsx";
import Home from "./pages/Home.tsx";
import RestaurantListPage from "./pages/restaurant/RestaurantListPage.tsx";
import RestaurantOffer from "./pages/restaurant/RestaurantOffer.tsx";
import Login from "./pages/auth/Login.tsx";
import LoginRestaurant from "./pages/auth/LoginRestaurant.tsx";
import Register from "./pages/auth/Register.tsx";
import RegisterRestaurant from "./pages/auth/RegisterRestaurant.tsx";
import LoginAdmin from "./pages/auth/LoginAdmin.tsx";
import CheckOut from "./pages/ordering/CheckOut.tsx";
import TrackOrder from "./pages/ordering/TrackOrder.tsx";
import UserProfile from "./pages/profile/UserProfile.tsx";
import RestaurantProfile from "./pages/profile/RestaurantProfile.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES START */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/restaurants"
            element={
              <Layout>
                <RestaurantListPage />
              </Layout>
            }
          />
          <Route
            path="/restaurants/:id"
            element={
              <Layout>
                <RestaurantOffer />
              </Layout>
            }
          />
          {/* PUBLIC ROUTES END */}

          {/* AUTH ROUTES START */}
          <Route
            path="/login"
            element={
              <NonPrivateRoute>
                <Layout>
                  <Login />
                </Layout>
              </NonPrivateRoute>
            }
          />
          <Route
            path="/login/restaurant"
            element={
              <NonPrivateRoute>
                <Layout>
                  <LoginRestaurant />
                </Layout>
              </NonPrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <NonPrivateRoute>
                <Layout>
                  <Register />
                </Layout>
              </NonPrivateRoute>
            }
          />
          <Route
            path="/register/restaurant"
            element={
              <NonPrivateRoute>
                <Layout>
                  <RegisterRestaurant />
                </Layout>
              </NonPrivateRoute>
            }
          />
          <Route
            path="/login/admin"
            element={
              <NonPrivateRoute>
                <Layout>
                  <LoginAdmin />
                </Layout>
              </NonPrivateRoute>
            }
          />
          {/* AUTH ROUTES END */}

          {/* ORDERING ROUTES (PRIVATE) START */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute type="customer">
                <Layout>
                  <CheckOut />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/track-order/:id"
            element={
              <PrivateRoute type="any">
                <Layout>
                  <TrackOrder />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* ORDERING ROUTES (PRIVATE) END */}

          {/* PROFILES/DASHBOARDS (PRIVATE) START */}
          <Route
            path="/profile"
            element={
              <PrivateRoute type="customer">
                <Layout>
                  <UserProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/restaurant"
            element={
              <PrivateRoute type="restaurant">
                <Layout>
                  <RestaurantProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* PROFILES/DASHBOARDS (PRIVATE) END */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;