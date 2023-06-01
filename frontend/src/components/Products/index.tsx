import { ShopItem } from "../../utils/utilTypes"
import Product from "../Product"
import styles from "./styels.module.css"

export default function Products(props: { products?: ShopItem[] }) {
  return (
    <div
      className={`grid w-full border-gray-600 border-2 rounded-md p-4 content-baseline gap-4 overflow-y-auto ${styles.products}`}
    >
      {props.products?.map((item) => {
        return <Product item={item} key={item.id} />
      })}
    </div>
  )
}
