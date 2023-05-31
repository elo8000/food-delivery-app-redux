import ShopNavBar from "../../components/ShopNavBar"
import Products from "../../components/Products"
import { useGetShopItemsByIdQuery, useGetShopsQuery } from "../../api/api"
export default function Shops() {
  const { data: shops = [] } = useGetShopsQuery()
  const { data: items = [] } = useGetShopItemsByIdQuery(shops[0]?.id, {
    skip: shops.length === 0,
  })
  return (
    <div className="flex w-full p-4 gap-4 min-h-0">
      <ShopNavBar shops={shops} />
      <Products products={items} />
    </div>
  )
}
