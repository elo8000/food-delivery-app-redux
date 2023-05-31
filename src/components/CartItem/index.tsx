import { addItem, setItemCount } from "../../features/cart/cartSlice"
import { removeItem } from "../../features/cart/cartSlice"
import { useDispatch } from "react-redux"
import { ShopItem } from "../../features/shop/shopSlice"

export type CartItemType = ShopItem & { count: number }

export default function CartItem(props: { item: CartItemType }) {
  const dispatch = useDispatch()
  return (
    <div className="flex w-80 h-60 gap-2 border-gray-600 border-2 p-4 rounded-md">
      <img src={props.item.imageUrl}></img>
      <div>
        <p>{props.item.name}</p>
        <p>Price: {props.item.price} each</p>
        <input
          type="number"
          onChange={(e) => {
            dispatch(
              setItemCount({
                id: props.item.id,
                count: Number(e.target.value),
                price: props.item.price,
              }),
            )
          }}
          value={props.item.count}
        />
      </div>
    </div>
  )
}