import CartItem, { CartItemType } from "../CartItem"
import styles from "./styels.module.css"

export default function CartItems(props: { items: CartItemType[] }) {
  return (
    <div
      className={`grid w-full border-gray-600 border-2 rounded-md p-4 content-baseline gap-4 overflow-y-auto ${styles.products}`}
    >
      {props.items.map((item) => {
        return <CartItem item={item} key={item.id} />
      })}
    </div>
  )
}
