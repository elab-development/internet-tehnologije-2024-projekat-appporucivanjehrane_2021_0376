import { useEffect, useState } from "react";

import { useDishStore } from "../../../store/dishStore";
import { useAuthStore } from "../../../store/authStore";
import LoadingSpinner from "../../LoadingSpinner";
import DishCard from "../../restaurants/DishCard";
import { Dish } from "../../../lib/TypesData";
import { FaEdit, FaTrash } from "react-icons/fa";
import CreateUpdateDishModal from "./CreateUpdateDishModal";
import { toast } from "react-toastify";

const DishesView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dishToUpdate, setDishToUpdate] = useState<Dish | null>(null);

  const { isLoading, dishes, getRestaurantsDishes, deleteDish } =
    useDishStore();
  const { restaurantData } = useAuthStore();

  useEffect(() => {
    if (restaurantData && restaurantData._id) {
      getRestaurantsDishes(restaurantData._id);
    }
  }, [getRestaurantsDishes, restaurantData]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDish(id);
      toast.success("Dish deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="my-10">
        <div className="flex flex-wrap justify-between gap-3">
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-50 md:text-4xl lg:text-5xl">
            {restaurantData?.name} Dishes
          </h2>
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-xl border-2 border-red-600 bg-white px-4 text-lg font-bold text-red-600 hover:border-white hover:bg-transparent hover:text-white"
          >
            Add new Dish
          </button>
        </div>

        <div className="mt-4 grid gap-2 lg:grid-cols-2">
          {dishes && dishes?.length > 0 ? (
            <>
              {dishes.map((dish) => (
                <div className="relative" key={dish._id}>
                  <DishCard dish={dish} />
                  <FaEdit
                    className="absolute right-10 top-2 cursor-pointer text-blue-500"
                    size={24}
                    onClick={() => {
                      setDishToUpdate(dish);
                      setOpenModal(true);
                    }}
                  />
                  <FaTrash
                    className="absolute right-2 top-2.5 cursor-pointer text-red-600"
                    size={20}
                    onClick={() => {
                      handleDelete(dish?._id);
                    }}
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="text-xl font-medium text-white">
              No Dishes posted yet
            </p>
          )}
        </div>
      </div>

      {openModal && (
        <CreateUpdateDishModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          dishToUpdate={dishToUpdate}
          setDishToUpdate={setDishToUpdate}
        />
      )}
    </>
  );
};

export default DishesView;