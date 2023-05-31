import { setActiveShopId } from "../../features/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectActiveShopId } from "../../features/cart/cartSlice"
import styles from "./styles.module.css"
import { selectCartHasItems } from "../../features/cart/cartSlice"
export default function ShopNavBarItem(props: { name: string; id: number }) {
  const dispatch = useDispatch()
  const activeShopId = useSelector(selectActiveShopId)
  const cartHasItems = useSelector(selectCartHasItems)
  const activeStyle = props.id === activeShopId ? styles.active : ""
  return (
    <button
      className={`${activeStyle} w-1/2 p-4 rounded-md border-gray-600 border-2`}
      onClick={() => {
        if (!cartHasItems) dispatch(setActiveShopId(props.id))
      }}
    >
      {props.name}
    </button>
  )
}
