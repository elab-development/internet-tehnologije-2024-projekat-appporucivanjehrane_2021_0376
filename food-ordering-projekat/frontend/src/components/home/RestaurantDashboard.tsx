import { useEffect, useState } from "react";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdOutlineDeliveryDining } from "react-icons/md";

import { useAuthStore } from "../../store/authStore";
import DishesView from "./restaurant/DishesView";
import RestaurantOrdersView from "./restaurant/RestaurantOrdersView";
import { useDishStore } from "../../store/dishStore";
import { useOrderStore } from "../../store/orderStore";

const RestaurantDashboard = () => {
  const [dashboardView, setDashboardView] = useState("dishes");
  const { restaurantData } = useAuthStore();
  const { dishes, getRestaurantsDishes } = useDishStore();
  const { orders, getOrdersByRestaurant } = useOrderStore();

  useEffect(() => {
    if (restaurantData) {
      getRestaurantsDishes(restaurantData?._id);
      getOrdersByRestaurant(restaurantData?._id);
    }
  }, [getRestaurantsDishes, getOrdersByRestaurant, restaurantData]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-50 md:text-5xl lg:text-6xl">
          {restaurantData?.name} Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => setDashboardView("dishes")}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
          >
            <IoRestaurantSharp size={30} />
            <h5 className="my-2 text-2xl font-semibold tracking-tight text-gray-700">
              Dishes
            </h5>
            <h6 className="text-4xl font-medium">{dishes?.length || 0}</h6>
          </div>

          <div
            onClick={() => setDashboardView("orders")}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
          >
            <MdOutlineDeliveryDining size={30} />
            <h5 className="my-2 text-2xl font-semibold tracking-tight text-gray-700">
              Orders
            </h5>
            <h6 className="text-4xl font-medium">{orders?.length || 0}</h6>
          </div>
        </div>

        {dashboardView === "dishes" && <DishesView />}
        {dashboardView === "orders" && <RestaurantOrdersView />}
      </div>
    </>
  );
};

export default RestaurantDashboard;
