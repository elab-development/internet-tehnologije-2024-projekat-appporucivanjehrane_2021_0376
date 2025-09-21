import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  MdOutlineHomeWork,
  MdOutlineMail,
  MdOutlinePhone,
} from "react-icons/md";

import { useAuthStore } from "../../store/authStore";
import { useOrderStore } from "../../store/orderStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import EditRestaurantProfileForm from "../../components/profile/EditRestaurantProfileForm";

const RestaurantProfile = () => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const { user, restaurantData, isLoading } = useAuthStore();
  const {
    isLoading: orderLoading,
    orders,
    getOrdersByRestaurant,
  } = useOrderStore();

  useEffect(() => {
    if (restaurantData) {
      getOrdersByRestaurant(restaurantData._id);
    }
  }, [getOrdersByRestaurant, restaurantData]);

  return (
    <>
      {(isLoading || orderLoading) && <LoadingSpinner />}
      <div className="flex">
        <div className="mx-auto my-20 w-11/12 rounded-md border bg-white p-5 shadow-lg md:w-3/4 lg:w-1/2">
          <div className="mt-4">
            <div className="flex flex-col items-center md:flex-row">
              <img
                src={user?.profileImage}
                alt="profile"
                className="size-32 rounded-full border p-2 transition duration-300 ease-in-out"
              />
              <div className="mt-4 text-center md:ml-6 md:mt-0 md:text-left">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  {restaurantData?.name}
                  <button onClick={() => setEditOpen(true)}>
                    <FaEdit />
                  </button>
                </h3>
                <div className="mt-2 flex items-center justify-center text-gray-600 md:justify-start">
                  <MdOutlineMail size={20} className="mr-2" />
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="mt-2 flex items-center justify-center text-gray-600 md:justify-start">
                  <MdOutlineHomeWork size={20} className="mr-2" />
                  <span className="font-medium">
                    {restaurantData?.address || "No address provided"}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-center text-gray-600 md:justify-start">
                  <MdOutlinePhone size={20} className="mr-2" />
                  <span className="font-medium">
                    {restaurantData?.phone || "No phone provided"}
                  </span>
                </div>
              </div>
            </div>

            {editOpen && (
              <EditRestaurantProfileForm setEditOpen={setEditOpen} />
            )}

            <div className="mt-8">
              <h4 className="mb-4 text-xl font-semibold text-gray-700">
                Account Information
              </h4>
              {restaurantData?.verified ? (
                <div className="flex flex-col gap-2 font-medium">
                  <p>{restaurantData?.category}</p>
                  <p>{restaurantData?.description}</p>
                </div>
              ) : (
                <p className="font-medium text-yellow-500">
                  Pending verification...
                </p>
              )}
            </div>

            <div className="mt-8">
              <h4 className="mb-4 text-xl font-semibold text-gray-700">
                Orders
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-100 p-4 shadow transition duration-300 ease-in-out hover:shadow-md">
                  <p className="font-medium text-gray-800">Total Orders</p>
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    {orders?.length || 0}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-4 shadow transition duration-300 ease-in-out hover:shadow-md">
                  <p className="font-medium text-gray-800">Earnings</p>
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    $ {restaurantData?.user?.balance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantProfile;
