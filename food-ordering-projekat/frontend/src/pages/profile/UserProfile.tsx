import { useEffect, useState } from "react";
import {
  MdOutlineHomeWork,
  MdOutlineMail,
  MdOutlinePhone,
} from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useAuthStore } from "../../store/authStore";
import { useOrderStore } from "../../store/orderStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import EditProfileForm from "../../components/profile/EditProfileForm";
import UserOrderCard from "../../components/orders/UserOrderCard";

const UserProfile = () => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const { user, customerData, isLoading } = useAuthStore();
  const {
    isLoading: ordersLoading,
    orders,
    getOrdersByCustomer,
  } = useOrderStore();

  useEffect(() => {
    if (customerData) {
      getOrdersByCustomer(customerData._id);
    }
  }, [getOrdersByCustomer, customerData]);

  return (
    <>
      {(isLoading || ordersLoading) && <LoadingSpinner />}
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
                  {customerData?.firstName} {customerData?.lastName}
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
                    {customerData?.address || "No address provided"}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-center text-gray-600 md:justify-start">
                  <MdOutlinePhone size={20} className="mr-2" />
                  <span className="font-medium">
                    {customerData?.phone || "No phone provided"}
                  </span>
                </div>
              </div>
            </div>

            {editOpen && <EditProfileForm setEditOpen={setEditOpen} />}

            <div className="mt-8">
              <h4 className="mb-4 text-xl font-semibold text-gray-700">
                Orders
              </h4>
              {orders && orders.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {orders.map((order) => (
                    <UserOrderCard key={order._id} order={order} />
                  ))}
                </div>
              ) : (
                <p className="font-medium">No orders yet!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
