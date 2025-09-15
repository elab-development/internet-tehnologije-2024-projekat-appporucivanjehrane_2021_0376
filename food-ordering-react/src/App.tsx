import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import RestaurantListPage from "./pages/restaurant/RestaurantListPage.tsx";
import RestaurantOffer from "./pages/restaurant/RestaurantOffer.tsx";
import Login from "./pages/auth/Login.tsx";
import LoginRestaurant from "./pages/auth/LoginRestaurant.tsx";
import Register from "./pages/auth/Register.tsx";
import RegisterRestaurant from "./pages/auth/RegisterRestaurant.tsx";
import CheckOut from "./pages/ordering/CheckOut.tsx";
import TrackOrder from "./pages/ordering/TrackOrder.tsx";
import UserProfile from "./pages/profile/UserProfile.tsx";
import RestaurantProfile from "./pages/profile/RestaurantProfile.tsx";
import AdminProfile from "./pages/profile/AdminProfile.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <>
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
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/login/restaurant"
            element={
              <Layout>
                <LoginRestaurant />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/register/restaurant"
            element={
              <Layout>
                <RegisterRestaurant />
              </Layout>
            }
          />
          {/* AUTH ROUTES END */}

          {/* ORDERING ROUTES (PRIVATE) START */}
          <Route
            path="/checkout"
            element={
              <Layout>
                <CheckOut />
              </Layout>
            }
          />
          <Route
            path="/track-order"
            element={
              <Layout>
                <TrackOrder />
              </Layout>
            }
          />
          {/* ORDERING ROUTES (PRIVATE) END */}

          {/* PROFILES/DASHBOARDS (PRIVATE) START */}
          <Route
            path="/profile"
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route
            path="/profile/restaurant"
            element={
              <Layout>
                <RestaurantProfile />
              </Layout>
            }
          />
          <Route
            path="/profile/admin"
            element={
              <Layout>
                <AdminProfile />
              </Layout>
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
