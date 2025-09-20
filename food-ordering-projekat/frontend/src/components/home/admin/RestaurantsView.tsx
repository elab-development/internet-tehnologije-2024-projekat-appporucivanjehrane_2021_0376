import { useEffect, useState } from "react";
import { Table } from "flowbite-react";

import { useRestaurantStore } from "../../../store/restaurantStore";
import LoadingSpinner from "../../LoadingSpinner";
import VerifyRestaurantModal from "./VerifyRestaurantModal";

const RestaurantsView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [restaurantToVerify, setRestaurantToVerify] = useState<string | null>(
    null,
  );

  const { isLoading, restaurants, getAllRestaurants } = useRestaurantStore();

  useEffect(() => {
    getAllRestaurants();
  }, [getAllRestaurants]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mt-10 overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Joined</Table.HeadCell>
            <Table.HeadCell>Commission</Table.HeadCell>
            <Table.HeadCell>Earnings</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {restaurants &&
              restaurants.map((restaurant, index) => (
                <Table.Row className="bg-white font-medium">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <img
                      src={restaurant?.user?.profileImage}
                      alt={restaurant?.name}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {restaurant?.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {restaurant?.address || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {restaurant?.category || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {restaurant?.phone || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(restaurant.createdAt!).toLocaleDateString() ||
                      "NA"}
                  </Table.Cell>
                  <Table.Cell>
                    {restaurant?.verified ? (
                      `${restaurant?.commission}%`
                    ) : (
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setRestaurantToVerify(restaurant?._id);
                        }}
                        className="text-xs font-medium text-black underline"
                      >
                        Verify and add commission
                      </button>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900">
                    $ {restaurant?.user?.balance}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>

      {openModal && (
        <VerifyRestaurantModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          restaurantToVerify={restaurantToVerify}
          setRestaurantToVerify={setRestaurantToVerify}
        />
      )}
    </>
  );
};

export default RestaurantsView;