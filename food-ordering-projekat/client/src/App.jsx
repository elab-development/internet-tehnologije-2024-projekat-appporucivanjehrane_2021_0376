import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import RestaurantListPage from './pages/restaurant/RestaurantListPage';
import RestaurantOffer from './pages/restaurant/RestaurantOffer';
import LoginRestaurant from './pages/auth/LoginRestaurant';
import Register from './pages/auth/Register';
import RegisterRestaurant from './pages/auth/RegisterRestaurant';
import CheckOut from './pages/ordering/CheckOut';
import TrackOrder from './pages/ordering/TrackOrder';
import UserProfile from './pages/profile/UserProfile';
import RestaurantProfile from './pages/profile/RestaurantProfile';
import AdminProfile from './pages/profile/AdminProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES START */}
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/restaurants'
            element={
              <Layout>
                <RestaurantListPage />
              </Layout>
            }
          />
          <Route
            path='/restaurants/:id'
            element={
              <Layout>
                <RestaurantOffer />
              </Layout>
            }
          />
          {/* PUBLIC ROUTES END */}

          {/* AUTH ROUTES START */}
          <Route
            path='/login'
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path='/login/restaurant'
            element={
              <Layout>
                <LoginRestaurant />
              </Layout>
            }
          />
          <Route
            path='/register'
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path='/register/restaurant'
            element={
              <Layout>
                <RegisterRestaurant />
              </Layout>
            }
          />
          {/* AUTH ROUTES END */}

          {/* ORDERING ROUTES (PRIVATE) START */}
          <Route
            path='/checkout'
            element={
              <Layout>
                <CheckOut />
              </Layout>
            }
          />
          <Route
            path='/track-order'
            element={
              <Layout>
                <TrackOrder />
              </Layout>
            }
          />
          {/* ORDERING ROUTES (PRIVATE) END */}

          {/* PROFILES/DASHBOARDS (PRIVATE) START */}
          <Route
            path='/profile'
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route
            path='/profile/restaurant'
            element={
              <Layout>
                <RestaurantProfile />
              </Layout>
            }
          />
          <Route
            path='/profile/admin'
            element={
              <Layout>
                <AdminProfile />
              </Layout>
            }
          />
          {/* PROFILES/DASHBOARDS (PRIVATE) END */}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;