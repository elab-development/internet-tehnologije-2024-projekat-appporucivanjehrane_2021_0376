import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useRestaurantStore } from "../../store/restaurantStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import RestaurantListCard from "../../components/restaurants/RestaurantListCard";

const RestaurantListPage = () => {
  const { isLoading, restaurants, getVerifiedRestaurants } =
    useRestaurantStore();

  useEffect(() => {
    getVerifiedRestaurants();
  }, [getVerifiedRestaurants]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-50 md:text-5xl lg:text-6xl">
            Discover the Best Restaurants!
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-100 sm:px-16 lg:text-xl xl:px-48">
            Looking for a great place to eat? Explore our curated list of
            top-rated restaurants, from cozy cafés to fine dining experiences.
            Find the perfect spot, check out their location, and enjoy a
            delicious meal today!
          </p>

          <div className="flex flex-col items-center gap-2 text-left">
            {restaurants &&
              restaurants.map((restaurant) => (
                <Link
                  key={restaurant?._id}
                  to={`/restaurants/${restaurant?._id}`}
                >
                  <RestaurantListCard restaurant={restaurant} />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantListPage;
