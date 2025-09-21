import { useEffect } from "react";
import { Table } from "flowbite-react";
import { FaCheck, FaRegHourglassHalf } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import { useOrderStore } from "../../../store/orderStore";
import LoadingSpinner from "../../LoadingSpinner";

const OrdersView = () => {
  const { isLoading, orders, getAllOrders } = useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mt-10 overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Customer</Table.HeadCell>
            <Table.HeadCell>Restaurant</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders &&
              orders.map((order, index) => (
                <Table.Row key={index} className="bg-white font-medium">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row gap-3">
                      <img
                        src={order?.customer?.user?.profileImage}
                        className="size-12 rounded-full"
                      />
                      <div>
                        <p className="text-gray-900">
                          {order?.customer?.firstName}{" "}
                          {order?.customer?.lastName}
                        </p>
                        <p className="text-xs">
                          {order?.customer?.user?.email}
                        </p>
                        <p className="text-xs">{order?.customer?.address}</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row gap-3">
                      <img
                        src={order?.restaurant?.user?.profileImage}
                        className="size-12 rounded-full"
                      />
                      <div>
                        <p className="text-gray-900">
                          {order?.restaurant?.name}
                        </p>
                        <p className="text-xs">
                          {order?.restaurant?.user?.email}
                        </p>
                        <p className="text-xs">{order?.restaurant?.address}</p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(order.createdAt!).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className={`${
                        order?.status?.startsWith("pending")
                          ? "bg-yellow-400"
                          : order?.status === "cancelled"
                            ? "bg-red-500"
                            : order?.status === "completed"
                              ? "bg-green-500"
                              : "bg-gray-200"
                      } flex size-10 items-center justify-center rounded-full p-2`}
                    >
                      {order.status.startsWith("pending") && (
                        <FaRegHourglassHalf color="white" />
                      )}
                      {order.status === "completed" && (
                        <FaCheck color="white" />
                      )}
                      {order.status === "cancelled" && (
                        <MdClose color="white" />
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default OrdersView;
