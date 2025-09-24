import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useRestaurantStore } from "../../store/restaurantStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import RestaurantListCard from "../../components/restaurants/RestaurantListCard";
import SearchRestaurants from "../../components/restaurants/SearchRestaurants";

const RestaurantListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("createdAt");

  const { isLoading, restaurants, getVerifiedRestaurants } =
    useRestaurantStore();

  useEffect(() => {
   getVerifiedRestaurants(sort, searchQuery);
  }, [getVerifiedRestaurants, sort, searchQuery]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(restaurants?.length / 4); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [restaurants]);

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

          <SearchRestaurants
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSort={setSort}
          />

          <div className="mt-10 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-2 text-left lg:grid-cols-2">
              {restaurants &&
                restaurants
                  ?.slice(currentPage * 4 - 4, currentPage * 4)
                  ?.map((restaurant) => (
                    <Link
                      key={restaurant?._id}
                      to={`/restaurants/${restaurant?._id}`}
                    >
                      <RestaurantListCard restaurant={restaurant} />
                    </Link>
                  ))}
            </div>
          </div>

          <div className="mt-10 flex flex-row justify-center gap-1">
            {pagesArray.map((page) => (
              <div
                key={page}
                className={`cursor-pointer rounded-md border-2 px-3 py-1 font-medium shadow-sm hover:bg-red-500 hover:text-white ${
                  page === currentPage ? "bg-red-600 text-white" : "bg-white"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantListPage;
