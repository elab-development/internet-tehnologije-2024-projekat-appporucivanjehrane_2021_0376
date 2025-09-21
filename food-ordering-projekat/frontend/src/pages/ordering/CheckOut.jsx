import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCartContext } from "../../context/useCartContext.hook";
import { useAuthStore } from "../../store/authStore";
import { useOrderStore } from "../../store/orderStore";
import LoadingSpinner from "../../components/LoadingSpinner";
import OrderMap from "../../components/maps/OrderMap";

const CheckOut = () => {
  const [restaurantLocation, setRestaurantLocation] = useState<
    { lat: number; lng: number } | undefined
  >({
    lat: 44.8125,
    lng: 20.4612,
  });
  const [deliveryTime, setDeliveryTime] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const { cart, clearCart } = useCartContext();
  const { customerData } = useAuthStore();
  const { isLoading, createOrder } = useOrderStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.allDishes && cart.allDishes.length > 0) {
      setRestaurantLocation(cart.allDishes[0].dish.restaurant.location);
    }
  }, [cart]);

  useEffect(() => {
    if (deliveryTime) {
      setDeliveryPrice((deliveryTime / 60) * 0.25);
    }
  }, [deliveryTime]);

  const handleCheckout = async () => {
    try {
      console.log(customerData);

      const data = {
        customer: customerData!._id,
        restaurant: cart.restaurantId,
        dishes: cart.allDishes.map((dish) => ({
          dish: dish?.dish?._id,
          quantity: dish.quantity,
        })),
        totalPrice: cart?.totalPrice + deliveryPrice,
        minutesToDeliver: (deliveryTime / 60).toFixed(0),
      };

      await createOrder(data);

      toast.success("Order created successfully!");
      clearCart();
      navigate("/profile");
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
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">
                Checkout
              </h1>
            </div>
            <div className="mb-5 text-gray-400">
              <Link
                to="/"
                className="text-gray-500 hover:underline focus:outline-none"
              >
                Home
              </Link>{" "}
              / <span className="text-gray-600">Checkout</span>
            </div>
          </div>
          <div className="w-full border-y border-gray-200 bg-white px-2 py-10 text-gray-800">
            <div className="w-full">
              <div className="w-full px-5">
                {cart.allDishes && cart.allDishes.length > 0 ? (
                  <div className="flex w-full flex-col gap-4 border-b pb-6">
                    {cart.allDishes.map((dish) => (
                      <div
                        key={dish?.dish?._id}
                        className="flex w-full items-center"
                      >
                        <div className="size-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                          <img src={dish?.dish?.image} alt={dish?.dish?.name} />
                        </div>
                        <div className="grow pl-3">
                          <h6 className="line-clamp-1 font-semibold uppercase text-gray-600">
                            {dish?.dish?.name}
                          </h6>
                          <p className="text-gray-400">qty: {dish?.quantity}</p>
                        </div>
                        <div>
                          <span className="text-xl font-semibold text-gray-600">
                            ${(dish?.quantity * dish?.dish?.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No dishes added</p>
                )}

                {customerData?.location ? (
                  <>
                    <div className="my-6 border-b border-gray-200 pb-6 text-gray-800">
                      <div className="mb-3 flex w-full items-center">
                        <div className="grow">
                          <span className="text-gray-600">Subtotal</span>
                        </div>
                        <div className="pl-3">
                          <span className="font-semibold">
                            ${cart?.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full items-center">
                        <div className="grow">
                          <span className="text-gray-600">Delivery</span>
                        </div>
                        <div className="pl-3">
                          <span className="font-semibold">
                            ${deliveryPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 border-b border-gray-200 pb-6 text-xl text-gray-800 md:border-none">
                      <div className="flex w-full items-center">
                        <div className="grow">
                          <span className="text-gray-600">Total</span>
                        </div>
                        <div className="pl-3">
                          <span className="font-semibold">
                            ${(cart?.totalPrice + deliveryPrice).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={"/profile"}
                    className="font-medium text-red-500 hover:underline"
                  >
                    Please enter your address to continue!
                  </Link>
                )}
              </div>

              <div>
                <OrderMap
                  customerLocation={
                    customerData?.location || {
                      lat: 44.8125,
                      lng: 20.4612,
                    }
                  }
                  restaurantLocation={restaurantLocation!}
                  setDeliveryTime={setDeliveryTime}
                />
              </div>

              <button
                onClick={handleCheckout}
                className="mt-20 w-full rounded-full border-2 border-red-600 bg-red-600 py-2 text-xl font-bold text-white hover:bg-transparent hover:text-red-600"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
