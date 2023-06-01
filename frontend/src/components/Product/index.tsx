import { ShopItem } from "../../features/shop/shopSlice"
import { addItem } from "../../features/cart/cartSlice"
import { useDispatch } from "react-redux"

export default function Product(props: { item: ShopItem }) {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col w-80 h-60 gap-2 border-gray-600 border-2 p-4 rounded-md">
      <img src={props.item.imageUrl}></img>
      {props.item.name}
      <button
        className="self-end border-2 border-gray-600 bg-gray-200 py-2 px-4 rounded-md"
        onClick={() => {
          dispatch(addItem({ id: props.item.id, price: props.item.price }))
        }}
      >
        Add to cart
      </button>
    </div>
  )
}
