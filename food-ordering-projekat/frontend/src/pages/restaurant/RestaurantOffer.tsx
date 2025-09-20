import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GrRestaurant } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import { useRestaurantStore } from "../../store/restaurantStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import RestaurantOfferMap from "../../components/maps/RestaurantOfferMap";
// import DishCard from "../../components/restaurants/DishCard";
const RestaurantOffer = () => {
const { isLoading, restaurant, getRestaurantById } = useRestaurantStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getRestaurantById(id);
    }
  }, [id, getRestaurantById]);

  return (
    <>
    {isLoading && <LoadingSpinner />}
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <div className="mb-4 flex flex-col gap-10 sm:flex-row">
          <img
            src={restaurant?.user?.profileImage}
            className="order-2 size-72 rounded-lg sm:order-1"
          />
          <div className="order-1 sm:order-2">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-50 md:text-5xl lg:text-6xl">
              {restaurant?.name}
            </h1>
            <p className="mb-3 line-clamp-6 text-lg font-normal text-gray-100 lg:text-xl">
              {restaurant?.description}
            </p>
            <div className="flex flex-row flex-wrap gap-6">
              <div className="flex flex-row items-center gap-3">
                <GrRestaurant size={18} color="#fff" className="text-gray-50" />
                <p className="font-medium text-gray-50">
                  {restaurant?.category}
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <IoLocationOutline
                  size={18}
                  color="#fff"
                  className="text-gray-50"
                />
                <p className="font-medium text-gray-50">
                  {restaurant?.address}
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <FaRegHeart size={18} color="#fff" className="text-gray-50" />
                <p className="font-medium text-gray-50">52 orders</p>
              </div>
            </div>
          </div>
        </div>
        <RestaurantOfferMap
          restaurant={restaurant}
          coordinates={{
            lat: restaurant?.location!.lat || 44.8125,
            lng: restaurant?.location!.lng || 20.4612,
          }}
        />

        <div className="mt-4 flex flex-col gap-4">
          <h2 className="border-b-2 py-2 text-4xl font-bold text-gray-50">
            Dishes
          </h2>
          {/* {restaurant?.dishes && restaurant?.dishes.length > 0 ? (
            <>
              {restaurant.dishes.map((dish) => (
                <DishCard key={dish?._id} dish={dish} />
              ))}
            </>
          ) : (
            <h3 className="text-3xl font-bold text-gray-50">
              No Dishes Found!
            </h3>
            
          )}
            )} */}
        </div>
      </div>
    </>
  );

export default RestaurantOffer;}
