import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { APIProvider } from "@vis.gl/react-google-maps";

import { useAuthStore } from "../../store/authStore";
import ProfileAddressMap from "../maps/ProfileAddressMap";
import AddressAutocomplete from "../maps/AddressAutocomplete";

interface Props {
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditRestaurantProfileForm = ({ setEditOpen }: Props) => {
  const { user, restaurantData, updateProfileInformation } = useAuthStore();

  const [name, setName] = useState(restaurantData?.name || "");
  const [description, setDescription] = useState(
    restaurantData?.description || "",
  );
  const [category, setCategory] = useState(restaurantData?.category || "");
  const [phone, setPhone] = useState(restaurantData?.phone || "");
  const [address, setAddress] = useState(restaurantData?.address || "");
  const [location, setLocation] = useState(
    restaurantData?.location || undefined,
  );
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target?.files[0]);
      setProfileImage(imageUrl);
    }
  };

  const handleAddressSelect = (lat: number, lng: number, address: string) => {
    setAddress(address);
    setLocation({
      lat,
      lng,
    });
  };

  const clearAddress = () => {
    setAddress("");
    setLocation(undefined);
  };

  const handleDismiss = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPhone("");
    setAddress("");
    setLocation(undefined);
    setEditOpen(false);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      if (profileImageFile) {
        formData.append("image", profileImageFile);
      }
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("phone", phone);
      formData.append("address", address);
      if (location) {
        formData.append("location", JSON.stringify(location));
      }

      await updateProfileInformation(formData);
      handleDismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="border-b-2 text-2xl font-medium ">
        Edit Profile Information
      </h3>
      <div className="flex flex-col gap-4 p-2">
        <div className="flex flex-col justify-between sm:flex-row">
          <div className="sm:flex-1">
            <label htmlFor="profileImage">
              <img
                src={profileImage}
                alt="profile"
                className="size-32 cursor-pointer rounded-full border p-2 transition duration-300 ease-in-out hover:scale-105"
              />
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
          {address && location && (
            <div className="sm:flex-1">
              <ProfileAddressMap coordinates={location} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Restaurant name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <textarea
            placeholder="Description"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="sm:flex-1">
            <input
              type="text"
              placeholder="Phone number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="sm:flex-1">
            <input
              type="text"
              placeholder="Category"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        {address && location ? (
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Address"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              value={address}
              disabled
            />
            <button onClick={clearAddress} className="text-red-600">
              <FaEdit size={24} />
            </button>
          </div>
        ) : (
          <>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <AddressAutocomplete onSelect={handleAddressSelect} />
            </APIProvider>
          </>
        )}

        <button
          onClick={handleUpdateProfile}
          className="rounded-full border-2 border-red-600 bg-red-600 py-1 font-medium text-white hover:bg-transparent hover:text-red-600"
        >
          Update Profile
        </button>
        <button
          onClick={handleDismiss}
          className="rounded-full border-2 py-1 font-medium text-gray-500 hover:bg-gray-600 hover:text-white"
        >
          Dismisss
        </button>
      </div>
    </div>
  );
};

export default EditRestaurantProfileForm;
