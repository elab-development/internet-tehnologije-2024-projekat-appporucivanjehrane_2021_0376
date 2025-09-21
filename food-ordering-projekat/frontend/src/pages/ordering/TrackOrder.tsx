import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "flowbite-react";

import { useOrderStore } from "../../store/orderStore";
import { useAuthStore } from "../../store/authStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

const TrackOrder = () => {
  const { id } = useParams();
  const { isLoading, order, getOrderById, updateOrderStatus } = useOrderStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
  }, [id, getOrderById]);

  const handleUpdateStatus = async (status: string) => {
    try {
      if (order) {
        if (status === "pending-make") {
          const minutesToPrepare = (order?.dishes?.length || 0) * 5;
          await updateOrderStatus(order._id, {
            status: "pending-make",
            minutesToPrepare,
          });
          toast.success("Started preparing the order");
        } else {
          await updateOrderStatus(order._id, {
            status,
          });
          toast.success("Order status updated");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="flex">
        <div className="mx-auto my-20 w-11/12 rounded-md border bg-slate-100 p-5 shadow-lg md:w-3/4 lg:w-1/2">
          <div className="px-5">
            <h1 className="mb-8 line-clamp-2 text-3xl font-bold text-gray-900">
              Order {order?._id}
            </h1>

            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Customer</h2>
                <p className="font-medium">
                  {order?.customer?.firstName} {order?.customer?.lastName}
                </p>
                <p className="font-medium">{order?.customer?.address}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Restaurant</h2>
                <p className="font-medium">{order?.restaurant?.name}</p>
                <p className="font-medium">{order?.restaurant?.address}</p>
              </div>
            </div>

            <div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">
                Order Details
              </h2>
              <div className="mt-2 overflow-x-auto">
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Dish</Table.HeadCell>
                    <Table.HeadCell>Qty</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {order?.dishes?.map((dish, index) => (
                      <Table.Row
                        className="bg-white font-medium"
                        key={dish?.dish?._id}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {index + 1}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {dish?.dish?.name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {dish?.quantity}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          ${(dish?.quantity * dish?.dish?.price).toFixed(2)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              {order && (
                <div>
                  <h2 className="mt-4 text-lg font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <p className="pt-4 font-medium">
                    Issued: {new Date(order.createdAt!).toLocaleDateString()}{" "}
                    {new Date(order.createdAt!).toLocaleTimeString()}
                  </p>
                  {order.status !== "completed" &&
                    order.status !== "cancelled" &&
                    order.minutesToPrepare > 0 && (
                      <p className="pt-4 font-medium">
                        Expected arrival:{" "}
                        {new Date(
                          new Date(order.createdAt!).getTime() +
                            order.minutesToPrepare * 60000 +
                            order.minutesToDeliver * 60000,
                        ).toLocaleDateString()}{" "}
                        {new Date(
                          new Date(order.createdAt!).getTime() +
                            order.minutesToPrepare * 60000 +
                            order.minutesToDeliver * 60000,
                        ).toLocaleTimeString()}
                      </p>
                    )}
                  <p className="font-medium">
                    Status:{" "}
                    <span className="text-gray-700">
                      {order?.status === "pending-confirm" &&
                        "Store has received order"}
                      {order?.status === "pending-make" &&
                        "Store is preparing order"}
                      {order?.status === "pending-delivery" &&
                        "Delivery in progress"}
                      {order?.status === "cancelled" && "Order cancelled"}
                      {order?.status === "completed" && "Order completed"}
                    </span>
                  </p>
                </div>
              )}

              {user?.role === "restaurant" && (
                <div className="mt-10 flex justify-between border-t pt-2">
                  {order?.status === "pending-confirm" && (
                    <Button
                      onClick={() => handleUpdateStatus("pending-make")}
                      color="light"
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order?.status === "pending-make" && (
                    <Button
                      onClick={() => handleUpdateStatus("pending-delivery")}
                      color="light"
                    >
                      Start Delivery
                    </Button>
                  )}
                  {order?.status === "pending-delivery" && (
                    <Button
                      onClick={() => handleUpdateStatus("completed")}
                      color="success"
                    >
                      Complete Order
                    </Button>
                  )}

                  {order?.status !== "cancelled" &&
                    order?.status !== "completed" && (
                      <Button
                        onClick={() => handleUpdateStatus("cancelled")}
                        color="failure"
                      >
                        Cancel
                      </Button>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
