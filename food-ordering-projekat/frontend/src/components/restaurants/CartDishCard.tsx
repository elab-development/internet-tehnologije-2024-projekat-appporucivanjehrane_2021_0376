import { Dish } from "../../lib/TypesData";

interface Props {
  dish: Dish;
  quantity: number;
}

const CartDishCard = ({ dish, quantity }: Props) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img
            src={dish?.image}
            alt={dish?.name}
            className="size-12 object-cover"
          />
          <div>
            <h3 className="line-clamp-1 text-xs font-medium">{dish?.name}</h3>
            <h3 className="text-xs font-bold">${dish?.price}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h3 className="text-xs font-semibold">Qty: {quantity}</h3>
          <h3 className="text-xs font-semibold">
            Total: ${(quantity * dish?.price).toFixed(2)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default CartDishCard;
