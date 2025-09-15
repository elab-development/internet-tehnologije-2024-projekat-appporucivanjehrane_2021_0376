import { useState } from "react";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { Dish } from "../../lib/TypesData";
import { useCartContext } from "../../context/useCartContext.hook";

interface Props {
  dish?: Dish;
}

const DishCard = ({ dish }: Props) => {
  const [count, setCount] = useState(0);

  const { addToCart, removeFromCart } = useCartContext();

  const handleMinus = () => {
    if (count > 0) {
      removeFromCart(dish!._id);
      setCount(count - 1);
    }
  };
  const handlePlus = () => {
    if (count < 10) {
      addToCart(dish!, 1);
      setCount(count + 1);
    }
  };

  return (
    <>
      <div className="relative flex w-full flex-col gap-4 rounded-xl bg-red-100 p-2 sm:flex-row lg:gap-8">
        <img
          src={dish!.image}
          alt={dish!.title}
          className="size-20 rounded-lg border-2 border-red-600 bg-white object-cover sm:size-40 lg:size-64"
        />
        <div className="flex w-full flex-col justify-between p-2">
          <div>
            <h2 className="mb-2 text-2xl font-bold lg:text-3xl">
              {dish?.title}
            </h2>
            <p className="text-sm text-gray-700 lg:text-2xl">
              {dish?.description}
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <IoPricetagsOutline size={24} />
              <span className="text-lg font-bold lg:text-3xl">
                ${dish?.price}
              </span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div
                onClick={handleMinus}
                className="cursor-pointer rounded-md border-2 border-black bg-white p-2"
              >
                <FaMinus size={24} />
              </div>
              <span className="text-xl font-bold">{count}</span>
              <div
                onClick={handlePlus}
                className="cursor-pointer rounded-md border-2 border-black bg-white p-2"
              >
                <FaPlus size={24} />
              </div>
            </div>
          </div>
        </div>

        {count > 0 && (
          <div className="absolute right-3 rounded-lg p-1 text-2xl font-bold">
            ${(count * (dish?.price || 0)).toFixed(2)}
          </div>
        )}
      </div>
    </>
  );
};

export default DishCard;
