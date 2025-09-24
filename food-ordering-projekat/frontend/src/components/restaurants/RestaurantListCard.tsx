import { Card } from "flowbite-react";
import { GrRestaurant } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import { Restaurant } from "../../lib/TypesData";

interface Props {
  restaurant?: Restaurant;
}

const RestaurantListCard = ({ restaurant }: Props) => {
  return (
    <Card
      className="sm:w-[500px]"
      imgSrc={restaurant?.user?.profileImage}
      horizontal
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
        {restaurant?.name}
      </h5>
      <div>
        <div className="flex flex-row items-center gap-3">
          <GrRestaurant size={18} color="black" className="text-gray-700" />
          <p className="font-medium text-gray-700">{restaurant?.category}</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <IoLocationOutline
            size={18}
            color="black"
            className="text-gray-700"
          />
          <p className="line-clamp-1 font-medium text-gray-700">
            {restaurant?.address}
          </p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <FaRegHeart size={18} color="black" className="text-gray-700" />
          <p className="font-medium text-gray-700">
            {restaurant?.totalOrders || 0} orders
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantListCard;
