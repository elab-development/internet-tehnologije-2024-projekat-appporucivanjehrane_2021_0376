import { useState } from "react";
import {
  MdOutlineHomeWork,
  MdOutlineMail,
  MdOutlinePhone,
} from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import EditProfileForm from "../../components/profile/EditProfileForm";

const UserProfile = () => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const { user, customerData, isLoading } = useAuthStore();

  return (
    <>
      {isLoading && <LoadingSpinner />}
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-100 p-4 shadow transition duration-300 ease-in-out hover:shadow-md">
                  <p className="font-medium text-gray-800">Order abc123</p>
                  <p className="mt-1 text-sm text-gray-600">02/03/2025</p>
                  <button className="mt-2 text-red-600 transition duration-300 ease-in-out hover:text-red-600">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
