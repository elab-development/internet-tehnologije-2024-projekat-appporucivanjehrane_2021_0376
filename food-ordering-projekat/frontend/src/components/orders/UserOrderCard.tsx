import { Link } from "react-router-dom";
import { FaCheck, FaRegHourglassHalf } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

import { Order } from "../../lib/TypesData";

interface Props {
  order: Order;
}

const UserOrderCard = ({ order }: Props) => {
  return (
    <Link key={order._id} to={`/track-order/${order?._id}`}>
      <div className="rounded-lg p-4 shadow transition duration-300 ease-in-out hover:shadow-md">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <img
              src={order?.restaurant?.user?.profileImage}
              alt={order?.restaurant?.name}
              className="size-20 rounded-md"
            />
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
              {order.status === "completed" && <FaCheck color="white" />}
              {order.status === "cancelled" && <MdClose color="white" />}
            </div>
          </div>
          <h2 className="pt-2 text-xl font-medium">{order.restaurant?.name}</h2>
          <p className="font-medium text-gray-800">Order {order?._id}</p>
          <p className="mt-1 text-sm text-gray-600">
            {new Date(order.createdAt!).toLocaleDateString()}{" "}
            {new Date(order.createdAt!).toLocaleTimeString()}
          </p>

          {order?.status !== "completed" ? (
            <p className="pt-4 font-medium">
              Status:{" "}
              <span className="text-gray-700">
                {order?.status === "pending-confirm" &&
                  "Store has received your order"}
                {order?.status === "pending-make" &&
                  "Store is preparing your order"}
                {order?.status === "pending-delivery" && "Delivery in progress"}
                {order?.status === "cancelled" && "Order cancelled"}
              </span>
            </p>
          ) : (
            <p className="text-right text-xl font-medium">
              ${order?.totalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserOrderCard;
