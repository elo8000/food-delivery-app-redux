import { ShopItem } from "../../utils/utilTypes"
import { addItem } from "../../features/cart/cartSlice"
import { useDispatch } from "react-redux"

export default function Product(props: { item: ShopItem }) {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col w-80 h-60 gap-2 border-gray-600 border-2 p-4 rounded-md">
      <img
        src={props.item.imageUrl || "http://via.placeholder.com/200x100"}
      ></img>
      <div className="flex flex-col h-full justify-end">
        <p>
          {props.item.name} UAH {props.item.price} each
        </p>
        <button
          className="self-end border-2 border-gray-600 bg-gray-200 py-2 px-4 rounded-md"
          onClick={() => {
            dispatch(addItem({ id: props.item.id, price: props.item.price }))
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
