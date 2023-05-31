import ShopNavBar from "../../components/ShopNavBar"
import Products from "../../components/Products"
import { useGetShopItemsByIdQuery, useGetShopsQuery } from "../../api/api"
import { useSelector } from "react-redux"
import { selectActiveShopId } from "../../features/shop/shopSlice"
export default function Shops() {
  const { data: shops = [] } = useGetShopsQuery()
  const activeShopId = useSelector(selectActiveShopId)
  const { data: items = [] } = useGetShopItemsByIdQuery(activeShopId, {
    skip: shops.length === 0,
  })
  return (
    <div className="flex w-full p-4 gap-4 min-h-0">
      <ShopNavBar shops={shops} />
      <Products products={items} />
    </div>
  )
}
