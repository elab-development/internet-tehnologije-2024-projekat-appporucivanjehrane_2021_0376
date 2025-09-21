import { useAuthStore } from "../store/authStore";
import Hero from "../components/home/Hero";
import AdminDashboard from "../components/home/AdminDashboard";
import RestaurantDashboard from "../components/home/RestaurantDashboard";

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <>
      {(!isAuthenticated || (isAuthenticated && user?.role === "customer")) && (
        <Hero />
      )}
      {isAuthenticated && user?.role === "admin" && <AdminDashboard />}
       {isAuthenticated && user?.role === "restaurant" && (
        <RestaurantDashboard />
      )}
    </>
  );
};

export default Home;