import { useEffect, useState } from "react";
import { IoWalletOutline, IoRestaurantSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../LoadingSpinner";
import CustomersView from "./admin/CustomersView";
import RestaurantsView from "./admin/RestaurantsView";
import OrdersView from "./admin/OrdersView";

const AdminDashboard = () => {
  const [dashboardView, setDashboardView] = useState("none");
  const { isLoading, user, adminData, getAdminData } = useAuthStore();

  useEffect(() => {
    getAdminData();
  }, [getAdminData]);

  return (
    <>
    {isLoading && <LoadingSpinner />}
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-50 md:text-5xl lg:text-6xl">
          
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => setDashboardView("none")}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
          >
            <IoWalletOutline size={30} />
            <h5 className="my-2 text-2xl font-semibold tracking-tight text-gray-700">
              Platform Balance
            </h5>
            <h6 className="text-4xl font-medium">
              {adminData?.totalCustomers}
            </h6>
          </div>

          <div
            onClick={() => setDashboardView("customers")}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
          >
            <FaRegUser size={30} />
            <h5 className="my-2 text-2xl font-semibold tracking-tight text-gray-700">
              Total Customers
            </h5>
            <h6 className="text-4xl font-medium">
              {adminData?.totalRestaurants}
            </h6>
          </div>

          <div
            onClick={() => setDashboardView("restaurants")}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
          >
            <IoRestaurantSharp size={30} />
            <h5 className="my-2 text-2xl font-semibold tracking-tight text-gray-700">
              Total Restaurants
            </h5>
            <h6 className="text-4xl font-medium">5</h6>
          </div>

          <div
            onClick={() => setDashboardView("orders")}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
          >
            <MdOutlineDeliveryDining size={30} />
            <h5 className="my-2 text-2xl font-semibold tracking-tight text-gray-700">
              Total Orders
            </h5>
            <h6 className="text-4xl font-medium">{adminData?.totalOrders}</h6>
          </div>
        </div>

        {dashboardView === "customers" && <CustomersView />}
        {dashboardView === "restaurants" && <RestaurantsView />}
        {dashboardView === "orders" && <OrdersView />}
      </div>
    </>
  );
};

export default AdminDashboard;