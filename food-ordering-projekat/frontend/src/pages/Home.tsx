import AdminDashboard from "../components/home/AdminDashboard";
import Hero from "../components/home/Hero";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <>
      {(!isAuthenticated || (isAuthenticated && user?.role === "customer")) && (
        <Hero />
      )}
      {isAuthenticated && user?.role === "admin" && <AdminDashboard />}
    </>
  );
};

export default Home;